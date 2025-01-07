import { Loader } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='h-full w-full items-center justify-center flex'>
        <Loader className='size-7 animate-spin' />
    </div>
  )
}

export default LoadingPage