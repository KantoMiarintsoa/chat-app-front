"use client";

import React, { useEffect, useState } from 'react'
import UserItem from './userItem'
import { Session, User } from '@/types/user'
import { Message, ShowDetailsMessage } from '@/types/message'
import { useSocket } from './providers/socketProvider';

function ListUser({users, user}:{users:ShowDetailsMessage[],user:User}) {
  const [lastUsers, setLastUsers]=useState(users)
  const socket=useSocket();

  useEffect(()=>{
    if(!socket) return;

    socket.on("new-message",(data:Message)=>{
      const otherUser=data.isSender? data.receiver.id:data.sender.id;
      setLastUsers(prev=>[data, ...prev.filter(message=>message.receiver.id!==otherUser && message.sender.id!==otherUser)])
    })

  },[socket])

  return (
    <div className="flex flex-col gap-2">
      {lastUsers.map((message,index)=>(
        <UserItem key={index} sender={message.sender} receiver={message.receiver} content={message.content} user={user}/>
      ))}
    </div>
  )
}
export default ListUser