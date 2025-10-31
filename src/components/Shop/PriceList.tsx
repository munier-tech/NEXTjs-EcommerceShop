import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DollarSign, X } from "lucide-react";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-sm">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
            Price Range
          </h3>
          <p className="text-gray-500 text-xs">Filter by your budget</p>
        </div>
      </div>

      <RadioGroup className="space-y-2" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-full border-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
            />
            <Label
              htmlFor={price.value}
              className={`text-sm cursor-pointer transition-all duration-200 ${
                selectedPrice === price?.value
                  ? "font-semibold text-blue-700"
                  : "font-medium text-gray-700 group-hover:text-gray-900"
              }`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] mt-2"
        >
          <X className="w-4 h-4" />
          <span>Clear Price Filter</span>
        </button>
      )}
    </div>
  );
};

export default PriceList;