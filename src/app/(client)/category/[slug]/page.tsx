import Container from '@/components/Container'
import ProductCategory from '@/components/ProductCategory';
import { getCategories } from '@/sanity/queries'
import React from 'react'

const slug = async  ({ params } : { params : { slug : string}}) => {

  const { slug } = await params;
  const categories = await getCategories();
  return (
    <Container>
      <div>
      <h1 className='font-bold text-xl py-6 capitalize' >
     Products By Category : <span className='text-green-400 capitalize text-bold' >{slug && slug}</span>
     </h1>
      </div>
       <div>
          <ProductCategory categories={categories} slug={slug} />
        </div>
    </Container>
  )
}

export default slug
