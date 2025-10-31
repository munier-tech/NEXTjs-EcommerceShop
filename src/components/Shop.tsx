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

      console.log("Selected Brand:", selectedBrand);
      console.log("Selected Category:", selectedCategory);
      console.log("Price Range:", minPrice, maxPrice);

      // Fixed query - matches your product schema structure
      const query = `
        *[_type == 'product' 
          ${selectedCategory ? `&& references(*[_type == "category" && slug.current == $selectedCategory]._id)` : ''}
          ${selectedBrand ? `&& references(*[_type == "brand" && slug.current == $selectedBrand]._id)` : ''}
          && price >= $minPrice && price <= $maxPrice
        ] {
          ...,
          category[]->{
            _id,
            title,
            slug
          },
          brand->{
            _id,
            title,
            slug
          }
        }
        | order(name asc)
      `;

      console.log("Query:", query);

      const data = await client.fetch(
        query,
        { 
          selectedCategory, 
          selectedBrand, 
          minPrice, 
          maxPrice 
        },
        { next: { revalidate: 0 } }
      );

      console.log("Fetched Products:", data);
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
        <div className="sticky top-0 z-10 mb-8 bg-white/80 backdrop-blur-sm py-4 -mx-4 px-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Discover Amazing Products
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Find exactly what you're looking for
                </p>
              </div>
            </div>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <X className="w-4 h-4" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Made slightly narrower */}
          <div className="lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-160px)] lg:overflow-y-auto lg:w-72 lg:min-w-72 pb-8 lg:pr-6 lg:border-r lg:border-gray-200 scrollbar-hide">
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

          {/* Products Grid - Now takes more space */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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