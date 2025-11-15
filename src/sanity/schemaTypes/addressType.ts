import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export const addressType = defineType({
  name : "address",
  title: "Address",
  type : "document",
  icon : HomeIcon,
  fields : [
    defineField({
      name : "Name",
      title : "Name",
      type : "string",
      description : "freindly name for the address",
      validation : (Rule) => Rule.required().max(100),
    }),
    defineField({
      name : "email",
      title : "Email",
      type : "string",
    }),
    defineField({
      name : "streetAddress",
      title : "StreetAddress",
      type : "string",
      description : "Street address, e.g. 123 wadada madaxtooyada",
      validation : (Rule) => Rule.required().min(5).max(100),
    }),
    defineField({
      name : "city",
      title : "City",
      type : "string",
      description : "City, e.g. Hargeisa , Somaliland",
      validation : (Rule) => Rule.required(),
    }),
    defineField({
      name : "defaultAddress",
      title : "DefaultAddress",
      type : "boolean",
      description : "Is this the default address?",
      initialValue : false,
    }),
    defineField({
      name : "phone",
      title : "Phone Number",
      type : "string",
      description : "Phone number, e.g. +252612345678",
      validation : (Rule) => Rule.required().min(10).max(15),
    }),
    defineField({
      name : "createdAt",
      title : "Created At",
      type : "datetime",
      initialValue : () => new Date().toISOString(),
    })
  ],
  preview : {
    select : {
      title : "Name",
      subtitle : "address",
      city : "city",
      phone : "phone",
      state : "state",
      isDefault : "default"
    },
    prepare(selection) {
      const {title, subtitle, city, phone, state , isDefault} = selection;
      return {
        title : `${title} ${isDefault ? "(Default)" : ""}`,
        subtitle: `${subtitle}, ${city}, ${state}`,
        phone,
      };
    },
  }
})