import { defineField, defineType } from "sanity";


export const blogCategoryType = defineType({
  name : "blogcategory",
  title : "blog Category",
  type : "document",
  fields : [
    defineField({
      name : "title",
      title : "Title",
      type : "string",
      description : "The title of the category",
      validation : (Rule) => Rule.required().max(50),
    }),
    defineField({
      name : "slug",
      title :"slug",
      type : "slug",
      options : {
        source : "title",
      }
    }),
    defineField({
      name : "description",
      title : "Description",
      type : "string",
      description : "The description of the category",
      validation : (Rule) => Rule.max(200),
    })
  ],
})