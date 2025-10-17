import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, Preview } from "sanity";



export const orderType = {
  name : "order",
  title : "Order",
  type : "document",
  icon : BasketIcon,
  fields : [
    defineField({
      name : "orderNumber",
      title : "Order Number",
      type : "string",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "invoice",
      type : "object",
      fields : [
        { name : "id" , type : "string" },
        { name : "number" , type : "string" },
        { name : "hosted_invoice_url" , type : "url" },
      ],
    }),
    defineField({
      name : "stripeCheckoutSessionId",
      title : "Stripe Checkout Session ID",
      type : "string",
    }),
    defineField({
      name : "stripeCustomerId",
      title : "Stripe Customer ID",
      type : "string",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "clerkUserId",
      title : "Store User ID",
      type : "string",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "email",
      title : "Customer Email",
      type : "string",
      validation : (Rule) => Rule.required().email(),
    }),
    defineField({
      name : "stripePaymentIntentId",
      title : "Stripe Payment Intent ID",
      type : "string",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "products",
      title : "Products",
      type : "array",
      of : [
        defineArrayMember({
       type : "object",
         fields : [
          defineField({
            name : "product",
            title : "Product",
            type : "reference",
            to : [{ type : "product" }],
          }),
          defineField({
            name : "quantity",
            title : "Quantity",
            type : "number",
            validation : (Rule) => Rule.required().min(1),
          })
         ],
         preview : {
          select : {
            title : "product.name",
            media : "product.images",
            price : "product.price",
            quantity : "quantity",
            currency : "product.currency",
          },
          prepare(select) {
            return {
              title: `${select.product} x ${select.quantity}`,
              media: select.images,
              subtitle: `${select.price} x ${select.quantity}`,
            };
          },
         }
        }),
      ],
    }),
    defineField({
      name : "TotalPrice",
      title : "Total Price",
      type : "number",
      validation : (Rule) => Rule.required().min(0),
    }),
    defineField({
      name : "currency",
      title : "Currency",
      type : "string",
      initialValue : "usd",
    }),
    defineField({
      name : "amountDiscount",
      title : "Amount Discount",
      type : "number",
      validation : (Rule) => Rule.min(0),
    }),
    defineField({
      name : "address",
      title : "Shipping Address",
      type : "object",
      fields : [
        defineField({ name : "state" , title : "state" , type : "string" }),
        defineField({ name : "city" , title : "city" , type : "string" }),
        defineField({ name : "address" , title : "Address" , type : "string" }),
        defineField({ name : "name" , title : "Name" , type : "string" }),
      ]
    }),
    defineField({
      name : "status",
      title : "Order Status",
      type : "string",
      options : {
        list : [
          { title : "Pending" , value : "pending" },
          { title : "Processing" , value : "processing" },
          { title : "Shipped" , value : "shipped" },
          { title : "Paid" , value : "paid" },
          { title : "Out For Delivery" , value : "out-for-delivery" },
          { title : "Delivered" , value : "delivered" },
          { title : "Cancelled" , value : "cancelled" },
        ],
      },
      initialValue : "pending",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "orderDate",
      title : "Order Date",
      type : "datetime",
      initialValue : (new Date()).toISOString(),
    }),
  ],
  Preview : {
    name : "CustmerName",
    amount : "TotalPrice",
    currency : "currency",
    orderId : "orderNumber",
    email : "email",
    prepare(select: { [key: string]: any }) {
      const orderIdSnippet = `${select.orderId.slice(0, 6)}...${select.orderId.slice(-4)}`
      return {
        title : `${select.name} (${orderIdSnippet})`,
        subtitle : `${(select.amount / 100).toFixed(2)} ${select.currency.toUpperCase()} - ${select.email}`,
        icon : BasketIcon
      };
    },
  }
}