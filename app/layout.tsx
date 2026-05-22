'use client'
import { useState } from 'react'
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-black`}>
        
        {/* SINGLE CLEAN NAVBAR */}
        <nav className="w-full bg-white border-b border-gray-100 px-6 md:px-8 py-4 flex justify-between items-center sticky top-0 z-[100]">
          
          {/* 1. Logo Section (Left) */}
          <Link href="/" className="no-underline flex items-center gap-3 group">
            <img src="/logo.svg" alt="Pazmat Logo" className="h-10 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-playfair text-xl font-black tracking-tighter text-black uppercase">PAZMAT</span>
              <span className="text-[7px] font-inter font-bold tracking-[0.4em] text-green-700 uppercase">INVESTMENTS</span>
            </div>
          </Link>

          {/* 2. Desktop Navigation (Right) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[.2em] text-gray-400 hover:text-black no-underline transition">Home</Link>
            <Link href="/services" className="text-[10px] font-bold uppercase tracking-[.2em] text-gray-400 hover:text-black no-underline transition">Services</Link>
            <Link href="/about" className="text-[10px] font-bold uppercase tracking-[.2em] text-gray-400 hover:text-black no-underline transition">About</Link>
            <Link href="/gallery" className="text-[10px] font-bold uppercase tracking-[.2em] text-gray-400 hover:text-black no-underline transition">Gallery</Link>
            <Link href="/contact" className="text-[10px] font-bold uppercase tracking-[.2em] text-white bg-black px-4 py-2 hover:bg-green-800 transition no-underline">Contact</Link>
          </div>

          {/* 3. Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black font-bold text-[10px] tracking-widest border border-black px-3 py-1"
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </button>

          {/* 4. Mobile Menu Overlay (Only visible on mobile when open) */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b shadow-2xl flex flex-col p-8 gap-6 md:hidden animate-in slide-in-from-top-2">
              <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-xs font-bold uppercase tracking-widest no-underline text-black">Home</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/services" className="text-xs font-bold uppercase tracking-widest no-underline text-black">Services</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/about" className="text-xs font-bold uppercase tracking-widest no-underline text-black">About</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/gallery" className="text-xs font-bold uppercase tracking-widest no-underline text-black">Gallery</Link>
              <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="text-xs font-bold uppercase tracking-widest no-underline text-green-700 font-black">Contact Us</Link>
            </div>
          )}
        </nav>

        {/* WHATSAPP BUTTON */}
        <a 
          href="https://wa.me/263772639622" 
          target="_blank"
          className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl z-[999] font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-transform no-underline flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          Chat with us
        </a>

        {children}

      </body>
    </html>
  );
}