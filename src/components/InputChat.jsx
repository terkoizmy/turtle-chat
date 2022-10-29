import { useState, useContext } from 'react'
import { Input } from '@chakra-ui/react'
import { GiSeaTurtle } from "react-icons/gi"
import { RiImageAddLine } from "react-icons/ri"
import { IconButton } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext'
import { Text } from '@chakra-ui/react'
import { ChatContext } from '../context/ChatContext'
import { doc, updateDoc, arrayUnion, Timestamp, setDoc, serverTimestamp } from "firebase/firestore";
import {db, storage} from '../firebase'
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import addImageSVG from '../assets/addFile.svg'

function InputChat() {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleKey = (e) => {
    e.code === "Enter" && handleSend()
  }

  const handleSend = async() => {
    if(img){
      console.log("with image")
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img)
      
      uploadTask.on( '',(snapshot)=>{}, 
          (error) => {
          }, 
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                console.log("masuk")
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                    img: downloadURL
                  })
                })
            });
          }
        );
        setImg(null)
        setText("")
    }else{
      console.log("tanpa message")
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      })
      setImg(null)
      setText("")
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"] : {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"] : {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    })

  }

  return (
    <div className='input-c'>
        <Input variant='flushed' placeholder='text Message'
         size='lg' style={{marginLeft:"5px", marginRight:"5px"}}
         onChange={e=>setText(e.target.value)} onKeyDown={handleKey} 
         value={text} />
          <div className='chat-icon' style={{width:"115px", paddingRight:"5px"}}>
            <input type="file" className='input-e' id="img" 
            onChange={e => setImg(e.target.files[0])}
            style={{ display: "none"}} />
            <label htmlFor="img" style={{cursor:"pointer"}}>
              <Image
                borderRadius='full'
                boxSize='35px'
                objectFit='cover'
                src={addImageSVG}
                alt=''
              />
            </label>
            
            <IconButton
              colorScheme='teal'
              fontSize='20px'
              icon={<GiSeaTurtle size={45} 
              onClick={handleSend} />}
            />
          </div>
        
    </div>
  )
}

export default InputChat