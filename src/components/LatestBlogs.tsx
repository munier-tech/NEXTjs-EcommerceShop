import React from "react";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { GET_ALL_BLOGResult } from "../../sanity.types";

const LatestBlog = async () => {
  const blogs: GET_ALL_BLOGResult = await getLatestBlogs();
  return (
    <div className="mb-16 lg:mb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Latest Blog
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs?.map((blog) => (
          <article 
            key={blog?._id} 
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            {/* Image Container */}
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <Link href={`/blog/${blog?.slug?.current}`}>
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                  {blog?.title}
                </h3>
              </Link>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <Calendar size={16} className="text-green-500" />
                <span className="text-sm font-medium">
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                {blog?.description}
              </p>

              {/* Read More Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-green-600 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                  Read more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link 
          href="/blog"
          className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View All Articles
        </Link>
      </div>
    </div>
  );
};

export default LatestBlog;