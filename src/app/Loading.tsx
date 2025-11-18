"use client";

import React from "react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="loader w-16 h-16 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>

      <style jsx>{`
        .loader {
          border-top-color: #6b46c1;
        }
      `}</style>
    </div>
  );
};

export default GlobalLoading;
