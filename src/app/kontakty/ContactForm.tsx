"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, ActionState } from "./actions";

// Submit Button Component
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Отправка..." : "Отправить сообщение"}
    </button>
  );
}

const initialState: ActionState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction] = useActionState(submitLead, initialState);
  const [timestamp, setTimestamp] = useState<number | string>("");

  // Set timestamp on mount (Anti-spam)
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Handle Success (Metrika)
  useEffect(() => {
    if (state.success) {
      // Trigger Metrika goal
      if (typeof window !== "undefined" && (window as any).ym) {
        const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
        if (ymId) {
          (window as any).ym(parseInt(ymId), "reachGoal", "lead_submit_success");
        }
      }
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2">Спасибо!</h3>
        <p className="text-green-700">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 text-blue-600 hover:underline"
        >
          Отправить еще одно сообщение
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden Fields for Anti-Spam */}
      <input 
        type="text" 
        name="company" 
        className="hidden" 
        tabIndex={-1} 
        autoComplete="off" 
      />
      <input type="hidden" name="_created" value={timestamp} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            minLength={2}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              state.errors?.name ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Иван Иванов"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            minLength={10}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              state.errors?.phone ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="+7 (999) 000-00-00"
          />
          {state.errors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            state.errors?.email ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          placeholder="example@mail.ru"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={5}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            state.errors?.message ? "border-red-500 bg-red-50" : "border-gray-300"
          }`}
          placeholder="Опишите ваш вопрос..."
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-red-600">{state.errors.message}</p>
        )}
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreement"
            name="agreement"
            type="checkbox"
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreement" className="font-medium text-gray-700">
            Согласие на обработку персональных данных
          </label>
          <p className="text-gray-500">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/politika" className="text-blue-600 hover:underline">
              политикой конфиденциальности
            </a>
            .
          </p>
          {state.errors?.agreement && (
            <p className="mt-1 text-sm text-red-600">{state.errors.agreement}</p>
          )}
        </div>
      </div>

      {state.message && !state.success && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
