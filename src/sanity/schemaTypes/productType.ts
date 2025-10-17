import { TrolleyIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";



export const productType = defineType({
  name : "product",
  title : "Product",
  type : "document",
  icon : TrolleyIcon,
  fields : [
    defineField({
      name : "name",
      title : "Product Name",
      type : "string",
      validation : (Rule) => Rule.required().max(100),
    }),
    defineField({
      name : "stock",
      title : "Stock",
      type : "number",
      description : "Product Stock Status",
      validation : (Rule) => Rule.required().min(0),
      initialValue : 0,
    }),
    defineField({
      name : "slug",
      title : "Slug",
      type : "slug",
      options : {
        source : "name",
        maxLength : 96,
      },
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "description",
      title : "Description",
      type : "string", 
    }),
    defineField({
      name : "images",
      title : "Product Images",
      type : "array",
      of : [
        defineArrayMember({
          type : "image",
          options : {
            hotspot : true,
          },
        }),
      ],
    }),
    defineField({
      name : "price",
      title : "Price",
      type : "number",
      validation : (Rule) => Rule.required().min(0),
    }),
    defineField({
      name : "discount",
      title : "Discount",
      type : "number",
      validation : (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name : "category",
      title : "Category",
      type : "array",
      of : [
        defineArrayMember({
          type : "reference",
          to : [{type : "category"}],
        }),
      ],
      validation : (Rule) => Rule.required().min(1).max(3),
    }),
        defineField({
          name : "brand",
          title : "Brand",
          type : "reference",
          to : [{type : "brand"}],
          validation : (Rule) => Rule.required(),
        }),
        defineField({
          name : "status",
          title : "Product Status",
          type : "string",
          options : {
            list : [
              {title : "New", value : "new"},
              {title : "Hot", value : "hot"},
              {title : "Sale", value : "sale"},
            ],
          },
        }),
        defineField({
          name : "variant",
          title : "Product Type",
          type : "string",
          options : {
            list : [
              {title : "Gadget", value : "gadget"},
              {title : "Appliances", value : "appliances"},
              {title : "Refrigerator", value : "refregirator"},
              {title : "Others", value : "others"},
            ],
          },
        }),
        defineField({
          name : "isFeatured",
          title : "Product Featured",
          type : "boolean",
          description : "Mark if the product is featured",
          initialValue : false,
        }),
      ],
      preview : {
        select : {
          title : "name",
          media : "images",
          subtitle : "price",
        },
        prepare : ({title, media, subtitle}) => {
          return {
            title,
            media : media && media[0],
            subtitle : subtitle ? `$${subtitle}` : "No price set",
          };
        },
      },
    });