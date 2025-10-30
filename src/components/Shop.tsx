"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Loader2, Filter, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { BRANDS_QUERYResult, Category, Product } from "../../sanity.types";
import NoProductsAvailable from "./NoProductsAvailable";
import CategoryList from "./Shop/CategoryList";
import BrandList from "./Shop/BrandList";
import PriceList from "./Shop/PriceList";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="border-t border-gray-200 bg-white">
      <Container className="mt-8">
        <div className="sticky top-0 z-10  bg-white/80 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-gray-100">
         
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-160px)] lg:overflow-y-auto lg:w-80 lg:min-w-80 pb-8 lg:pr-6 lg:border-r lg:border-gray-200 scrollbar-hide">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Filters</span>
                </h3>
                <div className="space-y-6">
                  <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                  <BrandList
                    brands={brands}
                    setSelectedBrand={setSelectedBrand}
                    selectedBrand={selectedBrand}
                  />
                  <PriceList
                    setSelectedPrice={setSelectedPrice}
                    selectedPrice={selectedPrice}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-4 items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-sm opacity-20 animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-lg tracking-wide">
                      Loading Products
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Preparing your shopping experience...
                    </p>
                  </div>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductsAvailable selectedTab="" className="bg-white mt-0 rounded-2xl shadow-sm border border-gray-100" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;