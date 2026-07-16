"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeaderClient() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "브랜드소개", href: "#about" },
    { label: "제철식품", href: "#seasonal" },
    { label: "인기상품", href: "#popular" },
    { label: "산지이야기", href: "#stories" },
    { label: "레시피", href: "#recipes" },
    { label: "후기", href: "#reviews" },
    { label: "문의하기", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b",
          {
            "bg-white/80 backdrop-blur-md border-stone-100 py-3 shadow-xs": isScrolled,
            "bg-white/60 backdrop-blur-xs border-transparent py-5": !isScrolled,
          }
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="h-8 w-8 rounded-lg bg-brand-dark flex items-center justify-center text-white transition-all duration-300 group-hover:rotate-6">
              <Leaf className="h-4 w-4 fill-brand-pale text-brand-pale" />
            </span>
            <span className="text-xl font-extrabold tracking-widest text-stone-900 group-hover:text-brand-dark transition-colors duration-300">
              LUMIHU
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-stone-600 hover:text-brand-dark transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-dark after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="#contact" className="hidden lg:block">
              <Button size="sm" className="rounded-full shadow-xs px-5">
                신선식품 신청
              </Button>
            </Link>
            
            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors duration-350 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-stone-900" />
              ) : (
                <Menu className="h-6 w-6 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] bg-white border-b border-stone-100 shadow-lg z-40 lg:hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-semibold text-stone-700 hover:text-brand-dark py-1 border-b border-stone-50 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="pt-4">
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl">
                    1:1 신선식품 상담문의
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
