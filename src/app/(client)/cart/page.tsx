"use client";
import NoAccess from "@/components/NoAccess";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useAuth, useUser } from "@clerk/nextjs";
import {  ShoppingBag, Trash, Phone, Wifi, CreditCard, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useStore from "../../../../store";
import { Address } from "../../../../sanity.types";
import PriceFormatter from "@/components/priceFormatter";
import { Separator } from "@/components/ui/separator";
import EmptyCart from "@/components/EmptyCart";
import ProductSideMenu from "@/components/ProductSideMenu";
import Container from "@/components/Container";
import { createCheckoutSession, Metadata } from "@/actions/CreateCheckoutSession";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe");
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.defaultAddress);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAddresses();
  }, []);
  
  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata & { paymentMethod?: string } = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
        paymentMethod: paymentMethod,
      };
      console.log(metadata)
      
      if (paymentMethod === "stripe") {
        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } else if (paymentMethod === "telesom") {
        await handleTelesomPayment();
      } else if (paymentMethod === "somtel") {
        await handleSomtelPayment();
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTelesomPayment = async () => {
    toast.success("Redirecting to Telesom Zaad payment...");
    console.log("Processing Telesom Zaad payment");
  };

  const handleSomtelPayment = async () => {
    toast.success("Redirecting to Somtel Edahab payment...");
    console.log("Processing Somtel Edahab payment");
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen pb-20">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              {/* Header Section */}
              <div className="flex items-center gap-4 py-8">
                <div className="bg-blue-500/10 p-3 rounded-2xl shadow-sm border border-blue-100">
                  <ShoppingBag className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                  <p className="text-gray-600 mt-1">Review your items and proceed to checkout</p>
                </div>
                <div className="ml-auto bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  {groupedItems.length} {groupedItems.length === 1 ? 'item' : 'items'}
                </div>
              </div>
              
              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Cart Items Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
                      <h2 className="text-xl font-semibold text-gray-900">Cart Items</h2>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {groupedItems?.map(({ product }) => {
                        const itemCount = getItemCount(product?._id);
                        return (
                          <div
                            key={product?._id}
                            className="p-6 hover:bg-gray-50/50 transition-all duration-200 group"
                          >
                            <div className="flex items-start gap-6">
                              {/* Product Image */}
                              {product?.images && (
                                <Link
                                  href={`/product/${product?.slug?.current}`}
                                  className="flex-shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 group-hover:shadow-md transition-all duration-300 cursor-pointer"
                                >
                                  <Image
                                    src={urlFor(product?.images[0]).url()}
                                    alt="productImage"
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                  />
                                </Link>
                              )}
                              
                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col gap-3">
                                  <div>
                                    <Link 
                                      href={`/product/${product?.slug?.current}`}
                                      className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
                                    >
                                      <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                                        {product?.name}
                                      </h2>
                                    </Link>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {product?.variant}
                                      </span>
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {product?.status}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="cursor-pointer">
                                            <ProductSideMenu
                                              product={product}
                                              className="relative top-0 right-0"
                                            />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-semibold bg-gray-900 text-white">
                                          Add to Favorite
                                        </TooltipContent>
                                      </Tooltip>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200"
                                            onClick={() => {
                                              deleteCartProduct(product?._id);
                                              toast.success("Product removed from cart!");
                                            }}
                                          >
                                            <Trash className="w-4 h-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="font-semibold bg-red-600 text-white">
                                          Remove from cart
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Price and Quantity */}
                              <div className="flex flex-col items-end justify-between gap-4">
                                <PriceFormatter
                                  amount={(product?.price as number) * itemCount}
                                  className="font-bold text-xl text-gray-900"
                                />
                                <QuantityButtons product={product} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Clear Cart Button */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                      <Button
                        onClick={handleResetCart}
                        variant="destructive"
                        className="font-semibold px-8 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg cursor-pointer"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sidebar Section */}
                <div className="space-y-6">
                  {/* Order Summary */}
                  <Card className="rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
                      <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                        <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Price Breakdown */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <PriceFormatter 
                            amount={getSubTotalPrice()} 
                            className="font-medium text-gray-900"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                            className="font-medium text-green-600"
                          />
                        </div>
                        <Separator className="bg-gray-200" />
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-xl font-bold text-gray-900"
                          />
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-1 gap-3"
                        >
                          {/* Stripe Payment */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "stripe" 
                                ? "border-blue-500 bg-blue-50 shadow-sm" 
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <RadioGroupItem
                              value="stripe"
                              id="stripe"
                              className="cursor-pointer text-blue-600"
                            />
                            <Label
                              htmlFor="stripe"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                <CreditCard className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900 block">
                                  Credit/Debit Card
                                </span>
                                <p className="text-sm text-gray-600">Pay with Visa, Mastercard</p>
                              </div>
                            </Label>
                          </div>

                          {/* Telesom Zaad */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "telesom" 
                                ? "border-green-500 bg-green-50 shadow-sm" 
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <RadioGroupItem
                              value="telesom"
                              id="telesom"
                              className="cursor-pointer text-green-600"
                            />
                            <Label
                              htmlFor="telesom"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Phone className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900 block">
                                  Telesom Zaad
                                </span>
                                <p className="text-sm text-gray-600">Pay with your Zaad account</p>
                              </div>
                            </Label>
                          </div>

                          {/* Somtel Edahab */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "somtel" 
                                ? "border-purple-500 bg-purple-50 shadow-sm" 
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <RadioGroupItem
                              value="somtel"
                              id="somtel"
                              className="cursor-pointer text-purple-600"
                            />
                            <Label
                              htmlFor="somtel"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                                <Wifi className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900 block">
                                  Somtel Edahab
                                </span>
                                <p className="text-sm text-gray-600">Pay with your Edahab account</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        className="w-full py-6 font-semibold text-base rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg shadow-sm cursor-pointer"
                        size="lg"
                        disabled={loading || !selectedAddress}
                        onClick={handleCheckout}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          `Pay ${getTotalPrice().toLocaleString()} with ${
                            paymentMethod === "stripe" ? "Card" :
                            paymentMethod === "telesom" ? "Zaad" :
                            "Edahab"
                          }`
                        )}
                      </Button>
                      {!selectedAddress && (
                        <p className="text-sm text-red-500 text-center mt-2">
                          Please select a delivery address
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Delivery Address */}
                  {addresses && (
                    <Card className="rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                      <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
                        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <RadioGroup
                          value={selectedAddress?._id}
                          onValueChange={(value) => {
                            const address = addresses.find(addr => addr._id === value);
                            setSelectedAddress(address || null);
                          }}
                          className="space-y-3"
                        >
                          {addresses?.map((address) => (
                            <div
                              key={address?._id}
                              className={`flex items-start space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                                selectedAddress?._id === address?._id 
                                  ? "border-blue-500 bg-blue-50 shadow-sm" 
                                  : "border-gray-200 hover:border-gray-300 bg-white"
                              }`}
                            >
                              <RadioGroupItem
                                value={address?._id}
                                id={`address-${address?._id}`}
                                className="mt-0.5 cursor-pointer text-blue-600"
                              />
                              <Label
                                htmlFor={`address-${address?._id}`}
                                className="grid gap-1.5 flex-1 cursor-pointer"
                              >
                                <span className="font-semibold text-gray-900 text-base">
                                  {address?.Name}
                                </span>
                                <span className="text-gray-600 leading-relaxed text-sm">
                                  {address.streetAddress}, {address.city}
                                </span>
                                {address.defaultAddress && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit mt-1">
                                    Default
                                  </span>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Button 
                          variant="outline" 
                          className="w-full mt-6 py-4 rounded-2xl font-semibold border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer gap-2"
                        >
                          <Plus className="w-5 h-5" />
                          Add New Address
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Mobile Bottom Checkout Bar */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
                <div className="bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-sm p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-gray-900"
                      />
                    </div>
                    <Button
                      className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer shadow-sm"
                      size="lg"
                      disabled={loading || !selectedAddress}
                      onClick={handleCheckout}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        `Pay ${getTotalPrice().toLocaleString()}`
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;