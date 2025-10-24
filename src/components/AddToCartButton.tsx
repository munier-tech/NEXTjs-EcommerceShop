"use client"
import React from 'react'
import { Product } from '../../sanity.types'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  product: Product
  ClassName?: string
}

const handleAddToCart = () => {
  alert("Added to cart!")
}
const AddToCartButton = ({ product , ClassName } : AddToCartButtonProps) => {
  return (
    <div>
      <button  
      onClick={handleAddToCart}
      disabled={product?.stock === 0}
      className={cn(`${product?.stock === 0 ? 'bg-gray-300 cursor-not-allowed ' : 'cursor-pointer bg-green-950 hover:bg-green-700 hoverEffect '} px-1 tracking-wide rounded-xl    text-white py-1.5  font-medium transition-colors duration-300`, ClassName)} >
        <ShoppingBag size={16} className='inline-block mr-2 mb-1' />
        { product.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }
      </button>
    </div>
  )
}

export default AddToCartButton
