"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { NotionProduct } from "@/lib/notion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: NotionProduct;
  onCartClick?: (product: NotionProduct) => void;
}

export function ProductCard({ product, onCartClick }: ProductCardProps) {
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-stone-100 shadow-xs h-full flex flex-col justify-between group">
        <div>
          {/* Image container */}
          <div className="relative aspect-square w-full bg-stone-50 overflow-hidden">
            {/* Badges overlay */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[calc(100%-24px)]">
              {product.isSeasonal && (
                <Badge variant="accent" className="bg-emerald-600 text-white font-medium">
                  제철
                </Badge>
              )}
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Discount Badge */}
            {discountRate > 0 && !isOutOfStock && (
              <div className="absolute top-3 right-3 z-10 bg-rose-500 text-white font-bold text-xs px-2 py-1 rounded-md shadow-xs">
                {discountRate}% OFF
              </div>
            )}

            {/* Image */}
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-10">
                <span className="text-white font-bold text-sm bg-black/60 px-4 py-2 rounded-full border border-white/20 tracking-wider">
                  품절 (일시 품절)
                </span>
              </div>
            )}
          </div>

          <CardContent className="p-5">
            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">
              Lumihu Premium
            </h4>
            <h3 className="font-bold text-stone-900 text-base md:text-lg tracking-tight line-clamp-1 group-hover:text-brand-dark transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 h-8 leading-relaxed">
              {product.description}
            </p>
          </CardContent>
        </div>

        {/* Pricing and Action */}
        <div className="p-5 pt-0 mt-auto">
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
              <span className="text-lg font-extrabold text-stone-900 tracking-tight">
                {product.price.toLocaleString()}원
              </span>
            </div>
            <span className="text-xs font-medium text-stone-400">
              {product.stockStatus === "LOW_STOCK" ? "품절임박" : ""}
            </span>
          </div>

          <Button
            variant={isOutOfStock ? "outline" : "default"}
            className="w-full text-xs font-semibold rounded-xl group/btn transition-all duration-300"
            disabled={isOutOfStock}
            onClick={() => onCartClick && onCartClick(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
            담기
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
