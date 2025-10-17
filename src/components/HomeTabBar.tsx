import Link from 'next/link'
import React from 'react'

interface Props {
  selectedTab?: string
  setSelectedTab?: (tab: string) => void
}

export const categories = [
  { title: "Refrigerator", value: "refrigerator" },
  { title: "Gadget", value: "gadget" },
  { title: "Appliances", value: "appliances" },
  { title: "Others", value: "other" },
]

const HomeTabBar = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className='flex items-center justify-between flex-wrap gap-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        {categories?.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            onClick={() => setSelectedTab?.(item.title)}
            className={`
              relative px-4 py-2.5 cursor-pointer 
              text-sm font-medium transition-all duration-300 ease-out
              rounded-full border shadow-sm hover:text-white
              group overflow-hidden
              ${selectedTab === item.title 
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-green-700 shadow-lg shadow-green-200 transform scale-105' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:shadow-md hover:shadow-green-100'
              }
            `}
          >
            {/* Animated background for hover state */}
            <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full ${
              selectedTab === item.title ? 'hidden' : ''
            }`} />
            
            {/* Text with z-index to appear above background */}
            <span className="relative z-10 flex items-center justify-center gap-1">
              {item.title}
              {selectedTab === item.title && (
                <span className="ml-1 w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </span>
            
            {/* Glow effect for selected state */}
            {selectedTab === item.title && (
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <Link
        href={"/shop"}
        className="
          group relative px-5 py-2.5 cursor-pointer 
          text-sm font-medium transition-all duration-300 ease-out
          rounded-full border border-gray-200 bg-white
          text-gray-700 hover:text-white
          shadow-sm hover:shadow-lg hover:shadow-green-200
          overflow-hidden
        "
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
        
        {/* Hover slide effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        
        {/* Text */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          See More
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </div>
  )
}

export default HomeTabBar