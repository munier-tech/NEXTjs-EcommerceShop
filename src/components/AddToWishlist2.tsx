"use client"
import { Heart } from 'lucide-react'
import React from 'react'
import { Product } from '../../sanity.types'
import { cn } from '@/lib/utils'

const AddToWishList2 = ({ product , className  } : { product : Product , className ?: string }) => {
  return (
    <div className={cn(``, className)} >
      <div className='p-2.5 bg-gray-100 hover:bg-green-950   rounded-full hover:text-white text-black hoverEffect' >
        <Heart size={17} />
      </div>
    </div>
  )
}

export default AddToWishList2
