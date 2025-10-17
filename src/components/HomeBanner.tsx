import React from 'react'
import { Title } from './Text'
import banner1 from '../images/Banner/banner3.png'
import Link from 'next/link'
import Image from 'next/image'

const HomeBanner = () => {
  return (
    <div className='relative py-16 md:py-20 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl overflow-hidden'>
      
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Floating circles */}
        <div className='absolute top-10 left-10 w-8 h-8 bg-green-400 rounded-full opacity-20 animate-float-slow'></div>
        <div className='absolute top-1/4 right-20 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-float-medium'></div>
        <div className='absolute bottom-20 left-20 w-6 h-6 bg-emerald-500 rounded-full opacity-30 animate-float-fast'></div>
        <div className='absolute top-3/4 right-1/4 w-10 h-10 bg-teal-400 rounded-full opacity-20 animate-float-slow'></div>
        
        {/* Moving geometric shapes */}
        <div className='absolute top-1/3 left-1/4 w-16 h-16 border-4 border-green-300 opacity-15 animate-pulse-slow rotate-45'></div>
        <div className='absolute bottom-1/4 right-1/3 w-20 h-20 border-2 border-blue-400 opacity-20 animate-spin-slow rounded-lg'></div>
        
        {/* Floating particles */}
        <div className='absolute top-0 left-0 w-full h-full'>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-40 animate-float-random`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Wave animation */}
        <div className='absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-200/30 to-transparent animate-wave'></div>
        
        {/* Moving gradient orbs */}
        <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-40 animate-ping-slow blur-xl'></div>
        <div className='absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r from-blue-200 to-emerald-200 rounded-full opacity-30 animate-pulse-medium blur-xl'></div>
      </div>

      {/* Text Content */}
      <div className='flex flex-col space-y-6 z-10 text-center lg:text-left max-w-lg relative'>
        <Title className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight'>
          Grab up to 50% off on <br className='hidden md:block' />
          <span className='text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text animate-gradient-x'>
            Selected Items!
          </span>
        </Title>
        
        <p className='text-lg md:text-xl text-gray-600 font-medium'>
          Premium Headphones with Crystal Clear Sound
        </p>
        
        <div className='pt-4'>
          <Link 
            href="/shop" 
            className='group inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden'
          >
            <span className='relative z-10'>Shop Now</span>
            <svg className="w-5 h-5 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Button shine effect */}
            <div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className='relative z-10 mt-10 lg:mt-0 lg:absolute lg:right-8 lg:bottom-0'>
        <div className='relative'>
          <Image 
            className='w-80 md:w-96 lg:w-[500px] transform hover:scale-105 transition-transform duration-500 relative z-10'
            src={banner1} 
            alt='Special offer on premium headphones'
            priority
          />
          {/* Image glow effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl rounded-full scale-90 -z-10 animate-pulse-medium'></div>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner