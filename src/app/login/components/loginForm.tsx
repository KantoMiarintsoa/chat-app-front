"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Form, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaType } from './shema';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from './action';

function LoginForm() {
    const form = useForm<LoginSchemaType>({
        resolver:zodResolver(loginSchema)
    });

    async function onSubmit(data:LoginSchemaType){
        console.log(data)
        const response= await loginAction(data)

        if(response.errors){
            form.setError("email", {message: response.errors})
        }
    }

    return (
        <Card className='p-10 max-w-[450px] w-full'>
            <CardTitle className='text-center'>
                <h1 className='text-2xl font-semibold'>Connexion</h1>
                <p className='text-sm text-gray-600'>
                    Bienvenue sur VibeTalk, connectez-vous pour rejoindre la discussion en temps réel 💬
                </p>
            </CardTitle>

            <CardContent>
                <Form {...form}>
                    <form className='gap-4 flex flex-col' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type='email'
                                className='hover:border-2 hover:border-gray-300 transition duration-300'
                                placeholder='Entrer votre email'
                                {...form.register("email")}
                            />
                            {form.formState.errors.email && (
                                <p className='text-red-700 text-sm'>{form.formState.errors.email.message}</p>
                            )}
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

                        <Button
                            className='bg-gray-700 text-white hover:bg-gray-800 transition duration-300 cursor-pointer' 
                            type="submit"
                        >
                            Se connecter
                        </Button>
                    </form>
                </Form>

                <div className='mt-8 text-center text-sm'>
                    Vous n'avez pas de compte ?
                    <Link
                        href="/register"
                        className='ml-1 font-semibold text-slate-500 hover:text-blue-800 transition'
                    >
                        S'inscrire
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm;
