import { cn } from '@/lib/utils'
import { Message } from '@/types/message'
import React from 'react'
import profile from "@/assets/images/person.png"
import userPicture from "@/assets/images/profilepicture.png"
import Image from 'next/image'



function MessageItem({message}:{message:Message}) {
  return (
    <div className={cn('flex w-full gap-2 items-center ', message.isSender?"flex-row-reverse":"flex-row")}>
        <Image
            src={message.isSender? profile:userPicture} alt="me" className='w-[30px] rounded-full'
        />
        <p className={cn("max-w-[50%] rounded-[25px] p-2",message.isSender? "bg-blue-500 text-white":"bg-slate-50" )}>
            {message.content}
        </p>
    </div>
  )
}

export default MessageItem