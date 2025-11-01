import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import { getSingleBlog, getLatestBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar, ChevronLeft, Pencil } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { SINGLE_BLOG_QUERYResult } from "../../../../../sanity.types";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [blogResult, latestBlogs] = await Promise.all([
    getSingleBlog(slug),
    getLatestBlogs()
  ]);

  const blog: SINGLE_BLOG_QUERYResult | undefined = Array.isArray(blogResult)
    ? blogResult[0]
    : blogResult;

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-white py-8">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Back Button */}
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blog</span>
              </Link>

              {/* Featured Image */}
              {blog?.mainImage && (
                <div className="mb-8">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={urlFor(blog.mainImage).url()}
                      alt={blog.title || "Blog Image"}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  </div>
                </div>
              )}

              {/* Blog Meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Pencil size={16} className="text-green-600" />
                  <span className="text-sm font-medium">{blog?.author?.name}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar size={16} className="text-green-600" />
                  <span className="text-sm font-medium">
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>

              {/* Blog Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {blog?.title}
              </h1>

              {/* Blog Content */}
              <article className="prose prose-lg max-w-none">
                {blog.body && (
                  <PortableText
                    value={blog.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="my-6 text-gray-700 leading-relaxed text-base">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="my-8 text-2xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="my-6 text-xl font-semibold text-gray-900">
                            {children}
                          </h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-6 border-l-4 border-gray-300 pl-6 text-gray-600 italic bg-gray-50 py-4 rounded-r-lg">
                            {children}
                          </blockquote>
                        ),
                      },

                      types: {
                        image: ({ value }) => (
                          <div className="my-8">
                            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                              <Image
                                alt={value.alt || ""}
                                src={urlFor(value).width(800).url()}
                                fill
                                className="object-cover"
                              />
                            </div>
                            {value.caption && (
                              <p className="text-center text-gray-500 text-sm mt-3">
                                {value.caption}
                              </p>
                            )}
                          </div>
                        ),

                        separator: ({ value }) => {
                          switch (value.style) {
                            case "line":
                              return (
                                <div className="my-8 flex justify-center">
                                  <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full" />
                                </div>
                              );
                            case "space":
                              return <div className="my-8" />;
                            default:
                              return null;
                          }
                        },
                      },

                      list: {
                        bullet: ({ children }) => (
                          <ul className="my-6 list-disc list-inside space-y-3 text-gray-700">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="my-6 list-decimal list-inside space-y-3 text-gray-700">
                            {children}
                          </ol>
                        ),
                      },

                      listItem: {
                        bullet: ({ children }) => (
                          <li className="pl-2 marker:text-green-500">{children}</li>
                        ),
                        number: ({ children }) => (
                          <li className="pl-2 marker:text-green-500 marker:font-bold">{children}</li>
                        ),
                      },

                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-900">
                            {children}
                          </strong>
                        ),

                        code: ({ children }) => (
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                            {children}
                          </code>
                        ),

                        link: ({ value, children }) => (
                          <Link
                            href={value.href}
                            className="text-green-600 hover:text-green-700 font-medium underline decoration-green-200 underline-offset-2"
                          >
                            {children}
                          </Link>
                        ),
                      },
                    }}
                  />
                )}
              </article>

              {/* Back to Blog Button */}
            
            </div>

            {/* Sidebar - Latest Blogs */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Sidebar Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Latest Blogs</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                </div>

                {/* Latest Blogs List */}
                <div className="space-y-6">
                  {latestBlogs?.slice(0, 4).map((latestBlog: any) => (
                    <Link
                      key={latestBlog._id}
                      href={`/blog/${latestBlog.slug?.current}`}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                    >
                      {/* Circular Small Image */}
                      {latestBlog?.mainImage && (
                        <div className="flex-shrink-0">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <Image
                              src={urlFor(latestBlog.mainImage).url()}
                              alt={latestBlog.title || "Blog Image"}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-green-600 transition-colors duration-200 mb-1">
                          {latestBlog.title}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={12} className="text-green-500" />
                          <span className="text-xs font-medium">
                            {dayjs(latestBlog.publishedAt).format("MMM D")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Link
                  href="/blog"
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
                >
                  View All Blogs
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SingleBlogPage;