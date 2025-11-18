"use server";

import { urlFor } from "@/sanity/lib/image";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { Address } from "../../sanity.types";
import { CartItem } from "../../store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Ensure we always have a base URL
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL?.trim() ||
      "https://nex-tjs-ecommerce-shop.vercel.app";

    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId =
      customers.data && customers.data.length > 0
        ? customers.data[0].id
        : "";

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId ?? "",
        address: JSON.stringify(metadata.address ?? {}),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,
      line_items: items.map((item) => {
        const priceValue = item.product?.price ?? 0;
        const unitAmount = Math.round(priceValue * 100);
        const images =
          item.product?.images && item.product.images.length > 0
            ? [urlFor(item.product.images[0]).url()]
            : [];

        return {
          price_data: {
            currency: "USD",
            unit_amount: unitAmount,
            product_data: {
              name: item.product?.name ?? "Unknown Product",
              description: item.product?.description ?? "",
              metadata: { id: item.product?._id ?? "" },
              images,
            },
          },
          quantity: item.quantity ?? 1,
        };
      }),
    };

    // Assign customer info
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}
