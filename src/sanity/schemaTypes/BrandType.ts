import { TagIcon } from "@sanity/icons";
import { defineField } from "sanity";



export const brandType = {
  name : "brand",
  title : "Brand",
  type : "document",
  icon : TagIcon,
  fields : [
    defineField({
      name : "title",
      type : "string",
    }),
    defineField({
      name : "slug",
      type : "slug",
      options : {
        source : "title",
      }
    }),
    defineField({
      name : "description",
      type : "string",
    }),
    defineField({
      name : "image",
      type : "image",
      title : "Brand image",
      options : {
        hotspot : true,
      }
    }),
  ],
  preview : {
    select : {
      title : "title",
      subTitle : "description",
      media : "image",
    }
  }
};