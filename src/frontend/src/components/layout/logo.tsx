import {  Target } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center gap-1 p-2'>
        <Target className='text-primary size-6 ' />
        <p className='font-bold text-2xl'>Neda<span className='text-primary'>Lang</span></p>
    </div>
  )
}

export default Logo