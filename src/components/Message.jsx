import { useState, useContext, useRef, useEffect } from 'react'
import './comp.css'
import avatar from '../assets/turtle.jpeg'
import { Image, useRadio } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
function Message({message}) {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const ref = useRef()
    const t = new Date(message.date.seconds*1000)
    console.log()

      useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
      },[message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='message-info'>
        <Image
          borderRadius='full'
          boxSize='50px'
          objectFit='cover'
          src={message.senderId === currentUser.uid 
            ? currentUser.photoURL 
            : data.user.photoURL}
          alt=''
        />
        <Text fontSize='xs' color='gray' >{t.getHours() + ':' + t.getMinutes()}</Text>
      </div>
      <div className={`message-content ${message.senderId === currentUser.uid && "content-owner"} `}>
        <div className={`text ${message.senderId === currentUser.uid && "text-owner"}`}>
          <Text >{message.text}</Text>
        </div>
          {message.img && <Image
            style={{margin:"20px 0px"}}
            boxSize='sm'
            objectFit='cover'
            src={message.img}
            alt=''
          />}
      </div>
      
    </div>
  )
}

export default Message