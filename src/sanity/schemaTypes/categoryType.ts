import { TagIcon } from "@sanity/icons";
import { defineField, defineType, Preview } from "sanity";


export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon : TagIcon,
  fields : [
    defineField({
       name: "title",
       type: "string",
    }),
    defineField({
      name : "range",
      type : "number",
      description : "start from 1 to 10, the higher the number the more important the category is"
    }),
    defineField({
      name : "slug",
      type : "slug",
      options : {
        source : "title",
        maxLength : 96,
      },
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "description",
      type : "text",
    }),
    defineField({
      name : "featured",
      type : "boolean",
      initialValue : false,
    }),
    defineField ({
      name : "image",
      type : "image",
      options : {
        hotspot : true,
      }
    }),
  ],
  preview : {
    select : {
      title : "title",
      subtitle : "description",
      media : "image",
    }
  },
});