import { MetadataRoute } from "next";
import { NotionCMS } from "@/lib/notion";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumihu.vercel.app";

  // 기본 고정 페이지 경로 정의
  const routes = [
    "",
    "/about",
    "/products",
    "/stories",
    "/recipes",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Notion CMS 데이터를 활용하여 동적 페이지 생성 (향후 개별 페이지 확장 대비)
    const [products, stories, recipes] = await Promise.all([
      NotionCMS.getProducts(),
      NotionCMS.getStories(),
      NotionCMS.getRecipes(),
    ]);

    const productRoutes = products.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    const storyRoutes = stories.map((s) => ({
      url: `${baseUrl}/stories/${s.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    const recipeRoutes = recipes.map((r) => ({
      url: `${baseUrl}/recipes/${r.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...productRoutes, ...storyRoutes, ...recipeRoutes];
  } catch (error) {
    console.error("sitemap generation error:", error);
    return routes;
  }
}
