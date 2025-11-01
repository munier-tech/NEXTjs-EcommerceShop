"use client"
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import useStore from '../../store'

const CartIcon = () => {
  const { items } = useStore()
    return (
    <Link href={"/cart"} className='relative group ' >
      <ShoppingBag className='hover:text-green-400 hoverEffect ' />
      <span className='absolute -top-1 -right-1 h-3.5 w-3.5 bg-green-700 text-xs text-white rounded-full font-semiBold flex items-center justify-center  hoverEffect'>
         {items?.length ? items?.length : 0}
        </span>
    </Link>
  )
}

export default CartIcon
