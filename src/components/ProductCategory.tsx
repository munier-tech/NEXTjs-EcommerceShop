"use client";
import { useState } from "react";
import { Category } from "../../sanity.types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ProductCategoryProps {
  categories?: Category[];
  slug?: string;
}

const ProductCategory = ({ categories, slug }: ProductCategoryProps) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products , setProducts ] = useState ([]);
  const [ isLoading , setIsLoading ] = useState (false);
  const router = useRouter();

  const handleCategoryClick = (newSlug: string) => {

    if (newSlug === currentSlug) return; // No change, do nothing
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`);
  }
  

  const fetchProducts = async () => {
   setIsLoading(true);
    try {

      const query = `*[_type == "product" && category->slug.current == "${currentSlug}"]{
      ..., "category": category[]->title}`
      
    } catch (error) {
      
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-2.5 items-start">
      <div className="flex flex-col min-h-48 border">
        {categories?.map((item) => {
          const isActive = item?.slug?.current === currentSlug;
          return (
            <Button
              key={item?._id}
              onClick={() => handleCategoryClick(item?.slug?.current as string)}
              className={`p-0 border cursor-pointer rounded-none hoverEffect w-full bg-red-600 text-left font-bold px-2 
                ${isActive 
                  ? "bg-red-600 hover:bg-red-600 text-white" 
                  : "bg-white text-black hover:bg-red-600 hover:text-white"
                }`}
            >
              {item?.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCategory;
