import { Separator } from '@/components/ui/separator'
import React from 'react'
import Logo from '../logo'

const MainAppHeader = () => {
  return (
    <div className='h-16'>
      <div className='bg-white shadow-sm h-full flex items-center justify-between'>
        <Logo />

        {/** TODO:: add nav breadcrumb */}

        {/** Notifications */}

        {/** Store */}

        {/** User nav */}
      </div>
      <Separator />
    </div>
  )
}

export default MainAppHeader