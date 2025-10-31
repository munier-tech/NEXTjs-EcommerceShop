import React from "react";
import { Crown, X } from "lucide-react";
import { BRANDS_QUERYResult } from "../../../sanity.types";

interface BrandListProps {
  brands: BRANDS_QUERYResult;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: BrandListProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-sm">
          <Crown className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Brands
          </h3>
          <p className="text-gray-500 text-xs">Filter by brand</p>
        </div>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
        <button
          onClick={() => setSelectedBrand(null)}
          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
            selectedBrand === null
              ? "bg-amber-100 text-amber-700 border-amber-200 shadow-sm font-semibold"
              : "text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-amber-200 font-medium"
          }`}
        >
          All Brands
        </button>
        {brands?.map((brand) => (
          <button
            key={brand._id}
            onClick={() => setSelectedBrand(brand.slug?.current || null)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
              selectedBrand === brand.slug?.current
                ? "bg-orange-100 text-orange-700 border-orange-200 shadow-sm font-semibold"
                : "text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-orange-200 font-medium"
            }`}
          >
            {brand.title}
          </button>
        ))}
      </div>

      {selectedBrand && (
        <button
          onClick={() => setSelectedBrand(null)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] mt-2"
        >
          <X className="w-4 h-4" />
          <span>Clear Brand Filter</span>
        </button>
      )}
    </div>
  );
};

export default BrandList;