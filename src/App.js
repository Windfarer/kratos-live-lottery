import logo from './logo.svg';
import './App.css';
import {Button} from '@mui/material'
import { useState, useEffect } from 'react';
const { LiveWS } = require('bilibili-live-ws')


function App() {
  const [msgs, setMsgs] = useState([])
  const [live, setLive] = useState(null)

  const initLive = () => {
    const live = new LiveWS(5712445)
    live.on('open', () => console.log('Connection is established'))

    setLive(live)
  }

  useEffect(()=>{
    if (live) {
      // Connection is established
      live.on('DANMU_MSG', (data)=>{
        setMsgs([...msgs, data])
        console.log(msgs)
      })
    }

  },[live]
  )

  return (
    <div className="App">
     <MsgList msgs={msgs}></MsgList>
    </div>
  );
}

function MsgList(props) {
  return (
    <div>
       {props.msgs.map((x, i)=>{
        return <div key={i}>{x.info[2][1]}: {x.info[1]}</div>
      })}
    </div>
  )
} 

export default App;
