import Image from 'next/image'
import React from 'react'
import profile from "@/assets/images/person.png"
import { Button } from '@/components/ui/button'
import { EllipsisIcon,SearchIcon} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ListUser from './listUser'
import { getUsers } from '@/service/api'
import { Session } from '@/types/user'
import { cookies } from 'next/headers'
import ProfilDropDown from '@/components/ui/profileDropDown'
import UpdateProfil from '@/components/updateProfile'

async function LastConversation() {
   const response=(await getUsers()).data
    const userSession=(JSON.parse((await cookies()).get("session")?.value??"")as Session).user

  return (
    <div className='flex flex-1 flex-col max-h-screen bg-primary p-5 gap-10 min-w-[340px] max-w-[300px]'>
        <div className='flex gap-2 items-center'>
            <Image
                src={profile} alt='me' className='w-[50px] h-[50px] rounded-full '/>
                <p className='text-lg font-semibold text-white flex-1'>{userSession.firstName} {userSession.lastName}</p>
                {/* <button  className='text-white cursor-pointer hover:bg-amber-30 rounded-4xl'>
                        <EllipsisIcon/>
                </button> */}
                <ProfilDropDown/>
        </div>

        <div className='flex rounded-full bg-slate-800 p-1 text-white'>
            <Label>
                <SearchIcon/>
            </Label>
            <Input className='flex-1 border-none focus-visible:ring-0' placeholder='Rechercher un utilisateur...'/>
        </div>
        <div className='flex-1 overflow-auto'>
        <ListUser users={response.data} user={userSession}/>

        </div>
    </div>
  )
}

export default LastConversation