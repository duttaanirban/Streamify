import { LoaderIcon } from 'lucide-react'
import React from 'react'

export const PageLoader = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-primary'> </LoaderIcon>
    </div>
  )
}
