"use client";
import React, { FC } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Logs } from "lucide-react";

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
    { title: "Custom Order", href: "/custom-order" },
  ];

  const pathName = usePathname();

  return (
    <div
      className={`fixed inset-0 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-black/60 backdrop-blur-sm h-screen z-50`}
      onClick={onClose}
    >
      <div 
        className={`fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-gray-900 to-black text-white h-screen transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col p-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-6 pb-6 border-b border-gray-700">
            <Logo className="text-white" spanDesign="group-hover:text-white" />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white hover:text-green-400 cursor-pointer transition-all duration-300 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <div className="flex flex-col space-y-2">
              {HeaderData.map((item) => {
                const isActive = pathName === item.href;
                return (
                  <Link key={item.title} href={item.href} onClick={onClose}>
                    <div
                      className={`px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:translate-x-2 group ${
                        isActive 
                          ? "bg-green-500/20 text-green-400 border-l-4 border-green-400" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span className="font-medium">{item.title}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-green-400 rounded-full float-right mt-2 animate-pulse" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Orders and Auth Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            {/* Orders Link - Only show when signed in */}
            <ClerkLoaded>
              <SignedIn>
                <Link href="/orders" onClick={onClose}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-800 group">
                    <div className="relative">
                      <Logs className="w-5 h-5 text-gray-300 group-hover:text-green-400 transition-colors" />
                    </div>
                    <span className="font-medium text-gray-300 group-hover:text-white">My Orders</span>
                    <div className="ml-auto">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        ?
                      </div>
                    </div>
                  </div>
                </Link>
              </SignedIn>
            </ClerkLoaded>

            {/* Auth Section */}
            <ClerkLoaded>
              <div className="space-y-3">
                {/* Show UserButton when signed in */}
                <SignedIn>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50">
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">Account</p>
                    </div>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-8 h-8",
                        }
                      }}
                    />
                  </div>
                </SignedIn>

                {/* Show SignInButton when signed out */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </ClerkLoaded>
          </div>

          {/* Social Media */}
          <div className="pt-6 mt-4 border-t border-gray-700">
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarMenu;