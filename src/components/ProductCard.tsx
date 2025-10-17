import React from 'react'
import { Product } from '../../sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Flame, Star, StarIcon } from 'lucide-react'
import Link from 'next/link'
import AddToWishList from './AddToWishList'
import AddToCartButton from './AddToCartButton'

const ProductCard = ({ product } : {product : Product}) => {
  return (
    <div className='relative rounded-2xl cursor-pointer shadow-lg border border-gray-100/50 mb-4  overflow-hidden bg-gradient-to-br from-white to-gray-50/30 w-full max-w-xs mx-auto group'>
      <div className='relative overflow-hidden group aspect-square border-b border-gray-200/50'> 
        {product?.images && (
          <Image 
            src={urlFor(product?.images[0]).url()} 
            alt="ProductImage"
            loading='lazy'
            height={400}
            width={400}
            className={`${product.stock === 0 ? "object-contain opacity-40" : "object-contain hover:scale-110 transition-transform duration-500 ease-out p-3"}`}
          />
        )}
        <AddToWishList product={product}/>
        
        {/* Status Badges with enhanced styling */}
        {product?.status === "sale" && (
          <div className='absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg z-10 transform group-hover:scale-110 transition-all duration-300'>
            Sale!
          </div>
        )}
        {product?.status === "new" && (
          <div className='absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg z-10 transform group-hover:scale-110 transition-all duration-300'>
            New!
          </div>
        )}
        {product?.status === "hot" && 
          <Link 
            href={"/deal"} 
            className='absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-2 z-10 transform group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            <Flame 
              className='text-white'
              size={16}
              fill="currentColor"
            />
          </Link>
        }
      </div>

      {/* Content Section with enhanced styling */}
      <div className='flex px-5 py-4 flex-col gap-1.5 bg-white/80 '>
        {/* Category */}
        <div>
          <p className='uppercase line-clamp-1 text-gray-500 tracking-wide text-xs font-medium'>
            {product.category?.map((cat) => cat).join(", ")}
          </p>
        </div>

        {/* Product Name */}
      <p className='text-gray-900 font-bold line-clamp-2 text-lg leading-tight group-hover:text-green-700 transition-colors duration-300'>
        {product?.name
          ? product.name.charAt(0).toUpperCase() + product.name.slice(1)
          : ''}
      </p>


        {/* Star Rating */}
        <div className='flex items-center gap-0.5'>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              size={18}
              key={index} 
              className={`${index < 4 ? 'text-yellow-400' : 'text-gray-300'} transform group-hover:scale-110 transition-transform duration-300`}
              fill={index < 4 ? "#fbbf24" : "none"}
            />
          ))}
          <span className='text-xs text-gray-500 ml-1 font-medium'>(4.0)</span>
        </div>

        {/* Stock Information */}
        <div className='mt-2'>
          {product.stock === 0 ? (
            <p className='text-sm font-semibold'>
              <span className='text-gray-600'>In Stock </span>
              <span className='text-red-500 hover:text-red-600 transition-colors duration-300'>unavailable</span>
            </p>
          ) : (
            <p className='text-sm font-semibold'>
              <span className='text-gray-600'>In Stock  </span>
              <span className='text-green-600 group-hover:text-green-700 transition-colors duration-300'>
                {product.stock}
              </span>
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className='flex items-center line-clamp-1 gap-1' >
          <p className='text-sm text-black uppercase '>
          ${(product?.price ?? 0).toFixed(2)}
          </p>
          <p className='text-sm line-through text-gray-500' >
            ${((product?.price ?? 0) + ((product?.price ?? 0) * (product?.discount ?? 0)) / 100).toFixed(2)}
          </p>
        </div>
        {/* Add to Cart Button */}

        <AddToCartButton ClassName='w-40 rounded-full'  product={product}/>
      </div>

      {/* Hover Glow Effect */}
    </div>
  )
}

export default ProductCard