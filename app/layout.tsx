import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "Car Catalouge",
  description: "Discover the best cars in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Toast />
        <Footer />
      </body>
    </html>
  );
}
