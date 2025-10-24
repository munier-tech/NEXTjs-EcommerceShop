import React from "react";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
      <h1 className="text-xl font-bold">Latest Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog : any) => (
          <div key={blog?._id} className="overflow-hidden hover:border-black border-gray-300 rounded-lg cursor-pointer hoverEffect border-1">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="w-full max-h-40 object-cover hover:scale-105 transition-transform hoverEffect"
                />
              </Link>
            )}
            <div className="bg-white p-5">
              <div className="text-xs flex items-center gap-5">
              <div
              className="text-xs group cursor-pointer text-green-700 font-bold hoverEffect relative group"  
              >
              {blog?.title}
              <span className="left-0 -bottom-1.5 bg-gray-300 hover:text-green-900 absolute w-full h-[2px]" ></span>
              </div>
                <p className="flex items-center gap-1 text-gray-500 relative group hover:cursor-pointer  hoverEffect">
                  <Calendar size={15} />{" "}
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-gray-300 inline-block w-full h-[2px] group-hover:bg-green-900 hoverEffect" />
                </p>
              </div>
              <div
                className="text-base  font-bold tracking-wide mt-5 line-clamp-2"
              >
                {blog?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;