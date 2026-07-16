"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Leaf,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  ThumbsUp,
  HelpCircle,
  Mail,
  CheckCircle2,
  Calendar,
  Award,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";
import { ProductCard } from "@/components/product-card";
import { ReviewCard, ReviewData } from "@/components/review-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { NotionProduct, NotionStory, NotionRecipe } from "@/lib/notion";

// Mock Reviews
const MOCK_REVIEWS: ReviewData[] = [
  {
    id: "rev-1",
    name: "김민지",
    rating: 5,
    productName: "해남 유기농 꿀 밤고구마 3kg",
    content: "정말 포슬포슬하면서 꿀이 가득 찬 단맛이 나요! 껍질째 오븐에 구워 먹었는데 가족들이 다 최고라고 하네요. 신선도가 차원이 다릅니다.",
    date: "2026-07-15",
    isVerified: true,
  },
  {
    id: "rev-2",
    name: "박성현",
    rating: 5,
    productName: "청송 당도선별 세척사과 2.5kg",
    content: "껍질째 바로 먹을 수 있어 바쁜 아침에 너무 편해요. 베어 물자마자 과즙이 팡 튀어 나와요. 아삭아삭하고 당도 최강입니다.",
    date: "2026-07-14",
    isVerified: true,
  },
  {
    id: "rev-3",
    name: "이지은",
    rating: 5,
    productName: "제주 산지직송 타이벡 조생감귤 5kg",
    content: "주문하고 바로 다음 날 도착했어요. 박스를 열자마자 신선한 귤 향이 가득해요. 껍질도 얇고 무른 거 하나 없이 완벽합니다.",
    date: "2026-07-10",
    isVerified: true,
  },
];

interface HomeClientProps {
  products: NotionProduct[];
  stories: NotionStory[];
  recipes: NotionRecipe[];
}

export function HomeClient({ products, stories, recipes }: HomeClientProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    content: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", title: "", content: "" });
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || "문의 제출에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage("서버와 통신하는 중 오류가 발생했습니다.");
    }
  };

  // Filter Products
  const seasonalProducts = products.filter((p) => p.isSeasonal);
  const popularProducts = products.filter((p) => p.tags.includes("인기") || p.stockStatus === "LOW_STOCK");

  // Understated animation fade-in definition
  const fadinUp = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  return (
    <div className="pt-[70px]">
      {/* 1. Hero Section (Home) */}
      <section id="hero" className="relative min-h-[90vh] flex items-center bg-stone-50 overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
            alt="Premium Fresh Produce"
            fill
            priority
            className="object-cover opacity-20 filter grayscale-10 select-none scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-pale text-brand-dark px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase select-none">
              <Leaf className="h-3 w-3 fill-brand-pale" />
              <span>Premium Fresh Food Curation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-tight md:leading-none">
              신선한 제철 식품으로<br />
              <span className="text-brand-dark">일상에 건강한 행복</span>을<br />
              전합니다.
            </h1>
            
            <p className="text-base md:text-lg text-stone-500 font-light leading-relaxed">
              Lumihu는 현지 직거래를 통해 가장 신선한 찰나의 순간을 포착하여 식탁에 배달합니다. 자연의 흐름을 거스르지 않는 제철 농산물로 가족의 행복을 채워보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a href="#seasonal">
                <Button size="lg" className="rounded-xl w-full sm:w-auto shadow-md hover:shadow-lg">
                  오늘의 제철 식품 보기 <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#about">
                <Button size="lg" variant="outline" className="rounded-xl w-full sm:w-auto hover:bg-stone-50">
                  브랜드 이야기
                </Button>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-stone-200/60">
              <div>
                <h4 className="text-2xl font-extrabold text-brand-dark">100%</h4>
                <p className="text-xs text-stone-400 font-medium mt-1">산지직송 보장</p>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-brand-dark">12 Brix+</h4>
                <p className="text-xs text-stone-400 font-medium mt-1">엄격한 당도 선별</p>
              </div>
              <div>
                <h4 className="text-2xl font-extrabold text-brand-dark">24h</h4>
                <p className="text-xs text-stone-400 font-medium mt-1">안심 신선보장제</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden lg:block relative aspect-square w-full max-w-[500px] justify-self-center rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
              alt="Premium Fig Salad"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-stone-100 max-w-[280px]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-dark">이달의 추천 상품</span>
              <h4 className="font-extrabold text-stone-900 text-sm mt-0.5">유기농 햇 무화과 1.2kg</h4>
              <p className="text-xs text-stone-500 font-light mt-1 line-clamp-2">지금 시기에만 만날 수 있는 은은한 벌꿀 향의 명품 무화과를 산지에서 바로 보내드립니다.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Introduction */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Brand Story"
            title="자연이 주는 온전한 시간 그대로"
            subtitle="Lumihu는 단순한 농산물 유통을 넘어, 땅을 가꾸는 농부의 신념과 그들의 땀방울이 온전히 전해지도록 돕습니다."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            <motion.div {...fadinUp} className="space-y-4 p-8 rounded-2xl border border-stone-100 bg-stone-50/20">
              <div className="h-12 w-12 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">깐깐한 선별 기준</h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                검증된 당도 측정 장비를 사용하여 프리미엄 기준(12Brix 이상)에 부합하는 정예 상품군만 엄선하여 공급합니다.
              </p>
            </motion.div>

            <motion.div {...fadinUp} className="space-y-4 p-8 rounded-2xl border border-stone-100 bg-stone-50/20">
              <div className="h-12 w-12 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">24시간 내 수확 배송</h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                유통 단계를 최소화하여 산지에서 즉시 수확한 농산물을 24시간 이내에 가장 신선한 상태로 가정의 문 앞까지 배송합니다.
              </p>
            </motion.div>

            <motion.div {...fadinUp} className="space-y-4 p-8 rounded-2xl border border-stone-100 bg-stone-50/20">
              <div className="h-12 w-12 rounded-xl bg-brand-pale text-brand-dark flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">100% 신선 보장제</h3>
              <p className="text-sm text-stone-500 font-light leading-relaxed">
                배송 중 손상되었거나 수령 후 품질에 만족하지 않으실 경우, 24시간 내에 100% 신속한 교환 및 환불 처리를 약속합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Today's Seasonal Foods (오늘의 제철식품) */}
      <section id="seasonal" className="py-24 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Seasonal Selection"
            title="지금 이 순간, 가장 영양가 높은 제철 식품"
            subtitle="사계절의 변화에 맞춰 자연이 가장 잘 영글게 한 오늘의 한정 수량 수확물들을 만나보세요."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Products (인기상품) */}
      <section id="popular" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Best Sellers"
            title="꾸준히 사랑받는 베스트 상품"
            subtitle="품질과 가치를 인정받아 고객들에게 가장 반응이 뜨거운 프리미엄 스테디셀러 농산물입니다."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Local Stories (산지 이야기) */}
      <section id="stories" className="py-24 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Farm Stories"
            title="정직한 농부들의 땀방울이 머무는 산지 이야기"
            subtitle="가장 건강한 농산물이 자라나는 자연의 깊은 숨소리와, 흙을 가꾸는 농부들의 가치 있는 철학을 만나봅니다."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <motion.div
                key={story.id}
                {...fadinUp}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-100 bg-white shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Meta Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-brand-light mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{story.location}</span>
                      <span>•</span>
                      <span>{story.producerName}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight line-clamp-2">
                      {story.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-stone-500 font-light leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-brand-dark group-hover:text-brand-medium transition-colors">
                    <span>자세히 읽어보기</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Recipes (레시피) */}
      <section id="recipes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Culinary Art"
            title="제철 재료로 짓는 자연주의 레시피"
            subtitle="신선한 과일과 채소 본연의 영양과 맛을 듬뿍 살려, 누구나 쉽게 조리해 볼 수 있는 웰빙 식단 가이드."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                {...fadinUp}
                className="border border-stone-100 rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 hover:shadow-md transition-all duration-300"
              >
                {/* Visual */}
                <div className="relative h-56 sm:h-full w-full bg-stone-100 min-h-[250px]">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                
                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-800 border-none font-medium">
                        {recipe.difficulty}
                      </Badge>
                      <span className="text-xs text-stone-400 font-semibold">{recipe.prepTime} 소요</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-2 leading-tight">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light leading-relaxed mb-4">
                      {recipe.description}
                    </p>

                    <h4 className="text-xs font-bold text-stone-900 mb-1.5">필요 재료</h4>
                    <ul className="text-xs text-stone-500 space-y-1 font-light list-disc pl-4 mb-4">
                      {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-stone-100 pt-4 mt-auto">
                    <h4 className="text-xs font-bold text-stone-950 mb-2">간단 조리 순서</h4>
                    <ol className="text-[11px] text-stone-400 space-y-1 list-decimal pl-4">
                      {recipe.instructions.slice(0, 2).map((inst, idx) => (
                        <li key={idx} className="line-clamp-1">{inst}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews (고객 후기) */}
      <section id="reviews" className="py-24 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            badge="Customer Reviews"
            title="고객이 보증하는 Lumihu의 정직함"
            subtitle="식재료의 맛, 신선도, 안전성까지 직접 받아보신 분들이 솔직하게 작성해주신 리얼 구매 리뷰입니다."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle
            badge="FAQ"
            title="자주 묻는 질문"
            subtitle="Lumihu 서비스 이용과 배송, 상품 교환 및 환불 등에 대해 자주 질문하시는 내용을 취합했습니다."
          />

          <Accordion className="mt-8 max-w-3xl mx-auto border-t border-stone-200 pt-4">
            <AccordionItem value="faq-1">
              <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
              <AccordionContent>
                Lumihu는 최상의 신선도를 보장하기 위해 산지 직송 시스템을 채택하고 있습니다. 
                매일 오후 1시 이전 결제 완료된 건에 한하여 산지에서 즉시 당일 수확하여 포장되며, 평균적으로 주문하신 다음 날 오전에 배달이 완료됩니다. (일부 산간 지역의 경우 1일 정도 추가 소요될 수 있습니다.)
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="faq-2">
              <AccordionTrigger>신선 보장 제도는 어떻게 적용받을 수 있나요?</AccordionTrigger>
              <AccordionContent>
                신선식품은 유통 과정 중 충격이나 기상 환경 변화 등으로 간혹 상태가 변할 수 있습니다. 
                Lumihu는 100% 보장제를 운영하고 있어, 배송 받으신 후 상품 상자를 열고 신선도에 문제를 발견하시면 24시간 이내에 문제 부위의 사진을 1~2장 찍으신 후 아래 문의하기 양식을 통해 접수해 주십시오. 
                확인 즉시 전액 환불 혹은 새로운 상품으로 재배송 처리를 신속하게 도와드립니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3">
              <AccordionTrigger>정기 배송 또는 대량 주문도 가능한가요?</AccordionTrigger>
              <AccordionContent>
                네, 매월 제철 식품을 편리하게 받아보실 수 있는 정기 배송 멤버십 서비스 및 식당/단체용 대량 구매를 지원합니다. 
                하단의 1:1 문의사항 폼을 통해 '정기 배송 신청' 또는 '대량 문의' 제목으로 연락처와 상세 수량을 작성하여 남겨주시면, 담당 큐레이터가 직접 전화를 드려 상세 견적과 주기 맞춤형 설정을 안내해 드립니다.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4">
              <AccordionTrigger>유기농 또는 무농약 상품 기준은 어떻게 되나요?</AccordionTrigger>
              <AccordionContent>
                저희는 국립농산물품질관리원에서 엄격히 관리하는 유기농(농약과 화학비료를 전혀 쓰지 않음), 무농약(화학비료는 일부 권장량 이하로 사용하나 농약은 일절 쓰지 않음), 저탄소 인증을 취득한 안심 농가들과 전속 제휴를 맺고 있습니다. 
                각 상품 페이지와 배지에 개별 품목별 인증 상태를 상세하게 투명 공개하고 있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 9. Contact Inquiry Form */}
      <section id="contact" className="py-24 bg-stone-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle
            badge="Contact Us"
            title="1:1 맞춤형 서비스 문의하기"
            subtitle="제철식품 정기배송 상담, 대량 주문 및 환불 접수, 산지 파트너십 제안 등 궁금하신 내용을 보내주시면 2시간 이내에 성심껏 답변드리겠습니다."
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-stone-100 rounded-3xl p-8 md:p-10 shadow-xs"
          >
            {formStatus === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-brand-dark">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">문의가 성공적으로 전달되었습니다</h3>
                <p className="text-sm text-stone-500 font-light max-w-sm mx-auto">
                  남겨주신 이메일과 전화번호를 통해 담당자 배정 후 신속하게 회신해 드리겠습니다. 감사합니다.
                </p>
                <div className="pt-6">
                  <Button variant="outline" onClick={() => setFormStatus("idle")}>
                    새 문의 작성하기
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      성함 / 담당자명 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="성함을 입력하세요"
                      className="w-full h-11 px-4 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      이메일 주소 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@company.com"
                      className="w-full h-11 px-4 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      연락처 (선택)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="010-0000-0000"
                      className="w-full h-11 px-4 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all"
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      문의 유형 / 제목 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="정기 배송 문의, 교환 신청 등"
                      className="w-full h-11 px-4 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label htmlFor="content" className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    문의 내용 상세 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="문의사항 또는 신청 내역을 구체적으로 기재해주시면 더욱 정확한 답변이 가능합니다."
                    className="w-full p-4 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:border-brand-dark focus:ring-1 focus:ring-brand-dark transition-all resize-none"
                  />
                </div>

                {formStatus === "error" && (
                  <p className="text-xs font-semibold text-rose-500 bg-rose-50 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl"
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? "문의사항을 접수 중입니다..." : "1:1 문의 발송하기"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-stone-950/10 z-0" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-light">
            Lumihu Fresh Membership
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            매월 찾아오는 자연의 선물, 정기배송을 신청해보세요.
          </h2>
          <p className="text-sm md:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            한 달에 한 번, 전문가가 매 시기 최상의 맛을 자랑하는 제철 농산물만 골라 가이드 북과 함께 패키지로 구성하여 집으로 특별 배송해 드립니다.
          </p>
          <div className="pt-4">
            <a href="#contact">
              <Button size="lg" variant="secondary" className="rounded-full shadow-lg">
                정기배송 패키지 상담 예약 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
