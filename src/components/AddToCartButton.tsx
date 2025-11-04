"use client"
import React from 'react'
import { Product } from '../../sanity.types'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import useStore from '../../store'
import toast from 'react-hot-toast'
import PriceFormatter from './priceFormatter'
import QuantityButtons from './QuantityButtons'

interface AddToCartButtonProps {
  product: Product
  ClassName?: string
}

const AddToCartButton = ({ product, ClassName }: AddToCartButtonProps) => {
  const { addItem, getItemCount } = useStore()
  const ItemCount = getItemCount(product?._id)
  
  const handleAddToCart = () => {
    if ((product.stock as number) > ItemCount) {
      addItem(product)
      toast.success(`${product.name?.substring(0, 12)}... is added successfully`)
    } else {
      toast.error("You can't add more than what is in your stock")
    }
  }

  return (
    <div className="w-full">
      {ItemCount ? (
        <div className="rounded-lg ">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 ml-5">
                <QuantityButtons product={product}/>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-700">SubTotal</span>
            <PriceFormatter 
              amount={product?.price ? product?.price * ItemCount : 0}
              className="text-lg font-semibold text-green-600"
            />
          </div>
        </div>
      ) : (
        <button  
          onClick={handleAddToCart}
          disabled={product?.stock === 0}
          className={cn(
            `w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              product?.stock === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md transform hover:scale-105'
            }`,
            ClassName
          )}
        >
          <ShoppingBag size={18} className="mr-2" />
          {product?.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      )}
    </div>
  )
}

export default AddToCartButton