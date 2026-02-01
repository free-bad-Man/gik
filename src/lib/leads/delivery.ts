import { ContactFormData } from "./lead-schema";

const TG_BOT_TOKEN = process.env.LEADS_TELEGRAM_BOT_TOKEN;
const TG_CHAT_ID = process.env.LEADS_TELEGRAM_CHAT_ID;
const WEBHOOK_URL = process.env.LEADS_TO_EMAIL; // Reusing this var as per instruction logic or just for webhook

export async function sendToTelegram(lead: ContactFormData) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    console.warn("Telegram credentials not set. Lead not sent to Telegram.");
    return false;
  }

  const text = `
📩 **Новая заявка с сайта**${lead.serviceType ? `\n\n🧮 **Калькулятор:**\n— Услуга: ${lead.serviceType}\n— Параметры: ${lead.serviceParams || "—"}\n— Расчет: ${lead.estimatedPrice || "—"}` : ""}

👤 **Имя:** ${lead.name}
📞 **Телефон:** ${lead.phone}
📧 **Email:** ${lead.email}
📝 **Сообщение:**
${lead.message}

✅ Согласие получено
  `.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Telegram API Error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Failed to send to Telegram:", err);
    return false;
  }
}

export async function sendToWebhook(lead: ContactFormData) {
  if (!WEBHOOK_URL) {
    return null; // Not configured
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    return res.ok;
  } catch (err) {
    console.error("Failed to send to Webhook:", err);
    return false;
  }
}
