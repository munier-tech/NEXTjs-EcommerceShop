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

interface Params {
  slug: string;
}

const SingleBlogPage = async ({ params }: { params: Params }) => {
  const { slug } = params;

  const [blogResult, latestBlogs] = await Promise.all([
    getSingleBlog(slug),
    getLatestBlogs(),
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

              {/* Back */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blog</span>
              </Link>

              {/* Featured Image */}
              {blog.mainImage && (
                <div className="mb-8">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={urlFor(blog.mainImage).url()}
                      alt={blog.title ?? "Blog image"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-gray-600">
                  <Pencil className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {blog.author?.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-gray-600">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    {dayjs(blog.publishedAt).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {blog.title}
              </h1>

              {/* Content */}
              <article className="prose prose-lg max-w-none">
                {blog.body && (
                  <PortableText
                    value={blog.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="my-6 text-gray-700 text-base leading-relaxed">
                            {children}
                          </p>
                        ),
                      },

                      types: {
                        image: ({ value }) => (
                          <div className="my-8">
                            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                              <Image
                                src={urlFor(value).width(800).url()}
                                alt={value.alt ?? ""}
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
                      },
                    }}
                  />
                )}
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-xl font-bold mb-3">Latest Blogs</h3>
                <div className="w-12 h-1 bg-green-500 rounded-full mb-6" />

                <div className="space-y-6">
                  {latestBlogs?.slice(0, 4).map(() => (
                    <Link
                      key={latestBlogs?._id}
                      href={`/blog/${latestBlogs?.slug?.current}`}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                    >
                      {latestBlogs?.mainImage && (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md">
                          <Image
                            src={urlFor(latestBlogs?.mainImage).url()}
                            alt={latestBlogs?.title ?? "Blog Image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-green-600">
                          {latestBlogs?.title}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={12} className="text-green-500" />
                          <span className="text-xs">
                            {dayjs(latestBlogs?.publishedAt).format("MMM D")}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/blog"
                  className="w-full mt-6 inline-flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-xl shadow hover:bg-green-700 transition"
                >
                  View All Blogs
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