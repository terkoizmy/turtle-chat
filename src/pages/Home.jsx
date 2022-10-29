import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'
import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"


function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="home">
      <div className="container-left">
        <Sidebar/>
      </div>
      <div className="container-right">
        <Chat/>
      </div>
    </div>
  )
}

export default Home
