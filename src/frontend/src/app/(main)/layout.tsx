import MainAppHeader from '@/components/layout/header/main-header'
import React, { ReactNode } from 'react'

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <div className='flex flex-col gap-2'>
            <MainAppHeader />
        {children}
        </div>
    </div>
  )
}

export default MainLayout