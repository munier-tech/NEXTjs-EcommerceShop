import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { getBrands } from "@/sanity/queries";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck className="w-12 h-12" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows className="w-12 h-12" />,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset className="w-12 h-12" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck className="w-12 h-12" />,
    color: "from-orange-500 to-orange-600",
  },
];

const ShopByBrands = async () => {
  const brands = await getBrands();
  return (
    <div className="my-16 lg:my-24">
      {/* Shop By Brands Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Shop By Brands
            </h1>
            <p className="text-gray-600 text-lg">Discover your favorite brands</p>
          </div>
          <Link
            href={"/shop"}
            className="group inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold px-6 py-3 rounded-full border border-green-600 hover:border-green-700 transition-all duration-300 hover:shadow-lg"
          >
            View all brands
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
          {brands?.map((brand) => (
            <Link
              key={brand?._id}
              href={`/brand/${brand?.slug?.current}`}
              className="group bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
            >
              {brand?.image && (
                <div className="relative w-28 h-16">
                  <Image
                    src={urlFor(brand?.image).url()}
                    alt="brandImage"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              {/* Icon with gradient background */}
              <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
              
              {/* Hover indicator */}
              <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full mt-4 transition-all duration-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;