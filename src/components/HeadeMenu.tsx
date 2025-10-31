"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();

    const HeaderData = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    { title: "Blog", href: "/blog" },
    { title: "Hot Deal", href: "/hotDeal" },
  ];
  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-7 text-sm capitalize font-semibold text-gray-800">
      {HeaderData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-green-400 hoverEffect relative group ${
            pathname === item?.href && "text-green-400"
          }`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-green-400 group-hover:w-1/2 hoverEffect group-hover:left-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-green-400 group-hover:w-1/2 hoverEffect group-hover:right-0 ${
              pathname === item?.href && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;