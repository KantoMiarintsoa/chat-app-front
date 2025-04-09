"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SocketContext=createContext<Socket |null>(null)

function SocketProvider({children,apiUrl,token}:{children:React.ReactNode,apiUrl:string,token:string}) {
    const [socket,setSocket]=useState<Socket |null>(null)

    useEffect(()=>{
        const socket= io(apiUrl, {
            transports:["polling"],
            extraHeaders:{
                "Authorization":`Bearer ${token}`
            }
        })

        socket.on("connect", ()=>console.log("connected"))
        setSocket(socket)

        return ()=>{
            socket.disconnect()
        }
    },[])


  return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>        
  )
}

export function useSocket(){
    return useContext(SocketContext)

} 

export default SocketProvider