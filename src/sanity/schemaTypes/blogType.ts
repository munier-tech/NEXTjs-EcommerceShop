import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogType = defineType({
  name : "blog",
  title : "Blog",
  type : "document",
  icon : DocumentTextIcon,
  fields : [
    defineField({
      name : "title",
      title : "Title",
      type : "string",
      description : "The title of the blog",
      validation : (Rule) => Rule.required().max(100),
    }),
    defineField({
      name : "slug",
      title : "title",
      type : "slug",
      options : {
        source : "title"
      }
    }),
    defineField({
      name : "author",
      type : "reference",
      to : { type : "author" },
    }),
    defineField({
      name : "mainimage" ,
      title : "Main Image",
      type : "image",
      description : "The main image of the blog",
      options : {
        hotspot : true
      }
    }),
    defineField({
      name : "blogcategories",
      type : "array",
      of : [
        defineArrayMember({
        type : "reference",
        to : { type : "blogcategory" }
      })]
    }),
    defineField({
      name : "publishedAt",
      type : "datetime",
    }),
    defineField({
      name : "isLatest",
      title : "Latest Blog",
      type : "boolean",
      description : "Is this the latest blog?",
      initialValue : true,
    }),
    defineField({
      name : "body",
      type : "blockContent",
    })
  ],
  preview : {
    select : {
      title : "title",
      author : "author.name",
      media : "mainImage",
      isLatest : "isLatest"
    },
    prepare(selection) {
      const { author, isLatest } = selection;
      return {
        ...selection,
        subtitle : author && `by ${author} ${isLatest ? "(Latest)" : ""}`
      };
    }
  },
});