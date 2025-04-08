import Image from 'next/image'
import React from 'react'
import profile from "@/assets/images/person.png"
import { Button } from '@/components/ui/button'
import { EllipsisIcon,SearchIcon} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ListUser from './listUser'

function LastConversation() {
  return (
    <div className='flex flex-1 flex-col max-h-screen max-w-[400px] bg-primary p-5 gap-10'>
        <div className='flex gap-2 items-center'>
            <Image
                src={profile} alt='me' className='w-[50px] h-[50px] rounded-full '/>
                <p className='text-lg font-semibold text-white flex-1'>Kanto Sarobidy</p>
                <button  className='text-white cursor-pointer hover:bg-amber-30 rounded-4xl'>
                        <EllipsisIcon/>
                </button>
        </div>

        <div className='flex rounded-full bg-slate-800 p-1 text-white'>
            <Label>
                <SearchIcon/>
            </Label>
            <Input className='flex-1 border-none focus-visible:ring-0' placeholder='Rechercher un utilisateur...'/>
        </div>
        <div className='flex-1 overflow-auto'>
        <ListUser/>

        </div>
    </div>
  )
}

export default LastConversation