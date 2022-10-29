import { useEffect, useState, useContext } from 'react'
import avatar from '../assets/turtle.jpeg'
import { Image } from '@chakra-ui/react'
import './comp.css'
import { Text } from '@chakra-ui/react'
import { doc, onSnapshot } from "firebase/firestore";
import {db} from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext'
import { connectStorageEmulator } from 'firebase/storage'

function Chats() {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      })
      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }

  return (
    <div classname="chats-view">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
        <div className='chats-container' key={chat[0]} 
        onClick={() => handleSelect(chat[1].userInfo)} >
          <Image
            borderRadius='full'
            boxSize='50px'
            objectFit='cover'
            src={chat[1].userInfo.photoURL}
            alt=''
          />
          <div className='chats-user'>
            <Text as='b' fontSize='lg' > {chat[1].userInfo.displayName} </Text>
            <Text className='last-chat' > {chat[1].lastMessage?.text} </Text>
          </div>
        </div>
      ))}
        
    </div>
  )
}

export default Chats