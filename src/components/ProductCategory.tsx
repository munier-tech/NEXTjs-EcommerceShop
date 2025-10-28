"use client";

import { useEffect, useState } from "react";
import { Category, Product } from "../../sanity.types";
import { useRouter, useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";

interface ProductCategoryProps {
  categories?: Category[];
  slug?: string;
}

const ProductCategory = ({ categories, slug }: ProductCategoryProps) => {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Use URL slug as the single source of truth
  const currentSlug = (params.slug as string) || slug;

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    
    // Only update the URL, don't manage internal state
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    if (!categorySlug) return;
    
    setLoading(true);
    try {
      const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc) {
        ..., "category": category[]->title
      }`;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentSlug) {
      fetchProducts(currentSlug);
    }
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Categories Sidebar */}
      <div className="flex flex-col md:min-w-40 border border-gray-300">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 border-gray-300 p-0 rounded-none text-gray-900 cursor-pointer shadow-none hover:bg-red-600 hover:text-white font-semibold transition-colors border-b last:border-b-0 capitalize ${
              item?.slug?.current === currentSlug && "bg-red-600 text-white border-red-600"
            }`}
          >
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>

      {/* Products Content Area */}
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-blue-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <AnimatePresence>
              {products?.map((product: Product) => (
                <motion.div key={product._id}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <NoProductsAvailable
            selectedTab={currentSlug ?? ""}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCategory;