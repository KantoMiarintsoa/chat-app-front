"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormSchema, registerSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { reigsterAction } from './action';

function RegisterForm() {
    const form = useForm<RegisterFormSchema>({
        resolver:zodResolver(registerSchema)
    });

    async function onSubmit(data:RegisterFormSchema){
        console.log(data)
        const response=await reigsterAction(data)

        if(response.errors){
            console.log(response.errors)
        }
    }


    return (
        <Card className='p-10 max-w-[450px] w-full'>
            <CardTitle className='text-center'>
                <h1 className='text-2xl font-semibold'>Inscription</h1>
                <p className='text-sm text-gray-600'>
                    Rejoignez VibeTalk, créez votre compte pour participer à la discussion en temps réel 
                </p>
            </CardTitle>

            <CardContent>
                <Form {...form}>
                    <form className='gap-4 flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <Input
                                type='text'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre nom'
                                {...form.register("lastName")}
                            />
                        </FormItem>

                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <Input
                                type='text'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre prenom'
                                {...form.register("firstName")}
                            />
                        </FormItem>

                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <Input
                                type='text'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre pseudo'
                                {...form.register("username")}
                            />
                        </FormItem>

                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type='email'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre email'
                                {...form.register("email")}
                            />
                        </FormItem>

                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type='password'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre mot de passe'
                                {...form.register("password")}
                            />
                        </FormItem>

                        <FormItem>
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <Input
                                type='password'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Confirmer votre mot de passe'
                                {...form.register("confirmPassword")}
                            />
                        </FormItem>

                        <Button
                            className='bg-gray-700 text-white hover:bg-gray-800 transition duration-300 cursor-pointer'
                            type="submit"
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                        >
                            S'inscrire
                        </Button>
                    </form>
                </Form>

                <div className='mt-8 text-center text-sm'>
                    Vous avez déjà un compte ?
                    <Link
                        href="/login"
                        className='ml-1 font-semibold text-slate-500 hover:text-blue-800 transition'
                    >
                        Se connecter
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default RegisterForm;
