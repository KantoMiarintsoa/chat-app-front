"use client"
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { getDetailsUser, getMessages } from '@/service/api'
import { Message } from '@/types/message'
import { User } from '@/types/user'
import React, { useEffect, useState } from 'react'
import userImage from "@/assets/images/profilepicture.png"
import Image from 'next/image'
import { AutosizeTextarea } from '@/components/ui/autosize-textarea'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/loader'
import MessageItem from './messaageItem'
import { useSocket } from './providers/socketProvider'
import { Send } from 'lucide-react';

 function Chat({userId}:{userId:number}) {
    const[loading,setLoading]=useState(true)
    const[messages,setMessages]=useState<Message[]>([])
    const [nextPage,setNextPage]=useState<number |null>(null)
    const [user,setUser]=useState<User | null>(null)
    const socket=useSocket()
    const [newMessage,setNewMessage]=useState("")
    
    useEffect(()=>{
        async function fetchData(){
            try{
                const user=await getDetailsUser(userId);
                console.log(user)
                setUser(user)
                const paginatedMessage=await getMessages(userId,1)
                console.log(paginatedMessage)
                setNextPage(paginatedMessage.nextPage)
                setLoading(false)
                setMessages(paginatedMessage.data)
            }
            catch{
                setLoading(false)
                setUser(null)
                
            }
        }
        fetchData()
    }, [])

    useEffect(()=>{
        if(!socket) return;

        socket.on("new-message",(data:Message)=>{
            if(data.sender.id===userId || data.receiver.id=== userId){
                setMessages(prev=>[data,...prev])
            }
        })
    },[socket])


    if(user===null && !loading){
        return (
            <Card className='h-full'>
                <CardTitle className='p-5 text-gray-500'>
                    <p>Utilisateur non trouver</p>
                </CardTitle>

            </Card>  
        )
    }

    function sendMessage(content:string){
        if(!socket)return;
        socket.emit("sendMessage",{
            content,
            receiverId:userId
        })
    }

  return (
    <Card className='flex-1 w-full flex flex-col bg-blue-50 pt-0'>
        <CardTitle className='p-4 flex gap-2 items-center bg-white rounded-t-xl'>
            {
                loading?(
                    <p>Loading....</p>
                ):(
                    <>
                        <Image
                            src={userImage} alt='me' className='w-[50px] h-[50px] rounded-full '/>
                        <p >{user?.username}</p>

                    </>
                )
            }
        </CardTitle>
        <CardContent className='overflow-auto h-[calc(100vh-270px)]'>
            {loading?(
                <div className='flex-1 justify-center items-center flex'>
                    <Spinner/>
                </div>
            )
            :
            <div className='flex flex-col-reverse gap-2'>
                {
                    messages.map((message,index)=>(
                        <MessageItem  message={message} key={index}/>
                    ))
                }

            </div>
            }
        </CardContent>
        <CardFooter className='px-2 flex gap-2 items-end '>
            <AutosizeTextarea maxHeight={200} className='flex-1 ' rows={1} minHeight={26} onChange={(event)=>setNewMessage(event.target.value)}/>
            <Button variant={'ghost'} className='text-lg cursor-pointer border border-blue-500 bg-transparent hover:bg-blue-100 text-blue-600 px-4 py-2 rounded flex items-center gap-2' disabled={newMessage===''} onClick={()=>(sendMessage(newMessage))}>
                <Send size={18}/>
                    Envoyer
            </Button>
        </CardFooter>
    </Card> 
  )
}

export default Chat