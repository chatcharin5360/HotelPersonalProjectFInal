import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { AuthProvider } from "@/context/AuthContext"; // ✅ ต้อง import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxury Hotel",
  description: "Luxury hotel booking system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <div className="fixed w-full z-50">
            <Navbar />
          </div>
          <section className="w-full">
            {children}
            <Footer />
          </section>
        </AuthProvider>
      </body>
    </html>
  );
}
