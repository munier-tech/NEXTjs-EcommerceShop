import React from "react";
import { Product } from "../../sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Link from "next/link";
import AddToWishList from "./AddToWishList";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const stock = product?.stock ?? 0;
  const isOutOfStock = stock === 0;

  // Fix for categories - extract titles from objects
  const categoryTitles = product?.category
    ?.map((cat) => {
      if (typeof cat === 'string') return cat;
      if (cat && typeof cat === 'object' && 'title' in cat) return cat.title;
      return '';
    })
    .filter(Boolean) || [];

  // Fix for brand - extract title from object
  const brandName = (() => {
    const b = product?.brand;
    if (!b) return '';
    if (typeof b === 'string') return b;
    if (typeof b === 'object' && 'title' in b) {
      return (b as { title?: string }).title || '';
    }
    // handle reference objects (e.g. { _ref: '...', _type: 'reference' }) or unknown shapes
    return '';
  })();

  return (
    <div className="text-sm border border-gray-300 group bg-white">
      {/* Image Section */}
      <div className="relative group overflow-hidden bg-gray-200">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              alt={product?.name || "Product Image"}
              width={500}
              height={500}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-white duration-500 ${
                !isOutOfStock ? "group-hover:scale-105" : "opacity-50"
              }`}
            />
          </Link>
        )}

        {/* Wishlist */}
        <div className="absolute top-2 right-2 z-10">
          <AddToWishList product={product} />
        </div>

        {/* Status Badges */}
        {product?.status === "sale" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-gray-600/50 px-2 rounded-full group-hover:border-green-500 hover:text-green-700 transition-colors">
            Sale!
          </p>
        )}
        {product?.status === "new" && (
          <p className="absolute top-2 left-2 z-10 text-xs border border-gray-600/50 px-2 rounded-full group-hover:border-blue-500 hover:text-blue-700 transition-colors">
            New!
          </p>
        )}
        {product?.status === "hot" && (
          <Link
            href="/deal"
            className="absolute top-2 left-2 z-10 border border-orange-500/50 p-1 rounded-full group-hover:border-orange-500 hover:text-orange-700 transition-colors"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-orange-500/50 group-hover:text-orange-500 transition-colors"
            />
          </Link>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col gap-2">
        {/* Brand - ADDED THIS SECTION */}
        {brandName && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block w-fit">
            {brandName}
          </p>
        )}

        {/* Product Name */}
        <p className="text-gray-900 font-bold line-clamp-1 text-xl hover:text-green-700 transition-colors">
          {product?.name
            ? product.name.charAt(0).toUpperCase() + product.name.slice(1)
            : ""}
        </p>

        {/* Categories */}
        {categoryTitles.length > 0 && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-gray-500">
            {categoryTitles.join(", ")}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className={`${
                  index < 4 ? "text-green-800" : "text-gray-300"
                } transition-colors`}
                fill={index < 4 ? "#013220" : "none"}
              />
            ))}
          </div>
          <p className="text-gray-500 text-xs tracking-wide">(4.0)</p>
        </div>

        {/* Stock Info */}
        <div className="flex items-center gap-2.5">
          <p className="font-medium text-gray-600">In Stock</p>
          <p className={`${isOutOfStock ? "text-red-600" : "text-green-600 font-semibold"}`}>
            {!isOutOfStock ? stock : "unavailable"}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <p className="text-black">${(product?.price ?? 0).toFixed(2)}</p>
          {product?.discount && product.discount > 0 && (
            <p className="line-through text-gray-400">
              $
              {(
                (product?.price ?? 0) +
                ((product?.price ?? 0) * (product?.discount ?? 0)) / 100
              ).toFixed(2)}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <AddToCartButton
          ClassName="w-full rounded-full text-sm py-2 font-bold sm:py-2"
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductCard;