"use client"
import React from 'react'
import Chat from '../components/chat'
import { useParams } from 'next/navigation'

function ChatPage() {
    const param=useParams();
    console.log(param.id)
  return (
    <div className='min-h-screen w-full p-8 flex'>
        <Chat userId={parseInt(param.id?.toString()??"0")}/>
        
    </div>
  )
}

export default ChatPage