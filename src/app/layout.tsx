import { Toaster } from "react-hot-toast"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {children}
        <Toaster 
        position="bottom-right"
        toastOptions={{
          style : {
            color : "#fff",
            background: "#000000"
          }
        }}
        />
      </body>
    </html>
  );
}
