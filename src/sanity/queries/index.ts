import { Slug } from "../../../sanity.types";
import { sanityFetch } from "../lib/live";
import { BRANDS_QUERY } from "./query";

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

import { client } from "@/sanity/lib/client";

const getProductBySlug = async (slug: string) => {
  const query = `
    *[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      stock,
      discount,
      "brand": brand->name,
      "category": category[]->title,
      images[], // keep full reference for urlFor()
    }
  `;
  return await client.fetch(query, { slug });
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

export { getCategories , getBrands , getBlogs  , getLatestBlogs, getProductBySlug , getDeals};