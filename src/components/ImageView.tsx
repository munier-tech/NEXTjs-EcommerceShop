"use client";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../sanity.types";

const ImageView = ({ product, isStock }: { product: Product; isStock: number }) => {
  const isOutOfStock = isStock === 0;

  return (
    <div className="w-full space-y-4">        
      {/* Main Image */}
      {product?.images?.[0] && (
        <div className="border border-gray-200 bg-white rounded-md">
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product?.name || "Product Image"}
            width={700}
            height={700}
            priority
            className={`w-full h-[500px] object-contain  
              transition-transform duration-500 transform cursor-pointer
              ${!isOutOfStock ? "hover:scale-105 hover:-translate-y-2" : "opacity-50"}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default ImageView;