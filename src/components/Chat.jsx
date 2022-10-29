import { useState, useContext } from 'react'
import './comp.css'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import avatar from '../assets/turtle.jpeg'
import { AiTwotonePhone } from "react-icons/ai";
import { AiFillVideoCamera } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { IconButton } from '@chakra-ui/react'
import {Menu,MenuButton,MenuList,MenuItem} from '@chakra-ui/react'
import Messages from './Messages'
import InputChat from './InputChat'
import { ChatContext } from '../context/ChatContext'

function Chat() {
  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
        <div className='chat-info'>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center" }}>
            <Image
                borderRadius='full'
                boxSize='35px'
                objectFit='cover'
                src={data.user?.photoURL}
                alt=''
              />
            <Text as='b' fontSize='lg' style={{marginLeft:"5px"}}>{data.user?.displayName}</Text>
          </div>
          <div className='chat-icon'>
            <IconButton
              variant='outline'
              fontSize='20px'
              icon={<AiTwotonePhone size={25} />}
            />
            <IconButton
              variant='outline'
              fontSize='20px'
              icon={<AiFillVideoCamera size={25} />}
            />
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<RiMenuLine />}
                variant='outline'
              />
              <MenuList>
                <MenuItem >
                  Clear History
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div style={{height:"69vh"}}>
          <Messages/>
        </div>
        <div>
          <InputChat/>
        </div>
    </div>
  )
}

export default Chat