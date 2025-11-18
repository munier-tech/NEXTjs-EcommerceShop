import React from "react";
import { getAllBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import { GET_ALL_BLOGResult } from "../../../../sanity.types";

// Simplified blog type without categories
type BlogWithoutCategory = Omit<GET_ALL_BLOGResult[0], "blogcategories">;

const BlogsPage = async () => {
  const blogs: BlogWithoutCategory[] = await getAllBlogs(10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div>
        <title>Blog - MassDropp | Online Ecommerce Platform</title>
        <meta
          name="description"
          content="Get in touch with MassDropp. We're here to help with any questions about our products, services, or your shopping experience."
        />
        <link rel="icon" href="/favicon.ico" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Our <span className="text-purple-600">Blog</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover insightful Blogs
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 blur-xl"></div>
      </section>

      {/* Blogs Grid Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Here are our Blogs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest insights, tips, and industry news
            </p>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {blogs?.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer"
              >
                {/* Image Container */}
                {blog?.mainImage && (
                  <Link href={`/blog/${blog?.slug?.current}`}>
                    <div className="relative overflow-hidden h-64">
                      <Image
                        src={urlFor(blog.mainImage).url()}
                        alt={blog.title || "Blog image"}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Static Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                          Article
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-500" />
                      <span className="text-sm font-medium">
                        {blog.publishedAt
                          ? dayjs(blog.publishedAt).format("MMMM D, YYYY")
                          : "Unknown date"}
                      </span>
                    </div>
                    {blog?.author && (
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-purple-500" />
                        <span className="text-sm font-medium">
                          {typeof blog.author === "string"
                            ? blog.author
                            : ((blog.author as any)?.name ?? "Admin")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${blog?.slug?.current}`}>
                    <h3 className="font-bold text-xl text-gray-900 mb-4 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                      {blog?.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                    {blog?.description}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link
                      href={`/blog/${blog?.slug?.current}`}
                      className="text-purple-600 font-semibold group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-2"
                    >
                      Read more
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                    {/* Reading Time */}
                   
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 lg:p-16 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Stay Updated
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Never miss our latest Blogs and insights. Subscribe to our
                newsletter for regular updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/blog"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                100+
              </div>
              <div className="text-gray-600 text-lg">Blogs Published</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                50K+
              </div>
              <div className="text-gray-600 text-lg">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                10+
              </div>
              <div className="text-gray-600 text-lg">Expert Writers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                5⭐
              </div>
              <div className="text-gray-600 text-lg">Reader Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
