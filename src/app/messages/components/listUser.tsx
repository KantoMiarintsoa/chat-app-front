import React from 'react'
import Image from "next/image"
import profile from "@/assets/images/person.png"
import UserItem from './userItem'
import { getUsers } from '@/service/api'
import { cookies } from 'next/headers'
import { Session } from '@/types/user'

async function ListUser() {
    const response=(await getUsers()).data
    const userSession=(JSON.parse((await cookies()).get("session")?.value??"")as Session).user
 
  return (
    <div className="flex flex-col gap-2">
      {response.data.map((user,index)=>(
        <UserItem key={index} sender={user.sender} receiver={user.receiver} content={user.content} user={userSession}/>
      ))}
    </div>
  )
}
export default ListUser