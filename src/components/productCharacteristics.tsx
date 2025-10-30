import { Product } from '../../sanity.types'
import { AccordionTrigger, AccordionItem, Accordion, AccordionContent } from './ui/accordion'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle, Info } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  product: Product
}

const ProductCharacteristics = async ({ product }: Props) => {
  console.log("product", product.variant)

  const isInStock = (product?.stock ?? 0) > 0

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white/50 backdrop-blur-sm">
        <AccordionItem value="item-1" className="border-b-0 px-6">
          <AccordionTrigger className="py-6 hover:no-underline group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Product Characteristics
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Detailed specifications and features
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant={isInStock ? "default" : "destructive"} 
                className="px-3 py-1 text-sm font-semibold shadow-sm"
              >
                {isInStock ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                {isInStock ? "In Stock" : "Out of Stock"}
              </Button>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="pb-6 pt-4">
            <div className="space-y-4">
              {/* Product Name */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">N</span>
                  </div>
                  <span className="text-gray-700 font-medium">Product Name</span>
                </div>
                <span className="text-gray-900 font-bold text-lg tracking-wide bg-white px-4 py-2 rounded-lg shadow-sm border">
                  {product?.name}
                </span>
              </div>

              {/* Variant Type */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">V</span>
                  </div>
                  <span className="text-gray-700 font-medium">Variant Type</span>
                </div>
                <span className="text-gray-900 font-bold text-lg tracking-wide bg-white px-4 py-2 rounded-lg shadow-sm border">
                  {product?.variant || "Standard"}
                </span>
              </div>

              {/* Collection */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">C</span>
                  </div>
                  <span className="text-gray-700 font-medium">Collection</span>
                </div>
                <Badge variant="secondary" className="px-4 py-2 text-lg font-bold bg-white shadow-sm">
                  2025 Edition
                </Badge>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">S</span>
                  </div>
                  <span className="text-gray-700 font-medium">Stock Status</span>
                </div>
                <div className="flex items-center space-x-2">
                  {isInStock ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 font-bold text-lg tracking-wide bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
                        Available ({product?.stock} units)
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-700 font-bold text-lg tracking-wide bg-white px-4 py-2 rounded-lg shadow-sm border border-red-200">
                        Currently Unavailable
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 text-center italic">
                  All specifications are subject to verification. Contact support for detailed technical information.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ProductCharacteristics