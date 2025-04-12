"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { changeNickName } from '@/service/api'
import { User } from '@/types/user'
import React, { useState } from 'react'

function NickNameDialog({otherUser, onNicknameChange}:{otherUser?:User, onNicknameChange:(nickname:string)=>void}) {
    const [open,setOpen]=useState(false)
    const[nickName,setNickname]=useState<string>(otherUser?.nickName??"")

    async  function handdleChangeNickname(){
        if(!otherUser) return
        try{
            const nickNameResponse=await changeNickName(otherUser.id,nickName)
            onNicknameChange(nickNameResponse.nickName)
            setOpen(false)
        }
        catch{
            setOpen(false)

        }
    }
  return (
    <div>
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <p className='text-black font-semibold cursor-pointer'>{otherUser?.nickName??otherUser?.username}</p>
            </DialogTrigger>
            
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Changer pseudo</DialogTitle>
            </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap2">
                        <label >{otherUser?.username}</label>
                        <Input placeholder='Changer votre pseudo' defaultValue={otherUser?.nickName?? ""} onChange={(event)=> setNickname(event.target.value)}/>
                    </div>
                    
                </div>
                <DialogFooter>
                    <Button variant={"outline"} onClick={()=>setOpen(false)}>Annuler</Button>
                    <Button onClick={handdleChangeNickname} className='cursor-pointer'>Enregistrer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}
export default NickNameDialog