import { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import {FormControl,FormLabel,FormErrorMessage,FormHelperText,} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import './page.css'
import {auth} from "../firebase"
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function Login() {
  const [err, setErr] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const signin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    }catch(error){
      setErr(true)
    }
    return "asd"
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='container-bar'>
          <Heading>Turtle Chat</Heading>
          <Text fontSize='md'>Log In</Text>
          <Input variant='flushed' placeholder='Email' onChange={e => setEmail(e.target.value)} />
          <Input variant='flushed' type={show ? 'text' : 'password'} placeholder='Password' onChange={e => setPassword(e.target.value)} />
          <Button colorScheme='blue' onClick={signin}>Log In</Button>
          {err && <Text fontSize='md'>Your email or password is wrong</Text> }
          <Text fontSize='md' color='#888'>
            You don't have account? <Text as='u' onClick={()=> {navigate('/register')}} style={{cursor:"pointer"}} >Register</Text>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Login

