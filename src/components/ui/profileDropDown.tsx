"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu'
import { EllipsisIcon } from 'lucide-react'
import { LogoutAction } from '../action'
import UpdateProfil from '../updateProfile'

function ProfilDropDown(){
  return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-white cursor-pointer'>
                <EllipsisIcon/>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {/* <DropdownMenuItem>Profil</DropdownMenuItem> */}
                <UpdateProfil/>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={()=> LogoutAction()}>Se deconnecter</DropdownMenuItem>
            </DropdownMenuContent>  
        </DropdownMenu>
  )
}
export default ProfilDropDown 