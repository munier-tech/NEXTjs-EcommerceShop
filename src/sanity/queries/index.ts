import { Slug } from "../../../sanity.types";
import { sanityFetch } from "../lib/live";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(title asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(title asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};
const getBrandBySlug = async (slug: string) => {
  try {
    console.log('Fetching with slug:', slug);
    
    const result = await sanityFetch({
      query: `*[_type == "product" && slug.current == $slug][0]{
        "brandName": brand->title
      }`,
      params: { slug },
    });
    
    console.log('Full result:', result);
    console.log('Result data:', result?.data);
    
    return result?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};


import { client } from "@/sanity/lib/client";
import { BRAND_QUERY, BRANDS_QUERY, GET_ALL_BLOG, SINGLE_BLOG_QUERY } from "./query";

const getProductBySlug = async (slug: string) => {
  const query = `
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      stock,
      variant,
      discount,
      brand,
      "category": category[]->title,
      images[], // keep full reference for urlFor()
    }
  `;
  return await client.fetch(query, { slug });
};

const getAllBlogs = async (quantity: number) => {
  try {
    const { data } = await sanityFetch({
      query: GET_ALL_BLOG,
      params: { quantity },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getBrands = async () => {
  try {

    const { data } = await sanityFetch({ query : BRANDS_QUERY });

    return data || [];
    
  } catch (error) {
    console.log("Error fetching brands", error);
    return [];
  }
}

const getBlogs = async () => {
  const { data } = await sanityFetch({
    query: `*[_type == "blog"] | order(publishedAt desc) {
      ...,
      blogcategory->{title}
    }`,
  });

  return data || [];
};

const getLatestBlogs = async () => {
  const { data } = await sanityFetch({
    query: `*[_type == "blog" && isLatest == true] | order(publishedAt desc) {
      ...,
      blogcategory->{title}
    }`,
  });

  return data || [];
};


const getDeals = async () => {
  try {

    const { data } = await sanityFetch({ query : `*[_type == "product" && status == "hot"] | order(title asc) {
      ...,"categores" : categories[]->title }` });


    return data || [];
    
  } catch (error) {
    console.log("Error fetching deals", error);
    return [];
  }
}

export { getCategories , getAllBlogs , getSingleBlog ,   getBrands , getBlogs , getBrandBySlug , getLatestBlogs, getProductBySlug , getDeals};