" use client"
import { cn } from '@/lib/utils'
import { Message } from '@/types/message'
import React from 'react'
import profile from "@/assets/images/person.png"
import userPicture from "@/assets/images/profilepicture.png"
import Image from 'next/image'
import { User } from '@/types/user'



function MessageItem({message, user, otherUser}:{message:Message, user?:User, otherUser?:User}) {
  return (
    <div className={cn('flex w-full gap-2 items-center ', message.isSender?"flex-row-reverse":"flex-row")}>
        <Image
            src={(message.isSender?user?.profilePicture:otherUser?.profilePicture)??profile}  alt="me" className='w-[30px] rounded-full'
            width={20} height={20}
        />
        <p className={cn("max-w-[50%] rounded-[25px] p-2",message.isSender? "bg-blue-500 text-white":"bg-slate-50" )}>
            {message.content}
        </p>
    </div>
  )
}

export default MessageItem