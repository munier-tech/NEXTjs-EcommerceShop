"use client"
import React, { useEffect, useState } from 'react'
import HomeTabBar, { categories } from './HomeTabBar'
import { client } from '@/sanity/lib/client'
import { Loader2 } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import { motion } from "motion/react"
import NoProductsAvailable from './NoProductsAvailable'
import { Product } from '../../sanity.types'
import ProductCard from './ProductCard'

const ProductTab = () => {
  const [ selectedTab , setSelectedTab ] = useState(categories[0]?.title)
  const [ products , setProducts ] = useState<Product[]>([])
  const [ loading , setLoading ] = useState(false)
  const query = `*[_type == 'product' && variant== $variant ]  {
  ...,"category":category[]->title
}`

const params = { variant: selectedTab?.toLowerCase() }

useEffect(() => {
const fetchData = async () => {
  setLoading(true)
  try {
    const response = await client.fetch(query, params)
    setProducts(response)
    console.log(response)
  } catch (error) {
    console.log(error)
  }finally{
    setLoading(false)
  }
}
fetchData()
} , [selectedTab])


  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div>
        {loading ? (
          <motion.div 
            className="flex flex-col items-center justify-center min-h-80 w-full rounded-2xl mt-7 py-36 bg-gradient-to-br from-gray-50 to-gray-100/80 backdrop-blur-sm border border-gray-200/60 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="flex items-center space-x-3 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className='h-6 w-6' />
              </motion.div>
              <span className="text-lg font-medium">Loading products...</span>
            </motion.div>
            
            {/* Subtle pulsing dots */}
            <motion.div className="flex space-x-1 mt-4">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <div>
            {products.length ? (
              <div className="mt-7 p-3  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {products.map((product) => (
                  <AnimatePresence key={product?._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className=""
                    >
                      <ProductCard product={product} /> 
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <div className="mt-7">
                <NoProductsAvailable selectedTab={selectedTab}/>
              </div>
            )}
          </div>
        )}  
      </div>
    </div>
  )
}

export default ProductTab