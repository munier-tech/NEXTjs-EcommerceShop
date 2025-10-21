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


export { getCategories , getBrands , getBlogs  , getLatestBlogs };