import React from 'react'
import { Category } from '../../sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'


const HomeCategories = ({ categories } : { categories: Category[] }) => {
  return (
    <div className='mt-16  p-2 border border-gray-200 rounded-lg overflow-x-auto gap-6 bg-white/70'>
      <h1 className='font-semibold text-2xl text-center md:text-start border-b p-3' >Popular Category</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' >
        {categories.map((category) => (
          <div
          className='flex items-center overflow-hidden' 
          key={category._id}>
            {category.image && (
              <div className='h-44 border flex items-center justify-center p-2 bg-gray-100/50 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full gap-2'>
             <Link href={`/category/${category?.slug?.current}`} className='hover:scale-105 transition-transform hoverEffect'>
               <Image
                 src={urlFor(category?.image).url()}
                 alt="categoryImage"
                 width={700}
                 height={700}
                 className='w-18 h-18 object-contain border-1 border-amber-400 '
               />
             </Link>
             <div className='flex flex-col p-3 space-y-2' >
               <div className='font-bold'>
                 {category.title}
               </div>
               <div>
                <p><span>{`(${(category as any)?.productCount ?? 0})`} Items Available</span></p>
               </div>
              </div>
             </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeCategories
