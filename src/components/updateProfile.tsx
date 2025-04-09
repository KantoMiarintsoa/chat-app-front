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

function UpdateProfil() {
    const form=useForm<UpdateProfileSchemaType>(
        {
            resolver:zodResolver(updateSchema)
        }
    )

    const {session}=useAuth()

    useEffect(()=>{
        if(!session) return;

        form.reset({
            firstName:session.user.firstName,
            lastName:session.user.lastName
        })
        
    },[session])
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
                <form className='flex flex-col gap-5'>
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
                    <Button>Enregistrer</Button>

                </form>

            </Form>

        </DialogContent>
    </Dialog>

)
}

export default UpdateProfil