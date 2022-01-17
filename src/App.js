import logo from './logo.svg';
import './App.css';
import {Button, Input} from '@mui/material'
import { useState, useEffect, useRef } from 'react';
import { LiveWS } from 'bilibili-live-ws'


function App() {
  const [roomId, setRoomId] = useState(0)
  const [msgs, setMsgs] = useState([])
  const live = useRef(null)

  const initLive = () => {
    const ws = new LiveWS(parseInt(roomId, 10))
    
    ws.on('open', () => console.log('Connection is established'))
    ws.on('live', () => {
      ws.on('heartbeat', console.log)
      // 13928
    })

    ws.on('msg', (data)=>{
      console.log(data)
      if (data.cmd === "DANMU_MSG") {
        setMsgs((prev) => [...prev, {
          type: "danmu",
          nickname: data.info[2][1],
          message: data.info[1]
        }])
      }
    })
    live.current = ws
  }

  useEffect(()=>{
    
  },[])

  return (
    <div className="App">
    <Input value={roomId} onChange={(event)=>{setRoomId(event.target.value)}}></Input>
    <Button variant="contained" onClick={()=>{initLive()}}>Connect</Button>
     <MsgList msgs={msgs}></MsgList>
    </div>
  );
}

function MsgList(props) {
  return (
    <div>
       {props.msgs.map((x, i)=>{
        return <div key={i}>{x.nickname}: {x.message}</div>
      })}
    </div>
  )
} 

export default App;
