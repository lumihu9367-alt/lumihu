import { createClient } from "@supabase/supabase-js";

// Supabase Types
export interface DatabaseInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  title: string;
  content: string;
  createdAt?: string;
}

export interface DatabaseMember {
  id?: string;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
  createdAt?: string;
}

export interface DatabaseEventSignup {
  id?: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase 클라이언트 초기화 (URL 및 키가 설정되지 않은 경우 null 반환하여 에러 방지)
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

/**
 * 1. 문의하기 데이터베이스에 전송
 */
export async function submitInquiry(inquiry: DatabaseInquiry): Promise<{ success: boolean; data?: any; error?: string }> {
  console.log("[Supabase] submitInquiry 호출됨:", inquiry);

  if (!supabase) {
    console.warn("[Supabase] 환경 변수가 설정되지 않아 로컬 모의 저장을 실행합니다.");
    // LocalStorage를 활용한 모의 저장 (테스트용)
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("lumihu_inquiries") || "[]";
      const list = JSON.parse(existing);
      list.push({ ...inquiry, id: `mock-inq-${Date.now()}`, createdAt: new Date().toISOString() });
      localStorage.setItem("lumihu_inquiries", JSON.stringify(list));
    }
    // 인위적인 네트워크 딜레이 생성
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, data: { ...inquiry, id: `mock-${Date.now()}` } };
  }

  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          title: inquiry.title,
          content: inquiry.content,
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error("[Supabase] submitInquiry 에러:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 2. 향후 회원 기능 지원을 위한 목업 함수
 */
export async function getMembers(): Promise<{ success: boolean; data?: DatabaseMember[]; error?: string }> {
  if (!supabase) {
    return {
      success: true,
      data: [
        { email: "admin@lumihu.com", fullName: "관리자", role: "ADMIN", createdAt: new Date().toISOString() },
        { email: "user@lumihu.com", fullName: "홍길동", role: "USER", createdAt: new Date().toISOString() },
      ],
    };
  }

  try {
    const { data, error } = await supabase.from("members").select("*");
    if (error) throw error;
    return { success: true, data: data as DatabaseMember[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * 3. 향후 이벤트 신청 기능 지원을 위한 목업 함수
 */
export async function signUpEvent(signup: DatabaseEventSignup): Promise<{ success: boolean; data?: any; error?: string }> {
  console.log("[Supabase] signUpEvent 호출됨:", signup);

  if (!supabase) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, data: { ...signup, id: `mock-ev-${Date.now()}` } };
  }

  try {
    const { data, error } = await supabase.from("event_signups").insert([signup]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
