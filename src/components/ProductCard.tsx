import React from 'react'
import { Product } from '../../sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Flame, StarIcon } from 'lucide-react'
import Link from 'next/link'
import AddToWishList from './AddToWishList'
import AddToCartButton from './AddToCartButton'

const ProductCard = ({ product }: { product: Product }) => {
  const stock = product?.stock ?? 0
  const isOutOfStock = stock === 0

  return (
    <div className='relative cursor-pointer shadow-lg border border-gray-100/50  overflow-hidden bg-gradient-to-br from-white to-gray-50/30 w-full max-w-xs sm:max-w-sm md:max-w-xl mx-auto group rounded-lg md:rounded-xl'>
      <div className='relative overflow-hidden group aspect-square border-b border-gray-200/50'> 
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()} 
            alt="ProductImage"
            loading='lazy'
            height={400}
            width={400}
            className={`w-full h-auto ${isOutOfStock ? "object-contain opacity-40" : "object-contain md:hover:scale-110 transition-transform duration-500 ease-out p-3 md:p-4"}`}
          />
        )}
        
        <div className="">
          <AddToWishList product={product}/>
        </div>
        
        {/* Status Badges with mobile sizing */}
        {product?.status === "sale" && (
          <div className='absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full px-2 py-1 md:px-3 md:py-1.5 text-xs font-semibold shadow-lg z-10 transform md:group-hover:scale-110 transition-all duration-300'>
            Sale!
          </div>
        )}
        {product?.status === "new" && (
          <div className='absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-2 py-1 md:px-3 md:py-1.5 text-xs font-semibold shadow-lg z-10 transform md:group-hover:scale-110 transition-all duration-300'>
            New!
          </div>
        )}
        {product?.status === "hot" && 
          <Link 
            href={"/deal"} 
            className='absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-1.5 md:p-2 z-10 transform md:group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            <Flame 
              className='text-white'
              size={14}
              fill="currentColor"
            />
          </Link>
        }
      </div>

      {/* Content Section with mobile padding */}
      <div className='flex px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-4 flex-col gap-1.5 bg-white/80'>
        {/* Category */}
        <div>
          <p className='uppercase line-clamp-1 text-gray-500 tracking-wide text-xs font-medium'>
            {product.category?.map((cat) => cat).join(", ")}
          </p>
        </div>

        {/* Product Name */}
        <p className='text-gray-900 font-bold line-clamp-2 text-base sm:text-lg leading-tight group-hover:text-green-700 transition-colors duration-300  '>
          {product?.name
            ? product.name.charAt(0).toUpperCase() + product.name.slice(1)
            : ''}
        </p>

        {/* Star Rating */}
        <div className='flex items-center gap-0.5'>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              size={10}
              key={index} 
              className={`${index < 4 ? 'text-green-400' : 'text-gray-300'}  transform md:group-hover:scale-110 transition-transform duration-300`}
              fill={index < 4 ? "#64fb24" : "none"}
            />
          ))}
          <span className='text-xs text-gray-500 ml-1 font-medium'>(4.0)</span>
        </div>

        {/* Stock Information */}
        <div className='mt-1 sm:mt-2'>
          {isOutOfStock ? (
            <p className='text-sm font-semibold'>
              <span className='text-gray-600'>In Stock </span>
              <span className='text-red-500 hover:text-red-600 transition-colors duration-300'>unavailable</span>
            </p>
          ) : (
            <p className='text-sm font-semibold'>
              <span className='text-gray-600'>In Stock  </span>
              <span className='text-green-600 group-hover:text-green-700 transition-colors duration-300'>
                {stock}
              </span>
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className='flex items-center line-clamp-1 gap-1' >
          <p className='text-sm sm:text-base text-black uppercase font-semibold'>
            ${(product?.price ?? 0).toFixed(2)}
          </p>
          <p className='text-sm line-through text-gray-500' >
            ${((product?.price ?? 0) + ((product?.price ?? 0) * (product?.discount ?? 0)) / 100).toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-2">
          <AddToCartButton 
            ClassName='w-full sm:w-40 rounded-full text-sm py-2 sm:py-2.5'  
            product={product}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard