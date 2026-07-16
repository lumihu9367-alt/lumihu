import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Analytics } from "@/components/analytics";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import React from "react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export const viewport: Viewport = {
  themeColor: "#1b4332",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Lumihu | 신선한 제철 식품으로 일상에 건강한 행복을 전합니다",
    template: "%s | Lumihu",
  },
  description: "자연의 신선함을 가득 담은 프리미엄 제철 식품 큐레이션 브랜드 Lumihu. 산지 직송 농산물, 특별한 사계절 레시피, 생산자 이야기까지 건강한 식탁을 만나보세요.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lumihu.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lumihu | 프리미엄 제철 식품 큐레이션",
    description: "신선한 제철 식품으로 일상에 건강한 행복을 전합니다. 산지 직송 프리미엄 농산물 브랜드 Lumihu.",
    url: "https://lumihu.vercel.app",
    siteName: "Lumihu",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Lumihu - Premium Fresh Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumihu | 프리미엄 제철 식품 큐레이션",
    description: "신선한 제철 식품으로 일상에 건강한 행복을 전합니다. 산지 직송 프리미엄 농산물 브랜드 Lumihu.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID || "google-site-verification-placeholder",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for LocalBusiness/Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lumihu",
  "url": "https://lumihu.vercel.app",
  "logo": "https://lumihu.vercel.app/logo.png",
  "description": "신선한 제철 식품으로 일상에 건강한 행복을 전하는 프리미엄 식품 큐레이션 브랜드",
  "slogan": "신선한 제철 식품으로 일상에 건강한 행복을 전합니다.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-2-1234-5678",
    "contactType": "customer service",
    "email": "support@lumihu.com",
    "availableLanguage": "Korean",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        {/* Structured Schema.org data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased text-stone-900 bg-white">
        <Analytics />
        
        {/* Header Section */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

        {/* Footer Section */}
        <Footer />
      </body>
    </html>
  );
}

// Client-compatible Layout Header Component
// Note: We keep Header interactive by structuring client interaction via ClientWrapper or inline scripts if needed, 
// but since Next.js 15 supports client-components or Server Actions, we can mark a sub-header component as "use client".
// Let's create a Client Component for Header to handle sticky state & mobile toggle.
import { HeaderClient } from "./header-client";

function Header() {
  return <HeaderClient />;
}

// Static/Semantic Footer Component
function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold text-white tracking-widest">
                LUMIHU
              </span>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm font-light leading-relaxed">
              신선한 제철 식품으로 일상에 건강한 행복을 전합니다.<br />
              자연의 순수함을 가장 빠른 시간에 식탁에 올려놓는 프리미엄 식품 브랜드입니다.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" aria-label="Instagram" className="h-8 w-8 rounded-full bg-stone-800 hover:bg-brand-dark flex items-center justify-center text-white transition-colors duration-300">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="h-8 w-8 rounded-full bg-stone-800 hover:bg-brand-dark flex items-center justify-center text-white transition-colors duration-300">
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              바로가기
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              {["브랜드 소개", "오늘의 제철식품", "인기상품", "산지 이야기", "레시피"].map((item, idx) => {
                const anchors = ["#about", "#seasonal", "#popular", "#stories", "#recipes"];
                return (
                  <li key={idx}>
                    <Link href={anchors[idx]} className="hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Business Info / Legal Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              고객지원
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="#contact" className="hover:text-white transition-colors duration-200">
                  1:1 문의하기
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors duration-200">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors duration-200">
                  자주 묻는 질문 (FAQ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Business details divider */}
        <div className="border-t border-stone-800 pt-8 text-xs font-light space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-500">
            <span>주식회사 루미후</span>
            <span>대표자: 홍길동</span>
            <span>사업자등록번호: 120-00-00000</span>
            <span>통신판매업신고: 제 2026-서울강남-0000호</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-500">
            <span>주소: 서울특별시 강남구 테헤란로 123</span>
            <span>고객센터: 1544-0000 (평일 09:00 - 18:00)</span>
            <span>이메일: support@lumihu.com</span>
          </div>
          <div className="flex flex-wrap justify-between items-center pt-4 text-stone-600">
            <span>&copy; {new Date().getFullYear()} Lumihu. All rights reserved.</span>
            <span className="flex items-center gap-1 hover:text-stone-400 transition-colors duration-300 cursor-pointer">
              Designed by Lumihu Studio <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
