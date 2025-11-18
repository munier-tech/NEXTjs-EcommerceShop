"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Slightly longer for better UX
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {loading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-lg z-50">
            {/* Animated Logo */}
            <div className="relative mb-6">
              {/* Outer Ring */}
              <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-pulse"></div>
              
              {/* Spinning Ring */}
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-blue-600 rounded-full animate-spin"></div>
              
              {/* Inner Dot */}
              <div className="absolute inset-0 m-auto w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-ping"></div>
            </div>

            {/* MassDropp Text */}
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Mass<span className="font-extrabold">Dropp</span>
              </h2>
              
              {/* Loading Text with Animation */}
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-sm font-medium">Loading</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-1.5 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
        
        {children}
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              color: "#fff",
              background: "#000000",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}