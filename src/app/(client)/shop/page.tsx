import Shop from "@/components/Shop";
import { getBrands, getCategories } from "@/sanity/queries";
import React from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getBrands();
  return (
    <div className="bg-white">
       <div>
        <title>Shop - MassDropp | Online Ecommerce Platform</title>
        <meta name="description" content="Get in touch with MassDropp. We're here to help with any questions about our products, services, or your shopping experience." />
        <link rel="icon" href="/favicon.ico" />
      </div>
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;