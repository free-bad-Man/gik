"use server";

import { validateLead, ContactFormData } from "@/lib/leads/lead-schema";
import { checkSpam } from "@/lib/leads/anti-spam";
import { sendToTelegram, sendToWebhook } from "@/lib/leads/delivery";

export type ActionState = {
  success: boolean;
  errors?: Partial<Record<keyof ContactFormData, string>>;
  message?: string;
};

export async function submitLead(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Extract data
  const rawData: Partial<ContactFormData> = {
    name: formData.get("name")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    agreement: formData.get("agreement") === "on",
    company: formData.get("company")?.toString(), // Honeypot
    serviceType: formData.get("serviceType")?.toString(),
    serviceParams: formData.get("serviceParams")?.toString(),
    estimatedPrice: formData.get("estimatedPrice")?.toString(),
  };

  // 2. Anti-spam Check
  const spamResult = await checkSpam(formData);
  if (spamResult.isSpam) {
    // We pretend it's a success to fool the bot, or we return generic error.
    // Instruction says "отклонить". Let's return error but maybe generic.
    // For debugging, we'll return the reason. For prod, maybe just "Error".
    console.log(`Spam blocked: ${spamResult.reason}`);
    return {
      success: false,
      message: "Ошибка отправки. Попробуйте позже.",
    };
  }

  // 3. Validation
  const validation = validateLead(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      message: "Пожалуйста, исправьте ошибки в форме.",
    };
  }

  // 4. Delivery
  const lead = rawData as ContactFormData;
  
  // Parallel delivery
  const [tgResult, webhookResult] = await Promise.all([
    sendToTelegram(lead),
    sendToWebhook(lead),
  ]);

  if (!tgResult && !webhookResult) {
    // Only fail if BOTH fail (or if only TG is configured and it fails)
    // Actually, if TG is not configured, sendToTelegram returns false (with warning).
    // Let's assume if env vars are missing, we log it but maybe don't fail user experience if it's dev.
    // But for production, we want to know.
    // For now, if TG fails, we report error?
    // "Lead логируется/уходит в Telegram". If it fails to send, we should probably log to console and tell user error?
    // Or tell user "Success" but log error? Better to tell user error if critical.
    if (process.env.LEADS_TELEGRAM_BOT_TOKEN) {
       return {
         success: false,
         message: "Ошибка отправки заявки. Свяжитесь с нами по телефону.",
       };
    }
  }

  return {
    success: true,
    message: "Спасибо! Ваша заявка успешно отправлена.",
  };
}
