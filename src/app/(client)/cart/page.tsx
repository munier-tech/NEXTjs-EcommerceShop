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
import {  ShoppingBag, Trash, Phone, Wifi } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe"); // Default to Stripe
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
      const defaultAddress = data.find((addr: any) => addr.default);
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
      
      // Handle different payment methods
      if (paymentMethod === "stripe") {
        const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      } else if (paymentMethod === "telesom") {
        // Handle Telesom Zaad payment
        await handleTelesomPayment();
      } else if (paymentMethod === "somtel") {
        // Handle Somtel Edahab payment
        await handleSomtelPayment();
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTelesomPayment = async () => {
    // Implement Telesom Zaad payment integration
    toast.success("Redirecting to Telesom Zaad payment...");
    // Add your Telesom payment integration logic here
    console.log("Processing Telesom Zaad payment");
  };

  const handleSomtelPayment = async () => {
    // Implement Somtel Edahab payment integration
    toast.success("Redirecting to Somtel Edahab payment...");
    // Add your Somtel payment integration logic here
    console.log("Processing Somtel Edahab payment");
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-3 py-8">
                <div className="bg-primary/10 p-3 rounded-full cursor-pointer">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full cursor-default">
                  {groupedItems.length} {groupedItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b border-gray-100 last:border-b-0 p-6 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-start gap-6">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="flex-shrink-0 border-2 border-gray-100 p-2 rounded-xl overflow-hidden group bg-white shadow-sm cursor-pointer"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="productImage"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                              </Link>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col gap-3">
                                <div>
                                  <Link 
                                    href={`/product/${product?.slug?.current}`}
                                    className="cursor-pointer hover:text-primary transition-colors duration-200"
                                  >
                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                                      {product?.name}
                                    </h2>
                                  </Link>
                                  <div className="flex flex-wrap gap-4 mt-2">
                                    <p className="text-sm text-gray-600">
                                      Variant: <span className="font-medium text-gray-900">{product?.variant}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Status: <span className="font-medium text-gray-900">{product?.status}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
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
                                        <div 
                                          className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                                          onClick={() => {
                                            deleteCartProduct(product?._id);
                                            toast.success("Product removed from cart!");
                                          }}
                                        >
                                          <Trash className="w-4 h-4 text-gray-400 hover:text-red-600 transition-colors duration-200" />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="font-semibold bg-red-600 text-white">
                                        Remove from cart
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>
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
                    
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <Button
                        onClick={handleResetCart}
                        className="font-semibold px-8 py-2.5 bg-red-600 rounded-full transition-all duration-200 hover:shadow-lg cursor-pointer"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      Order Summary
                    </h2>
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

                      {/* Payment Methods */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-1 gap-3"
                        >
                          {/* Stripe Payment */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "stripe" 
                                ? "border-primary bg-primary/5" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem
                              value="stripe"
                              id="stripe"
                              className="cursor-pointer"
                            />
                            <Label
                              htmlFor="stripe"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">CC</span>
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900">
                                  Credit/Debit Card
                                </span>
                                <p className="text-sm text-gray-600">Pay with Visa, Mastercard</p>
                              </div>
                            </Label>
                          </div>

                          {/* Telesom Zaad */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "telesom" 
                                ? "border-green-600 bg-green-50" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem
                              value="telesom"
                              id="telesom"
                              className="cursor-pointer"
                            />
                            <Label
                              htmlFor="telesom"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900">
                                  Telesom Zaad
                                </span>
                                <p className="text-sm text-gray-600">Pay with your Zaad account</p>
                              </div>
                            </Label>
                          </div>

                          {/* Somtel Edahab */}
                          <div
                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              paymentMethod === "somtel" 
                                ? "border-purple-600 bg-purple-50" 
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem
                              value="somtel"
                              id="somtel"
                              className="cursor-pointer"
                            />
                            <Label
                              htmlFor="somtel"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-gray-900">
                                  Somtel Edahab
                                </span>
                                <p className="text-sm text-gray-600">Pay with your Edahab account</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        className="w-full py-6 font-semibold text-sm rounded-full tracking-wide bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 hover:shadow-lg mt-4 cursor-pointer"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          `Pay with ${
                            paymentMethod === "stripe" ? "Card" :
                            paymentMethod === "telesom" ? "Zaad" :
                            "Edahab"
                          }`
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {addresses && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      <Card className="border-0 shadow-none">
                        <CardHeader className="pb-4 border-b border-gray-200">
                          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <div className="w-2 h-6 bg-primary rounded-full" />
                            Delivery Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <RadioGroup
                            defaultValue={addresses
                              ?.find((addr: any) => addr.default)
                              ?._id.toString()}
                            className="space-y-4"
                          >
                            {addresses?.map((address) => (
                              <div
                                key={address?._id}
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                  selectedAddress?._id === address?._id 
                                    ? "border-primary bg-primary/5" 
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <RadioGroupItem
                                  value={address?._id.toString()}
                                  id={`address-${address?._id}`}
                                  className="mt-1 cursor-pointer"
                                />
                                <Label
                                  htmlFor={`address-${address?._id}`}
                                  className="grid gap-1.5 flex-1 cursor-pointer"
                                >
                                  <span className="font-semibold text-gray-900 text-lg">
                                    {address?.Name}
                                  </span>
                                  <span className="text-gray-600 leading-relaxed">
                                    {address.streetAddress}, {address.city}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button 
                            variant="outline" 
                            className="w-full mt-6 py-3 rounded-xl font-semibold border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                          >
                            + Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Order Summary */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
                <div className="bg-gradient-to-r from-white to-gray-50 p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <PriceFormatter amount={getSubTotalPrice()} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <PriceFormatter
                        amount={getSubTotalPrice() - getTotalPrice()}
                        className="text-green-600"
                      />
                    </div>
                    <Separator className="bg-gray-300" />
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-gray-900"
                      />
                    </div>
                    <Button
                      className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 cursor-pointer"
                      size="lg"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        `Pay with ${
                          paymentMethod === "stripe" ? "Card" :
                          paymentMethod === "telesom" ? "Zaad" :
                          "Edahab"
                        }`
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