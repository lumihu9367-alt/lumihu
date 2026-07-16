import { Resend } from "resend";

export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  title: string;
  content: string;
}

const resendApiKey = process.env.RESEND_API_KEY || "";
const adminEmail = process.env.ADMIN_RECEIVER_EMAIL || "your-gmail@gmail.com";

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Resend를 통한 문의 이메일 발송 함수
 * Resend -> Admin Gmail 주소로 발송되도록 기본 템플릿 설계
 */
export async function sendInquiryEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log("[Resend] sendInquiryEmail 호출됨:", payload);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e7e5e4; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="background-color: #1b4332; color: #ffffff; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: -0.5px;">Lumihu 고객 문의 접수</h2>
      </div>
      <div style="padding: 24px; color: #1c1917; background-color: #ffffff; line-height: 1.6;">
        <p style="margin-top: 0;"><strong>신선한 제철 식품 브랜드, Lumihu에 새로운 고객 문의가 도착했습니다.</strong></p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4; font-weight: bold; width: 100px;">작성자</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4;">${payload.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4; font-weight: bold;">이메일</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4;"><a href="mailto:${payload.email}" style="color: #40916c; text-decoration: none;">${payload.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4; font-weight: bold;">연락처</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4;">${payload.phone || "미입력"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4; font-weight: bold;">제목</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e7e5e4; font-weight: bold; color: #1b4332;">${payload.title}</td>
          </tr>
        </table>
        
        <div style="background-color: #f5f5f4; border-radius: 6px; padding: 16px; margin-top: 10px; font-size: 14px; white-space: pre-wrap;">
          ${payload.content}
        </div>
      </div>
      <div style="background-color: #f5f5f4; padding: 16px; text-align: center; font-size: 12px; color: #78716c; border-top: 1px solid #e7e5e4;">
        이 메일은 Lumihu 브랜드 홈페이지에서 자동으로 발송되었습니다.
      </div>
    </div>
  `;

  if (!resend) {
    console.warn("[Resend] API Key가 설정되지 않아 메일 전송이 시뮬레이션 모드로 처리됩니다.");
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, messageId: `mock-email-id-${Date.now()}` };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Lumihu 홈페이지 <onboarding@resend.dev>", // Resend 테스트 도메인 또는 실제 등록 도메인
      to: adminEmail,
      subject: `[Lumihu 문의] ${payload.title}`,
      html: htmlContent,
      replyTo: payload.email,
    });

    if (error) {
      console.error("[Resend] API 발송 에러:", error);
      throw error;
    }

    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error("[Resend] sendInquiryEmail 예외 발생:", error);
    return { success: false, error: error.message };
  }
}
