import { useContext, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp,
  getDoc, doc } from "firebase/firestore";
import {db} from '../firebase'
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext';

function Search() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSearch = async () => {
    try{
      console.log(username)
      const q = await query(
        collection(db, "users"),
        where("displayName", "==", username)
      )
      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      })

    }catch(err){
      setErr(true)
    }
  }

  const handleSelect = async () =>{
    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
      const res = await getDoc(doc(db,"chats",combineId))

      if (!res.exists()){
        //create catch
        await setDoc(doc(db,'chats', combineId),{messages: []} )

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid),{
          [combineId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineId+".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, 'userChats', user.uid),{
          [combineId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineId+".date"]: serverTimestamp()
        })
      }
    }catch(error){
      setErr(true)
    }
    
    setUser(null)
    setUsername("")
    
  }

  

  return (
    <div>
      <div style={{padding:"5px"}}>
        <Input variant='flushed' placeholder='find a user' onKeyDown={handleKey}
        onChange={e => {setUsername(e.target.value)}} value={username} />
      </div>
      {err && <Text fontSize='md'>user not found</Text> }

      {user && <div className='chat-user' onClick={handleSelect}>
        <Image
          borderRadius='full'
          boxSize='50px'
          objectFit='cover'
          src={user.photoURL}
          alt=''
        />
        <div className='chats-user'>
          <Text as='b'>{user.displayName}</Text>
        </div>
      </div>}
  </div>  
  )
}

export default Search