"use client"
import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Product } from '../../sanity.types'
import { cn } from '@/lib/utils'
import useStore from '../../store'
import toast from 'react-hot-toast'

const AddToWishList = ({ product , className  } : { product : Product , className ?: string }) => {

  const { addToFavorite , favoriteProduct } = useStore()
  const [ existingProduct , setIsExistingProduct ] = useState<Product | null>(null)
  useEffect(() => {
    const availableProduct = favoriteProduct.find((item) => item?._id === product._id)
    setIsExistingProduct(availableProduct || null)
  } , [product , favoriteProduct])

  const handleAddToFav = () => {
    if (product._id) {
      addToFavorite(product).then(() => {
        toast.success(`${existingProduct ? `${product.name?.substring(0,12)} ... removed from favourite` : `${product.name?.substring(0,12)} ... added to favourite`}`)
      })
    }
  }
  return (
    <div className={cn(`absolute  right-2 top-2 z-10 `, className)} >
      <div
      onClick={handleAddToFav} 
      className={`p-2.5  hoverEffect hover:bg-green-950 cursor-pointer   rounded-full hover:text-white text-black hoverEffect ${existingProduct ? "bg-green-950  text-white" : "bg-gray-100"}`} >
        <Heart size={17} />
      </div>
    </div>
  )
}

export default AddToWishList
