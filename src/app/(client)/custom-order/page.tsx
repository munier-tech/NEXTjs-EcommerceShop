"use client";

import { useCustomOrderStore } from "@/store/customerStore";
import { FormEvent } from "react";

export default function CustomOrderPage() {
  const {
    productName,
    description,
    budget,
    productLink,
    image,
    customerName,
    customerEmail,
    customerPhone,
    loading,
    success,
    setField,
    submitOrder,
  } = useCustomOrderStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitOrder();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto p-8 text-center bg-white rounded-2xl shadow-lg border border-slate-200 transform transition-all duration-500 hover:shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
            Order Request Submitted
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Thank you for your custom product request. We&apos;ll contact you soon to discuss the details.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full px-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 outline-none shadow-sm hover:shadow-md focus:shadow-lg bg-white/80 backdrop-blur-sm";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-2.5 tracking-wide";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl text-white">✨</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
            Custom Product Request
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto leading-relaxed text-lg font-medium">
            Halkan waxad ka codsan karta ama ka dalban kartaa alaab gaar ah oo adiga kuu gaar ah. 
            Fadlan buuxi foomka hoose si aad noogu soo gudbiso faahfaahinta alaabta aad rabto
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Product Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                  <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-green-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    Product Details
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="productName" className={labelClasses}>
                      Product Name *
                    </label>
                    <input
                      id="productName"
                      className={inputClasses}
                      placeholder="e.g., Custom Leather Wallet"
                      value={productName}
                      onChange={(e) => setField("productName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="description" className={labelClasses}>
                      Description *
                    </label>
                    <textarea
                      id="description"
                      className={`${inputClasses} resize-none h-36`}
                      placeholder="Please describe your custom product in detail..."
                      value={description}
                      onChange={(e) => setField("description", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="budget" className={labelClasses}>
                        Budget ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                        <input
                          id="budget"
                          type="number"
                          min="0"
                          step="0.01"
                          className={`${inputClasses} pl-10`}
                          placeholder="0.00"
                          value={budget ?? ""}
                          onChange={(e) => setField("budget", e.target.value ? Number(e.target.value) : null)}
                        />
                      </div>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="image" className={labelClasses}>
                        Image URL
                      </label>
                      <input
                        id="image"
                        type="url"
                        className={inputClasses}
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChange={(e) => setField("image", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="productLink" className={labelClasses}>
                      Reference Link
                    </label>
                    <input
                      id="productLink"
                      type="url"
                      className={inputClasses}
                      placeholder="https://example.com/product"
                      value={productLink}
                      onChange={(e) => setField("productLink", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    Contact Information
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label htmlFor="customerName" className={labelClasses}>
                      Full Name *
                    </label>
                    <input
                      id="customerName"
                      className={inputClasses}
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setField("customerName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="customerEmail" className={labelClasses}>
                        Email Address *
                      </label>
                      <input
                        id="customerEmail"
                        type="email"
                        className={inputClasses}
                        placeholder="your.email@example.com"
                        value={customerEmail}
                        onChange={(e) => setField("customerEmail", e.target.value)}
                        required
                      />
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="customerPhone" className={labelClasses}>
                        Phone Number
                      </label>
                      <input
                        id="customerPhone"
                        type="tel"
                        className={inputClasses}
                        placeholder="(252) XXX-XXXXXXX"
                        value={customerPhone}
                        onChange={(e) => setField("customerPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gray-900 to-emerald-800 text-white py-4 px-6 rounded-xl font-semibold hover:from-gray-800 hover:to-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                      <span className="tracking-wide">Submitting...</span>
                    </div>
                  ) : (
                    <span className="tracking-wide">Submit Request</span>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4 leading-relaxed">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}