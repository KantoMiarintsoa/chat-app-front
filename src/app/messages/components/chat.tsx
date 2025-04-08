"use client"
import { getDetailsUser, getMessages } from '@/service/api'
import { Message } from '@/types/message'
import { User } from '@/types/user'
import React, { useEffect, useState } from 'react'

 function Chat({userId}:{userId:number}) {
    const[loading,setLing]=useState(false)
    const[message,setMessage]=useState<Message[]>([])
    const [nextPage,setNextPage]=useState<number |null>(null)
    const [user,setUser]=useState<User | null>(null)
    
    useEffect(()=>{
        async function fetchData(){
            const user=await getDetailsUser(userId);
            console.log(user)
            setUser(user)

            const paginatedMessage=await getMessages(userId,1)
            setNextPage(paginatedMessage.nextPage)
        }
        fetchData()
    }, [])
  return (
    <div>
    
    </div>
  )
}

export default Chat