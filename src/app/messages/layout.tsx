import React from 'react'
import LastConversation from './components/lastConversation'

function Layout( 
  {children}:{children:React.ReactNode}
) {
  return (
    <div className='flex w-full min-h-screen'>
        <LastConversation/>
        {children}
        
    </div>
  )
}

export default Layout