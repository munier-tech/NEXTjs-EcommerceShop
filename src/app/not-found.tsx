"use client"; // Add this at the top to make it a Client Component

import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div style={{
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "448px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      }}>
        <div style={{ textAlign: "center" }}>
          <Logo />
          <h2 style={{
            marginTop: "24px",
            fontSize: "30px",
            fontWeight: 800,
            color: "#111827"
          }}>
            Looking for something?
          </h2>
          <p style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#6B7280"
          }}>
            We&apos;re sorry. The Web address you entered is not a functioning
            page on our site.
          </p>
        </div>
        <div style={{
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            <Link
              href="/"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                border: "1px solid transparent",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "6px",
                color: "white",
                backgroundColor: "rgba(22, 163, 74, 0.8)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              className="hover:bg-green-600 hover:-translate-y-0.5"
            >
              Go to MassDrop&apos;s home page
            </Link>
            <Link
              href="/help"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 16px",
                border: "1px solid #D1D5DB",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "6px",
                color: "#374151",
                backgroundColor: "white",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
              className="hover:bg-gray-50"
            >
              Help
            </Link>
          </div>
        </div>
        <div style={{
          marginTop: "32px",
          textAlign: "center",
          fontSize: "14px",
          color: "#6B7280"
        }}>
          <p>
            Need help? Visit the{" "}
            <Link
              href="/help"
              style={{
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none"
              }}
              className="hover:text-green-700"
            >
              Help section
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              style={{
                fontWeight: 500,
                color: "#374151",
                textDecoration: "none"
              }}
              className="hover:text-green-700"
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;