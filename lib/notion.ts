// Notion CMS Integration
// 이 파일은 향후 Notion 데이터베이스와 연동할 수 있도록 설계된 인터페이스 및 헬퍼 함수입니다.
// 실제 연동 시에는 `@notionhq/client` 패키지를 설치하거나 Notion API와 직접 통신할 수 있습니다.

export interface NotionNotice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface NotionRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  prepTime: string;
  difficulty: "쉬움" | "보통" | "어려움";
}

export interface NotionStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  producerName: string;
  location: string;
  imageUrl: string;
  date: string;
}

export interface NotionProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  isSeasonal: boolean;
  seasonMonths: number[];
  stockStatus: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  tags: string[];
}

// Mock Data for immediate rendering
const MOCK_NOTICES: NotionNotice[] = [
  {
    id: "notice-1",
    title: "Lumihu 그랜드 오픈 및 오픈 기념 10% 할인 쿠폰 증정 이벤트",
    content: "신선한 제철 식품으로 일상에 행복을 전하는 Lumihu가 오픈했습니다. 가입 시 10% 즉시 할인 쿠폰을 드립니다.",
    date: "2026-07-16",
    category: "이벤트",
  },
  {
    id: "notice-2",
    title: "7월 폭우로 인한 제주 산지 배송 지연 안내",
    content: "제주 산지 기상 악화로 인해 일부 상품의 배송이 1~2일 지연될 수 있습니다. 신선도 유지에 만전을 기하겠습니다.",
    date: "2026-07-12",
    category: "공지",
  },
];

const MOCK_RECIPES: NotionRecipe[] = [
  {
    id: "recipe-1",
    title: "여름 무화과 리코타 샐러드",
    description: "새콤달콤한 제철 무화과와 고소한 리코타 치즈의 조화, 발사믹 드레싱으로 완성하는 10분 초간단 샐러드.",
    ingredients: ["제철 무화과 3개", "와일드 루꼴라 50g", "리코타 치즈 3큰술", "발사믹 글레이즈", "엑스트라 버진 올리브유"],
    instructions: [
      "무화과는 흐르는 물에 가볍게 씻어 물기를 제거한 뒤 4등분합니다.",
      "루꼴라는 찬물에 씻어 물기를 빼고 접시에 넓게 깝니다.",
      "루꼴라 위에 무화과와 리코타 치즈를 숟가락으로 떼어 올립니다.",
      "올리브유와 발사믹 글레이즈를 골고루 뿌려 완성합니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    prepTime: "10분",
    difficulty: "쉬움",
  },
  {
    id: "recipe-2",
    title: "성주 꿀참외 가스파초",
    description: "참외의 달콤함과 오이의 청량함을 담은 시원한 여름철 스페인식 냉스프.",
    ingredients: ["꿀참외 1개", "오이 1/2개", "올리브 오일 2큰술", "레몬즙 1큰술", "소금 한 꼬집"],
    instructions: [
      "참외는 껍질과 씨를 제거하고 큼직하게 썹니다.",
      "오이도 껍질을 벗겨 듬성듬성 썹니다.",
      "믹서기에 참외, 오이, 레몬즙, 올리브 오일, 소금을 넣고 부드럽게 갑니다.",
      "냉장고에 1시간 이상 차갑게 보관한 뒤 잔에 담아 냅니다."
    ],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    prepTime: "15분",
    difficulty: "쉬움",
  },
];

const MOCK_STORIES: NotionStory[] = [
  {
    id: "story-1",
    title: "3대째 이어온 해남 밤고구마 농장의 흙과 땀 이야기",
    excerpt: "기계 대신 손으로 직접 일구며, 땅의 본래 힘을 믿고 농사짓는 김성호 농부의 철학을 소개합니다.",
    content: "해남의 황토밭에서 자란 고구마는 밤처럼 달고 고소합니다. 화학비료를 최소화하고, 자연 퇴비와 미생물 공법으로 흙을 살리는 데 집중했습니다...",
    producerName: "김성호 농부",
    location: "전라남도 해남군",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-05",
  },
  {
    id: "story-2",
    title: "청정 봉화 해발 500m에서 자란 고당도 사과",
    excerpt: "큰 일교차와 맑은 바람이 만들어낸, 아삭하고 과즙이 꽉 찬 프리미엄 부사 사과 수확기.",
    content: "해발 500m 고지대는 낮에는 따뜻한 햇살을 받고 밤에는 서늘하여 과육이 매우 단단하고 당도가 올라갑니다. 벌들이 자연 수정하여 건강하게 길렀습니다...",
    producerName: "이민선 농부",
    location: "경상북도 봉화군",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-10",
  },
];

const MOCK_PRODUCTS: NotionProduct[] = [
  {
    id: "prod-1",
    name: "해남 유기농 꿀 밤고구마 3kg",
    description: "황토밭에서 건강하게 자라 포슬포슬하고 달콤한 프리미엄 밤고구마입니다.",
    price: 18900,
    originalPrice: 22000,
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    isSeasonal: true,
    seasonMonths: [7, 8, 9, 10],
    stockStatus: "IN_STOCK",
    tags: ["친환경", "당도보장", "인기"],
  },
  {
    id: "prod-2",
    name: "청송 당도선별 세척사과 2.5kg",
    description: "왁스 코팅 없이 깨끗하게 세척하여 껍질째 먹을 수 있는 아삭한 사과입니다.",
    price: 24500,
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    isSeasonal: false,
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    stockStatus: "LOW_STOCK",
    tags: ["세척사과", "매일아침", "실속형"],
  },
  {
    id: "prod-3",
    name: "제주 산지직송 당도 12Brix 타이벡 조생감귤 5kg",
    description: "타이벡 농법으로 재배하여 고당도를 자랑하며, 얇은 껍질과 풍부한 과즙이 일품입니다.",
    price: 27900,
    originalPrice: 32000,
    imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=80",
    isSeasonal: true,
    seasonMonths: [11, 12, 1, 2],
    stockStatus: "IN_STOCK",
    tags: ["제주직송", "고당도", "한정수량"],
  },
  {
    id: "prod-4",
    name: "담양 설향 유기농 딸기 500g",
    description: "친환경 고설재배로 깨끗하게 키워 향이 깊고 과육이 부드러운 담양 명품 딸기.",
    price: 15500,
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    isSeasonal: true,
    seasonMonths: [12, 1, 2, 3, 4],
    stockStatus: "OUT_OF_STOCK",
    tags: ["유기농", "신선보장", "품절임박"],
  },
];

// Notion API Client Placeholder
export class NotionCMS {
  private static apiKey = process.env.NOTION_API_KEY || "";
  private static databaseIds = {
    notices: process.env.NOTION_DB_NOTICES || "",
    recipes: process.env.NOTION_DB_RECIPES || "",
    stories: process.env.NOTION_DB_STORIES || "",
    products: process.env.NOTION_DB_PRODUCTS || "",
  };

  private static isConfigured(): boolean {
    return !!this.apiKey && Object.values(this.databaseIds).every(id => !!id);
  }

  // Notices
  static async getNotices(): Promise<NotionNotice[]> {
    if (!this.isConfigured()) {
      return MOCK_NOTICES;
    }
    try {
      // Notion API fetch 로직 구현부
      // const res = await fetch(`https://api.notion.com/v1/databases/${this.databaseIds.notices}/query`, { ... });
      // return parseNotionNotices(await res.json());
      return MOCK_NOTICES;
    } catch (e) {
      console.error("Notion CMS getNotices Error, falling back to mock:", e);
      return MOCK_NOTICES;
    }
  }

  // Recipes
  static async getRecipes(): Promise<NotionRecipe[]> {
    if (!this.isConfigured()) {
      return MOCK_RECIPES;
    }
    try {
      return MOCK_RECIPES;
    } catch (e) {
      console.error("Notion CMS getRecipes Error:", e);
      return MOCK_RECIPES;
    }
  }

  // Stories
  static async getStories(): Promise<NotionStory[]> {
    if (!this.isConfigured()) {
      return MOCK_STORIES;
    }
    try {
      return MOCK_STORIES;
    } catch (e) {
      console.error("Notion CMS getStories Error:", e);
      return MOCK_STORIES;
    }
  }

  // Products
  static async getProducts(): Promise<NotionProduct[]> {
    if (!this.isConfigured()) {
      return MOCK_PRODUCTS;
    }
    try {
      return MOCK_PRODUCTS;
    } catch (e) {
      console.error("Notion CMS getProducts Error:", e);
      return MOCK_PRODUCTS;
    }
  }
}
