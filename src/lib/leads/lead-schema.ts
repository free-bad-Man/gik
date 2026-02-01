export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  company?: string; // Honeypot field
  agreement: boolean;
  // Calculator fields
  serviceType?: string;
  serviceParams?: string; // e.g., "10 соток" or "5 точек"
  estimatedPrice?: string;
}

export interface ValidationResult {
  success: boolean;
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

export function validateLead(data: Partial<ContactFormData>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Имя должно содержать минимум 2 символа";
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = "Введите корректный номер телефона";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Введите корректный email";
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = "Сообщение слишком короткое";
  }

  if (!data.agreement) {
    errors.agreement = "Необходимо согласие на обработку данных";
  }

  // Honeypot check is handled in anti-spam logic, but strictly speaking
  // valid data shouldn't have it filled. But we'll leave it out of
  // validation errors to not alert the bot.

  const hasErrors = Object.keys(errors).length > 0;

  return {
    success: !hasErrors,
    errors: hasErrors ? errors : undefined,
  };
}
