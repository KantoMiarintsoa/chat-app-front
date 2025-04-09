"use server"
import React from 'react'
import LastConversation from './components/lastConversation'
import SocketProvider from './components/providers/socketProvider'
import { cookies } from 'next/headers'
import { Session } from '@/types/user'

async function Layout( 
  {children}:{children:React.ReactNode}
) {
  const session=JSON.parse((await cookies()).get("session")?.value?? "") as Session
  return (
    <div className='flex w-full min-h-screen'>
        <SocketProvider apiUrl={process.env.API_URL as string} token={session.access_token}>
          <LastConversation/>
              {children}
          </SocketProvider>
        
    </div>
  )
}

export default Layout