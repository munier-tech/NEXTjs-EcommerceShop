import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";
export default defineType({
  name: "customOrder",
  title: "Custom Orders",
  type: "document",
  icon: TagIcon, // Add this line
  fields: [
    defineField({
      name: "productName",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "budget",
      title: "Budget",
      type: "number",
    }),

    defineField({
      name: "productLink",
      title: "Product Link",
      type: "url",
    }),

    defineField({
      name: "image",
      title: "Image URL",
      type: "string",
    }),

    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    }),

    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" }
        ]
      },
      initialValue: "pending",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  // Add this preview section
  preview: {
    select: {
      title: "productName",
      subtitle: "customerName",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title || "Untitled Order",
        subtitle: `${subtitle} • ${status || "pending"}`,
        media: TagIcon, // Optional: you can use a different icon or image field
      };
    },
  },
});