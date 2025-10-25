"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const HeaderMenu = () => {
  const HeaderData = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Hot Deal", href: "/hotDeal" },
  ];

  const pathName = usePathname();

  return (
    <div className='hidden md:flex items-center gap-8 capitalize'>
      {HeaderData?.map((item) => (
        <Link 
          className={`relative group transition-all duration-300 font-semibold text-sm ${
            pathName === item?.href 
              ? "text-green-500 font-semibold" 
              : "text-gray-600 hover:text-green-500"
          }`}  
          key={item.title} 
          href={item.href}
        >
          {item.title}
          
          {/* Animated underline */}
          <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-500 transition-all duration-300 ${
            pathName === item?.href 
              ? "w-full" 
              : "w-0 group-hover:w-full"
          }`}></span>
          
          {/* Hover background effect */}
          <span className="absolute inset-0 rounded-lg bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
        </Link>
      ))}
    </div>
  ); 
}

export default HeaderMenu