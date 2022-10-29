import { useContext, useState } from 'react'
import './comp.css'
import avatar from '../assets/turtle.jpeg'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  return (
    <div className='navbar'>
        <Text as='b' fontSize='xl'>Turtle chat</Text>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center" }}>
          <Image
              borderRadius='full'
              boxSize='35px'
              objectFit='cover'
              src={currentUser.photoURL}
              alt=''
            />
          <Text as='b' fontSize='lg' style={{marginLeft:"5px"}}>{currentUser.displayName}</Text>
        </div>
        <Button colorScheme='teal' size="xs" onClick={()=>{signOut(auth); navigate('/login')}}>
          <Text as='b'> Log Out</Text>
        </Button>
    </div>
  )
}

export default Navbar