import React from 'react'
import { Title } from './Text'
import banner1 from '../images/Banner/banner3.png'
import Link from 'next/link'
import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div className='relative py-16 md:py-20 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 bg-gradient-to-r from-green-100 to-emerald-200 rounded-2xl overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-green-300 rounded-full -translate-y-16 translate-x-16 opacity-20'></div>
      <div className='absolute bottom-0 left-0 w-24 h-24 bg-green-400 rounded-full translate-y-12 -translate-x-12 opacity-30'></div>
      
      {/* Text Content */}
      <div className='flex flex-col space-y-6 z-10 text-center lg:text-left max-w-lg'>
        <Title className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight'>
          Grab up to 50% off on <br className='hidden md:block' />
          <span className='text-green-600 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text'>
            Selected Items!
          </span>
        </Title>
        
        <p className='text-lg md:text-xl text-gray-600 font-medium'>
          Premium Headphones with Crystal Clear Sound
        </p>
        
        <div className='pt-4'>
          <Link 
            href="/shop" 
            className='inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            Shop Now
            <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className='relative z-10 mt-10 lg:mt-0 lg:absolute lg:right-8 lg:bottom-0'>
        <Image 
          className='w-80 md:w-96 lg:w-[500px] transform hover:scale-105 transition-transform duration-500'
          src={banner1} 
          alt='Special offer on premium headphones'
          priority
        />
      </div>
    </div>
  )
}

export default HomeBanner