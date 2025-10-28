import React from 'react'
import { Category } from '../../sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="mt-16 p-6 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl text-gray-900 mb-3">Popular Categories</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our wide range of products across various categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group relative bg-white border border-gray-200/80 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <Link 
              href={`/category/${category?.slug?.current}`} 
              className="block p-6"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Category Image */}
                {category.image && (
                  <div className="relative w-20 h-20 bg-gray-50 rounded-full p-4 group-hover:bg-red-50 transition-colors duration-300">
                    <Image
                      src={urlFor(category.image).url()}
                      alt={category.title || "Category image"}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}

                {/* Category Info */}
                <div className="flex flex-col items-center space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-700 transition-colors duration-300 line-clamp-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    <span className="text-red-600 font-bold">
                      {(category as any)?.productCount ?? 0}
                    </span>{' '}
                    Items Available
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>View All Categories</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default HomeCategories