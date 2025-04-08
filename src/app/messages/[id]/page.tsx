"use client"
import React from 'react'
import Chat from '../components/chat'
import { useParams } from 'next/navigation'

function ChatPage() {
    const param=useParams();
    console.log(param.id)
  return (
    <div className='h-full w-full p-8'>
        <Chat userId={parseInt(param.id?.toString()??"0")}/>
        
    </div>
  )
}

export default ChatPage