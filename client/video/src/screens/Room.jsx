import React,{useCallback, useEffect,useState} from "react";
import { useSocket } from "../context/socketProvider";
import ReactPlayer from 'react-player'
import peer from "../service/peer"
const RoomPage =()=>{
    const socket=useSocket();
    const [remotesocketId,SetRemoteSocketId]=useState(null)
    const [myStream, setMyStream]=useState()
    const [remoteStream, setRemoteStream]=useState()

    const handleUserJoined =useCallback(({email,id})=>{
    console.log(`Email ${email} joined`);
    SetRemoteSocketId(id)
     },[] );
     const handleCallUser=useCallback(async()=>{
        const stream=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        })
        const offer= await peer.getoffer();
        socket.emit("user:call",{to:remotesocketId,offer})
        setMyStream(stream)
     },[remotesocketId,socket])

     const handleincommingCall=useCallback(async({from ,offer})=>{
        SetRemoteSocketId(from);
        const stream=await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:true,
        })
        setMyStream(stream)
        console.log(`incomming :call`,from, offer);
        const ans =await peer.getAnswer(offer)
        socket.emit('call:accepted',{to:from,ans})
     },[socket])

     const sendstreams=useCallback(()=>{
        for(const track of myStream.getTracks()){
            peer.peer.addTrack( track, myStream)
        }
     },[myStream])
     const handleCallAccepted=useCallback(({from,ans})=>{
        peer.setLocalDescription(ans)
        console.log('Call Accepted!')
       sendstreams()
        
     })
     const handleNegoNeeded=useCallback(async ()=>{
        const offer =await peer.getoffer();
        socket.emit("peer:nego:needed",{offer ,to : remotesocketId})
     },[remotesocketId,socket])
     useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);
        return()=>{
            peer.peer.removeEventListener("negotiationneeded",handleNegoNeeded)
        
        }
     },[handleNegoNeeded])

     const handleNegoNeedIncomming=useCallback(async({from,offer})=>{
        const ans= await peer.getAnswer(offer);
        socket.emit("peer:nego:needed",{to:from,ans})

     },[socket]);

     const handleNegoNeedFinal =useCallback(async({ans})=>{
       await peer.setLocalDescription(ans)
     })

     useEffect(()=>{
        peer.peer.addEventListener('track',async (ev)=>{
            const remoteStream =ev.streams
            setRemoteStream(remoteStream[0])
        })
     },[])

    useEffect(()=>{
        socket.on('user:joined',handleUserJoined)
        socket.on('incomming:call',handleincommingCall)
        socket.on('call:accepted',handleCallAccepted)
       socket.on("peer:nego:needed",handleNegoNeedIncomming)
       socket.on("peer:nego:final",handleNegoNeedFinal) 
       return ()=>{
            socket.off('user:joined',handleUserJoined)
            socket.off('incomming:call',handleincommingCall)
            socket.off('call:accepted',handleCallAccepted)
            socket.off("peer:nego:needed",handleNegoNeedIncomming)
            socket.off("peer:nego:final",handleNegoNeedFinal) 
        }
    },[socket,handleUserJoined,handleincommingCall,handleCallAccepted,handleNegoNeedIncomming,handleNegoNeedFinal])
    return (
        <div>
            <h1>Room Page</h1>
            <h4>{remotesocketId?'Connected':'No on in Room'}</h4>
            {myStream &&<button onClick={sendstreams}>send Stream</button>}
            {remotesocketId && <button onClick={handleCallUser}>CALL</button>}
            {
                myStream &&<>
                    <h1>My stream</h1> <ReactPlayer 
                playing muted height="200px" width="300px" url={myStream}/>
                    </>
            }
             {
                remoteStream &&<>
                    <h1>Remote Stream</h1> <ReactPlayer 
                playing muted height="200px" width="300px" url={remoteStream}/>
                    </>
            }
        </div>
    )
}
export default RoomPage;