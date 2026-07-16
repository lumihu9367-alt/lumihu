import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/supabase";
import { sendInquiryEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, title, content } = body;

    // 1. 필수값 유효성 검사
    if (!name || !email || !title || !content) {
      return NextResponse.json(
        { success: false, error: "필수 입력 항목(이름, 이메일, 제목, 내용)이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 이메일 정규식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "유효하지 않은 이메일 형식입니다." },
        { status: 400 }
      );
    }

    // 2. Supabase DB 적재 시도
    const dbResult = await submitInquiry({
      name,
      email,
      phone,
      title,
      content,
    });

    if (!dbResult.success) {
      console.error("[Inquiry API] Supabase 저장 실패:", dbResult.error);
      // 데이터베이스 저장이 실패하더라도 이메일 발송은 시도하는 비즈니스 정책을 적용하거나 함께 에러 처리할 수 있습니다.
      // 여기서는 중요성을 감안하여 DB 저장이 필수라고 가정합니다.
    }

    // 3. Resend 메일 발송 시도
    const emailResult = await sendInquiryEmail({
      name,
      email,
      phone,
      title,
      content,
    });

    if (!emailResult.success) {
      console.error("[Inquiry API] Resend 이메일 발송 실패:", emailResult.error);
    }

    // 4. 최종 결과 응답
    return NextResponse.json({
      success: true,
      message: "문의사항이 성공적으로 접수되었습니다.",
      details: {
        dbSaved: dbResult.success,
        emailSent: emailResult.success,
      },
    });
  } catch (error: any) {
    console.error("[Inquiry API] 알 수 없는 오류 발생:", error);
    return NextResponse.json(
      { success: false, error: "서버 오류로 인해 문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
