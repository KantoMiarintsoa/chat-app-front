"use client"
import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useForm } from 'react-hook-form'
import { UpdateProfileSchemaType, updateSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { useAuth } from './providers/AuthProviders'
import { updateUser } from '@/service/api'
import { AxiosError } from 'axios'
import { Spinner } from './ui/loader'

function UpdateProfil() {
    const form=useForm<UpdateProfileSchemaType>(
        {
            resolver:zodResolver(updateSchema)
        }
    )

    const {session,setSession}=useAuth()
    

    useEffect(()=>{
        if(!session) return;

        form.reset({
            firstName:session.user.firstName,
            lastName:session.user.lastName
        })
        
    },[session])

    console.log(form.formState.errors)

    async function handleUpdate(data:UpdateProfileSchemaType){
        if(!session) return

        const formData= new FormData();

        if(data.firstName) formData.append("firstName",data.firstName)
        if(data.lastName) formData.append("lastName", data.lastName)
        if(data.password && data.oldPassword){
            formData.append("password",data.password)
            formData.append("oldPassword",data.oldPassword)
        }

        if(data.profilePicture){
            formData.append("file",(data.profilePicture as FileList)[0])
        }

        try{
            const response= await updateUser(formData)
            setSession({...session,user:response})
        }
        catch(error:any){

            if(error.response?.data?.message?.password){
                form.setError("oldPassword",{message:" mot de passe incorrect"})
            }

        }


    }

  return (
    <Dialog>
        <DialogTrigger className='w-full'>
            <DropdownMenuItem onSelect={event=>event.preventDefault()}>
                Profil
            </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Mis a jour profil utilisateur
                </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(handleUpdate)}>
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <Input placeholder='Votre nom ' {...form.register("firstName")}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Prenom</FormLabel>
                        <Input placeholder='Votre prenom ' {...form.register("lastName")}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <Input placeholder='Votre mot de passe actuel ' {...form.register("password")}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <Input placeholder='Mot de passe ' {...form.register("oldPassword")}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>confirmer votre nouveau mot de passe</FormLabel>
                        <Input placeholder='comfirmer mot de passe ' {...form.register("confirmPassword")}/>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Photo de profil</FormLabel>
                        <Input type='file' accept='img' {...form.register("profilePicture",{
                            setValueAs:(e)=>e.target.files?.[0] as File || null
                        })}></Input>
                    </FormItem>
                    <Button className='cursor-pointer flex justify-center' disabled={form.formState.isSubmitting  || !form.formState.isDirty}>
                        {form.formState.isSubmitting && <Spinner className='text-slate-50 w-[15px]'/>
                        }
                        Enregistrer</Button>

                </form>

            </Form>

        </DialogContent>
    </Dialog>

)
}

export default UpdateProfil