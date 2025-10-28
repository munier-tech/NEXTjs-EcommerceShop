import Container from '@/components/Container'
import ImageView from '@/components/ImageView'
import { Button } from '@/components/ui/button'
import { getProductBySlug } from '@/sanity/queries'
import { StarIcon, Shield, Truck, RotateCcw, Heart, Share2, ZoomIn } from 'lucide-react'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  const isStock = product?.stock > 0

  // Calculate discounted price
  const originalPrice = product?.price ? product.price + (product.price * (product.discount || 0)) / 100 : 0
  const discountedPrice = product?.price || 0

  return (
    <Container>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.category}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product?.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery Section - Full Width */}
            <div className="space-y-15">
              {/* Main Image Container - Full Width */}
              <div className="relative group bg-white rounded-3xl shadow-2xl p-4 lg:p-6   w-full overflow-hidden">
                <div className="w-full aspect-square">
                  <ImageView product={product} isStock={isStock ? 1 : 0} />
                  
                  {/* Image Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </Button>
                    <Button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-500" />
                    </Button>
                    <Button className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-white transition-colors">
                      <ZoomIn className="w-5 h-5 text-gray-600 hover:text-green-500" />
                    </Button>
                  </div>
                  
                  {/* Stock Badge */}
                  <div className="absolute top-4 left-4">
                    {isStock ? (
                      <div className="px-4 py-2 bg-green-500 text-white rounded-2xl font-semibold text-sm backdrop-blur-sm bg-opacity-95">
                        In Stock
                      </div>
                    ) : (
                      <div className="px-4 py-2 bg-red-500 text-white rounded-2xl font-semibold text-sm backdrop-blur-sm bg-opacity-95">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thumbnail Images - Full Width */}
              {product?.images && product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image: any, index: any) => (
                    <Button
                      key={index}
                      className="flex-shrink-0 w-24 h-24 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 overflow-hidden transition-all duration-200 p-0"
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </Button>
                  ))}
                </div>
              )}
            </div>


            {/* Product Details Section */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-2xl text-sm font-medium">
                    {product?.category}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Button className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                      <Share2 className="w-5 h-5" />
                    </Button>
                    <Button className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                      <Heart className="w-5 h-5 hover:text-red-500" />
                    </Button>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {product?.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : ""}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-4 flex-wrap gap-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        size={20}
                        className={`${
                          index < 4 ? "text-yellow-400" : "text-gray-300"
                        } transition-colors`}
                        fill={index < 4 ? "#fbbf24" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">4.0</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">128 Reviews</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{product?.stock} units available</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4 flex-wrap gap-2">
                  <span className="text-5xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
                  {product?.discount && (
                    <>
                      <span className="text-2xl line-through text-gray-400">${originalPrice.toFixed(2)}</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-sm">
                        -{product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-green-600 font-medium">Including all taxes</p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Product Description</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-500">Delivery in 2-3 days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <RotateCcw className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">30-Day Return</p>
                    <p className="text-sm text-gray-500">No questions asked</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2-Year Warranty</p>
                    <p className="text-sm text-gray-500">Full coverage</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    disabled={!isStock}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:hover:shadow-lg"
                  >
                    {isStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 bg-white text-gray-700 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg">
                    Buy Now
                  </Button>
                </div>
                
                {/* Additional Info */}
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Category</span>
                      <span className="font-semibold text-gray-900">{product?.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Stock</span>
                      <span className="font-semibold text-gray-900">{product?.stock} units</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">SKU</span>
                      <span className="font-semibold text-gray-900">#{product?._id?.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-green-600">{product?.discount || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Preview */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, index) => (
                            <StarIcon
                              key={index}
                              size={16}
                              className="text-yellow-400"
                              fill="#fbbf24"
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">John Doe</span>
                      </div>
                      <p className="text-gray-600">Amazing product quality! Exceeded my expectations. The delivery was fast and packaging was excellent.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-blue-100 mb-6">Our customer support team is here to help you with any questions</p>
                <Button className="w-full bg-white text-blue-600 py-3 px-6 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
                  Contact Support
                </Button>
              </div>

              {/* Guarantee Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">100% Satisfaction Guarantee</h3>
                  <p className="text-gray-600 text-sm">30-day money back guarantee if you're not completely satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Page