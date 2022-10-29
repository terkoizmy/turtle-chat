import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import {FormControl,FormLabel,FormErrorMessage,FormHelperText,} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import './page.css'
import avatar from '../assets/avatar.png'
import { Image } from '@chakra-ui/react'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, storage, db} from "../firebase"
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util'
import { useNavigate } from 'react-router-dom'

function Register() {

  const [err, setErr] = useState(false)
  const [displayName, setdisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [file, setFile] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()


  function PasswordInput() {
    const handleClick = () => setShow(!show)
  }

  function test() {
    console.log(displayName)
    console.log(email)
    console.log(password)
  }

  const createUser = async () => {
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log("start")
      uploadTask.on( '',(snapshot)=>{}, 
        (error) => {
          setErr(true)
        }, 
        () => {
            console.log("masuk")
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL:downloadURL,
            })
            console.log("download")
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            console.log("add doc")
            navigate("/")
          });
        }
      );
      
    }catch(error){
      const errorMessage = error.message;
      console.log(errorMessage)
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='container-bar'>
          <Heading>Turtle Chat</Heading>
          <Text fontSize='md'>Register</Text>
          <Input variant='flushed' placeholder='Nickname' onChange={e => setdisplayName(e.target.value)} />
          <Input variant='flushed' placeholder='Email' onChange={e => setEmail(e.target.value)} />
          <Input variant='flushed' type={show ? 'text' : 'password'} placeholder='Password' onChange={e => setPassword(e.target.value)} />
          <div style={{display:"flex", flexDirection:"row", paddingRight:"20px"}} 
          >
            <input type="file" className='input-e' id="file" 
            onChange={e => setFile(e.target.files[0])}
            style={{ display: "none" }} />
            <label htmlFor="file" style={{display:"flex", flexDirection:"row",  cursor:"pointer"}}>
              <Image
                borderRadius='full'
                boxSize='35px'
                objectFit='cover'
                src={avatar}
                alt=''
              />
              <Text fontSize='lg'>add an avatar</Text>
            </label>
            
          </div>
          <Button colorScheme='blue' onClick={createUser}>Sign up</Button>
          {err && <Text fontSize='md'>Something Wrong</Text> }
          <Text fontSize='md' color='#888'>
            You do have account? <Text as='u' onClick={()=> {navigate('/login')}} style={{cursor:"pointer"}} >Login</Text>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Register
