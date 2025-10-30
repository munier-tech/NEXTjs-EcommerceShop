import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(name asc)`)
const BRAND_QUERY =  defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);


export { BRANDS_QUERY , BRAND_QUERY }