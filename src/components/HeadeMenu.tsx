"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const HeaderMenu = () => {
  const HeaderData = [
    { title: "Home", href: "/" },
    { title: "shop", href: "/shop" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "HotDeal", href: "/hotDeal" },
  ];

  const pathName = usePathname();
  console.log(pathName)

  return (
    <div className='hidden md:inline-flex gap-6 capitalize text-gray-600' >
      {HeaderData?.map((item) => (
        <Link className={`relative group hover:text-green-400 text-sm font-semibold hoverEffect ${pathName === item?.href && "text-green-400"}`}  key={item.title} href={item.href}>
          {item.title}
          <span className='absolute -bottom-0.5 left-1/2 h-0.5 w-0 bg-green-400 group-hover:w-1/2 hoverEffect'>
          </span>
          <span className='absolute -bottom-0.5 right-1/2 h-0.5 w-0 bg-green-400 group-hover:w-1/2 hoverEffect'>
          </span>
        </Link>
      ))}
    </div>
  ); 
}

export default HeaderMenu
