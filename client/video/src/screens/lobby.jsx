import { useCallback, useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import { useSocket } from "../context/socketProvider";


const  LobbyScreen = ()=>{
    const [email,setEmail]=useState()
    const [room, setRoom]=useState()
    const socket = useSocket()
    const navigate= useNavigate()

   
    const handleSubmit=useCallback((e)=>{
        e.preventDefault()
       socket.emit('room:join',{email,room});

    },[email,room,socket])

    const handleJoinRoom = useCallback((data)=>{
        const {email,room}=data
        navigate(`/room/${room}`)
    },[navigate])

    useEffect(()=>{
        socket.on('room:join',handleJoinRoom)
        return ()=>{
            socket.off('room:join')
        }
    },[socket])
    return(
        <div>
            <h1>lobby</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email-Id</label>
            <input type="email" placeholder="email" id ="email" 
            value={email ||''} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="room">Room No</label>
            <input type="text" placeholder="Room no" id ="room" 
            value={room ||''} onChange={(e)=>setRoom(e.target.value)}/>
            <br/>
            <button >Join</button>
            </form>
        </div>
    )
}
export default LobbyScreen;