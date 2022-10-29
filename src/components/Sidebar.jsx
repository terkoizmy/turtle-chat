import { useState } from 'react'
import Search from "../components/Search"
import Chats from "../components/Chats"
import Navbar from "../components/Navbar"

function Sidebar() {
  const [count, setCount] = useState(0)

  return (
    <div >
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
  )
}

export default Sidebar