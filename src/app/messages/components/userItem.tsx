import React from 'react'
import Image from "next/image"
import profile from "@/assets/images/person.png"
import { ShortDetailsUser, User } from '@/types/user'
import Link from 'next/link'


type UserItemProps={
    sender:ShortDetailsUser,
    receiver:ShortDetailsUser
    content:string
    user:User

}
function UserItem({sender,receiver,content,user}:UserItemProps) {
  return (
    <Link href={`/messages/${sender.id==user.id? receiver.id:sender.id}`}className='flex gap-2 items-center rounded-lg p-2 cursor-pointer hover:bg-slate-800'>
            <Image
                src={profile} alt='me' className='w-[50px] h-[50px] rounded-full '/>
                <div className='flex flex-col'>
                    <p className='text-lg font-semibold text-white flex-1'>
                      {sender.id==user.id ? receiver.username:sender.username}
                    </p>
                    <p className='text-sm text-gray-50'>{content}</p>

                </div>
        </Link>
  )
}

export default UserItem