"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ReviewData {
  id: string;
  name: string;
  rating: number;
  productName: string;
  content: string;
  date: string;
  isVerified: boolean;
}

interface ReviewCardProps {
  review: ReviewData;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full border border-stone-100/80 bg-stone-50/30 p-6 flex flex-col justify-between hover:bg-white hover:border-brand-pale transition-colors duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-stone-900 text-sm">{review.name}</span>
              {review.isVerified && (
                <Badge variant="secondary" className="text-[10px] py-0 px-2 font-normal bg-stone-100 text-stone-500 border-none">
                  구매자 인증
                </Badge>
              )}
            </div>
            <span className="text-xs text-stone-400 font-medium">{review.date}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"
                }`}
              />
            ))}
          </div>

          {/* Review text */}
          <p className="text-sm text-stone-600 leading-relaxed font-normal mb-4 italic">
            "{review.content}"
          </p>
        </div>

        {/* Product context */}
        <div className="border-t border-stone-100 pt-3 mt-auto flex items-center justify-between">
          <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
            구매 상품
          </span>
          <span className="text-xs font-medium text-stone-500 line-clamp-1 max-w-[70%]">
            {review.productName}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
