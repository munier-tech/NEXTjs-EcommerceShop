import Container from '@/components/Container'
import HomeBanner from '@/components/HomeBanner'
import ProductTab from '@/components/ProductTab'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Container>
    <HomeBanner/>
    <div className='py-10' >
    <ProductTab/>
    </div>
      </Container>
    </div>
  )
}

export default Home
