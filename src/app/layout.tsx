"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";

const kronaOne = localFont({
  src: "../../public/fonts/KronaOne-Regular.ttf",
  variable: "--font-krona-one",
});

const libreBaskerville = localFont({
  src: "../../public/fonts/LibreBaskerville-Regular.ttf",
  variable: "--font-libre-baskerville",
});

const krub = localFont({
  src: "../../public/fonts/Krub-Regular.ttf",
  variable: "--font-krub",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${kronaOne.variable} ${libreBaskerville.variable} ${krub.variable} antialiased bg-[#101010] text-white`}
      >
        <AppContent>{children}</AppContent>
      </body>
    </html>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Logo />
      <Header isScrolled={isScrolled} />
      <main className="pt-32">{children}</main>
    </>
  );
}

function Logo() {
  return (
    <div className="absolute top-5 left-8 z-50">
      <Link href="/">
        <Image src="/logo.png" alt="PD-Atlas Logo" width={80} height={30} />
      </Link>
    </div>
  );
}

function Header({ isScrolled }: { isScrolled: boolean }) {
  return (
    <header
      className={`fixed top-5 left-0 right-0 z-40 mx-auto flex items-center h-20 px-8 bg-[#d6ccc8] bg-opacity-90 text-black rounded-[15px] shadow-2xl transition-all duration-500 ${
        isScrolled ? "max-w-[1000px]" : "max-w-[1300px]"
      }`}>
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="text-[30px] tracking-wide hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-libre-baskerville)" }}>
          PD-Atlas
        </Link>
        <div className="h-12 border-l border-gray-400"></div>
      </div>

      <div className="flex-1 flex justify-center">
        <nav className="flex space-x-8">
          <Link
            href="https://cortexpd.org"
            className="text-[18px] font-medium relative group transition-all duration-300"
            style={{ fontFamily: "var(--font-krub)" }}
          >
            <span className="group-hover:bg-gray-200 group-hover:opacity-100 opacity-0 transition-all duration-300 absolute inset-0 rounded-lg"></span>
            <span className="relative z-10 px-2 py-1">Home</span>
          </Link>
          {["Documentation", "API"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[18px] font-medium relative group transition-all duration-300"
              style={{ fontFamily: "var(--font-krub)" }}
            >
              <span className="group-hover:bg-gray-200 group-hover:opacity-100 opacity-0 transition-all duration-300 absolute inset-0 rounded-lg"></span>
              <span className="relative z-10 px-2 py-1">{item}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="ml-auto flex space-x-4">
        <Link href="/signup">
          <button
            className="text-[18px] bg-gray-300 px-5 py-1.5 rounded hover:bg-gray-400 transition-all duration-500"
            style={{ fontFamily: "var(--font-libre-baskerville)" }}
          >
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button
            className="text-[18px] border border-gray-500 px-5 py-1.5 rounded hover:bg-gray-200 transition-all duration-500"
            style={{ fontFamily: "var(--font-libre-baskerville)" }}
          >
            Log In
          </button>
        </Link>
      </div>
    </header>
  );
}
