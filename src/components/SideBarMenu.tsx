"use client";
import React, { FC } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";

interface SideBarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBarMenu: FC<SideBarMenuProps> = ({ isOpen, onClose }) => {
  const HeaderData = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/shop" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "HotDeal", href: "/hotDeal" },
  ];

  const pathName = usePathname();

  return (
    <div
      className={`fixed inset-y-0 left-0 w-full transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-black/20 text-white h-screen z-50`}
    >
      <div className="min-w-72 max-w-92 h-screen bg-black text-white p-10 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-6">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            onClick={onClose}
            className="hover:text-green-400 cursor-pointer hoverEffect font-bold text-xl mt-1"
          >
            X
          </button>
        </div>

        {/* links */}
        <div className="flex flex-col  space-y-3.5">
          {HeaderData.map((item) => {
            const isActive = pathName === item.href ;
            return (
              <Link key={item.title} href={item.href}>
                <span
                  className={`hover:text-green-400 hoverEffect ${
                    isActive ? "text-green-400" : "text-white"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* social media  */}

        <div>
          <SocialMedia/>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;
