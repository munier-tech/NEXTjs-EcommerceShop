import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type == "brand"] | order(name asc)`)
const BRAND_QUERY =  defineQuery(`*[_type == "product" && slug.current == $slug]{
  "brandName": brand->title
  }`);

  const GET_ALL_BLOG = defineQuery(
  `*[_type == 'blog'] | order(publishedAt desc)[0...$quantity]{
  ...,  
     blogcategories[]->{
    title
}
    }
  `
);

const SINGLE_BLOG_QUERY =
  defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  ..., 
    author->{
    name,
    image,
  },
  blogcategories[]->{
    title,
    "slug": slug.current,
  },
}`);


export { BRANDS_QUERY , BRAND_QUERY , SINGLE_BLOG_QUERY , GET_ALL_BLOG}