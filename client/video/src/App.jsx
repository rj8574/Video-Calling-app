
import {Routes,Route} from 'react-router-dom'
import './App.css'
import LobbyScreen from './screens/lobby'
import RoomPage from './screens/Room'

function App() {
  
  return (
    <div className='APP'>
      <Routes>
        <Route path='/' element={<LobbyScreen/>}/>
        <Route path='/room/:roomId' element={<RoomPage/>}/>
      </Routes>
     
    </div>
  )
}

export default App
