import { NotionCMS } from "@/lib/notion";
import { HomeClient } from "./home-client";

// ISR (Incremental Static Regeneration) 설정: 1시간(3600초)마다 데이터 갱신
export const revalidate = 3600;

export default async function Home() {
  // Notion CMS 데이터 병렬 페칭 (서버 렌더링 성능 최적화)
  const [products, stories, recipes] = await Promise.all([
    NotionCMS.getProducts(),
    NotionCMS.getStories(),
    NotionCMS.getRecipes(),
  ]);

  return (
    <HomeClient
      products={products}
      stories={stories}
      recipes={recipes}
    />
  );
}
