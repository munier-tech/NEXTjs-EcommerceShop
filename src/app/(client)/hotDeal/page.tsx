import React from 'react';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { getDeals } from '@/sanity/queries';
import { Product } from '../../../../sanity.types';

const Page = async () => {
  const products = await getDeals();
  console.log("Deals data:", products);

  return (
    <div className="py-10 bg-gray-100">
      <Container>
        <h1 className="font-bold underline underline-offset-4 decoration-1 text-base uppercase">
          Hot Deal Of The Week
        </h1>

        {/* ✅ Handle "no products" case properly */}
        {(!products || products.length === 0) ? (
          <p className="text-center text-gray-500 mt-7">
            No products found.
          </p>
        ) : (
          <div className="mt-7 p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
       
      </Container>
    </div>
  );
};

export default Page;
