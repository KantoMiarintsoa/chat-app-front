"use client"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { getDetailsUser, getMessages } from '@/service/api'
import { Message } from '@/types/message'
import { User } from '@/types/user'
import React, { useEffect, useRef, useState } from 'react'
import userImage from "@/assets/images/profilepicture.png"
import Image from 'next/image'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/loader'
import MessageItem from './messaageItem'
import { useSocket } from './providers/socketProvider'
import { Camera, Download, Paperclip, Save, Send } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProviders'
import NickNameDialog from './nickNameDialog'

function Chat({ userId }: { userId: number }) {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [user, setUser] = useState<User | undefined>(undefined)
  const socket = useSocket()
  const [newMessage, setNewMessage] = useState("")

  const [showDropdown, setShowDropdown] = useState(false)
  const [newUsername, setNewUsername] = useState('')
const [page,setPage]=useState(1)
  const containerRef= useRef<HTMLDivElement | null>(null)


  const {session}=useAuth()

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getDetailsUser(userId);
        setUser(user)
        const paginatedMessage = await getMessages(userId, 1)
        setNextPage(paginatedMessage.nextPage)
        setLoading(false)
        setMessages(paginatedMessage.data.reverse())
      } catch {
        setLoading(false)
        setUser(undefined)
      }
    }
    fetchData()
  }, [])

  useEffect(()=>{
    if(containerRef.current && page==1){
      containerRef.current.scrollTop=containerRef.current.scrollHeight
    }
    
  },[messages])

  async function loadMessages(){
    if(nextPage==null) return

    const paginatedMessage=await  getMessages(userId,nextPage)
    setPage(nextPage)
    setNextPage(paginatedMessage.nextPage)
    setMessages([...paginatedMessage.data.reverse(),...messages])
  }

  async function handleScrol(){
    const container=containerRef.current

    if(!container || !nextPage) return;

    if(container.scrollTop===0){
      const previousHeight= container.scrollHeight;

      await loadMessages()

      setTimeout(()=>{

        const newHeight=container.scrollHeight;
        console.log(previousHeight,newHeight)
  
        container.scrollTop=newHeight-previousHeight 
      },0)
    }
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("new-message", (data: Message) => {
      if (data.sender.id === userId || data.receiver.id === userId) {
        setMessages(prev => [...prev,data])
      }
    })

    socket.on("usernameChanged", (data: { id: number, newUsername: string }) => {
      if (user && data.id === user.id) {
        setUser({ ...user, username: data.newUsername });
      }
    })

    return () => {
      socket.off("new-message")
      socket.off("usernameChanged")
    }
  }, [socket, userId, user])

  if (user === null && !loading) {
    return (
      <Card className='h-full'>
        <CardTitle className='p-5 text-gray-500'>
          <p>Utilisateur non trouvé</p>
        </CardTitle>
      </Card>
    )
  }

  function sendMessage(content: string) {
    if (!socket) return;
    socket.emit("sendMessage", {
      content,
      receiverId: userId
    })
    setNewMessage(""); 
  }

  const handleUsernameChange = () => {
    if (newUsername.trim()) {
      socket?.emit('changeUsername', {
        newUsername,
        targetUserId: user?.id 
      });
      setShowDropdown(false)
      setNewUsername("")
    }
  }

  return (
    <Card className='flex-1 w-full flex flex-col bg-blue-50 pt-0'>
      <CardTitle className='p-4 flex gap-2 items-center bg-white rounded-t-xl relative'>
        {
          loading ? (
            <p>Loading....</p>
          ) : (
            <>
              <Image
                src={user?.profilePicture??userImage}
                alt='me'
                className='w-[50px] h-[50px] rounded-full' width={20} height={20}
              />
                <NickNameDialog otherUser={user} onNicknameChange={(nickName)=>{
                  if(user){
                    setUser({...user,nickName})
                  }
                }}/>
                
            </>
          )
        }
      </CardTitle>

      <CardContent className='overflow-auto h-[calc(100vh-270px)]' ref={containerRef} onScroll={handleScrol}>
        {
          loading ? (
            <div className='flex-1 justify-center items-center flex'>
              <Spinner />
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {
                messages.map((message, index) => (
                  <MessageItem message={message} key={index} otherUser={user} user={session?.user} />
                ))
              }
            </div>
          )
        }
      </CardContent>

      <CardFooter className='px-2 flex gap-2 items-end '>
      <button
    className="text-blue-400 hover:text-blue-600 cursor-pointer"
    onClick={() => {
      if (newMessage.trim()) {
        console.log("Message sauvegardé :", newMessage)
        alert("Message sauvegardé !");
      }
    }}
    title="Enregistrer le message"
  >
    <Download size={20} />
  </button>
  
      <label htmlFor="file-upload" className="cursor-pointer text-blue-400 hover:text-blue-600">
    <Paperclip size={20} />
  </label>
  <input
    id="file-upload"
    type="file"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file && socket) {
        const reader = new FileReader();
        reader.onload = () => {
          socket.emit('sendFile', {
            fileName: file.name,
            fileData: reader.result,
            receiverId: userId,
          });
        };
        reader.readAsDataURL(file); 
      }
    }}
  />

  <button
    className="text-blue-400 hover:text-blue-600 cursor-pointer" 
    onClick={() => alert("Fonction caméra à venir")}
  >
    <Camera size={20} />
  </button>
        <AutosizeTextarea
          maxHeight={200}
          className='flex-1 '
          rows={1}
          minHeight={26}
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
          onKeyDown={(e)=>{
            if(e.key==='Enter' && !e.shiftKey){
              e.preventDefault();
              if(newMessage.trim() !==""){
                sendMessage(newMessage)
              }
            }
          }}
        />
        <Button
          variant={'ghost'}
          className='text-lg cursor-pointer border border-blue-300 bg-transparent hover:bg-blue-100 text-blue-400 px-4 py-2 rounded flex items-center gap-2'
          disabled={newMessage === ''}
          onClick={() => sendMessage(newMessage)}
        >
          <Send size={18} />
          Envoyer
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Chat
