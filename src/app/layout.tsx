import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
import "./globals.css";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারদর এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর দেখুন।",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <html lang="bn">
  <body className={`${notoBengali.className} flex min-h-screen flex-col`}>
  <Navbar categories={categories} products={products} />

  <main className="flex-1">
    {children}
  </main>

  <Footer />

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#FAFCFA",
        color: "#202820",
        border: "1px solid #E1E8E1",
        borderRadius: "12px",
        fontSize: "14px",
      },
    }}
  />
</body>
    </html>
  );
}
