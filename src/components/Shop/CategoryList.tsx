import React from "react";
import { Tag, X } from "lucide-react";
import { Category } from "../../../sanity.types";

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: CategoryListProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-sm">
          <Tag className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Categories
          </h3>
          <p className="text-gray-500 text-xs">Browse by category</p>
        </div>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
            selectedCategory === null
              ? "bg-purple-100 text-purple-700 border-purple-200 shadow-sm font-semibold"
              : "text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-purple-200 font-medium"
          }`}
        >
          All Categories
        </button>
        {categories?.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category.slug?.current || null)}
            className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
              selectedCategory === category.slug?.current
                ? "bg-indigo-100 text-indigo-700 border-indigo-200 shadow-sm font-semibold"
                : "text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-indigo-200 font-medium"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <button
          onClick={() => setSelectedCategory(null)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] mt-2"
        >
          <X className="w-4 h-4" />
          <span>Clear Category Filter</span>
        </button>
      )}
    </div>
  );
};

export default CategoryList;