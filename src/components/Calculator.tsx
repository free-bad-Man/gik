"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, ActionState } from "@/app/kontakty/actions";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Check, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Service Types
const SERVICES = [
  { id: "mezevanie", name: "Межевание земельного участка", unit: "соток" },
  { id: "vynos", name: "Вынос границ (точек)", unit: "точек" },
  { id: "topo", name: "Топографическая съемка", unit: "соток" },
];

const initialState: ActionState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Отправка..." : "Отправить заявку"}
    </Button>
  );
}

export function Calculator() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(SERVICES[0]);
  const [paramValue, setParamValue] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  // Form Action State
  const [state, formAction] = useActionState(submitLead, initialState);
  const [timestamp, setTimestamp] = useState<number | string>("");

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  // Calculate Price Effect
  useEffect(() => {
    const val = parseFloat(paramValue);
    if (isNaN(val) || val < 0) {
      setPrice(null);
      return;
    }

    let calculated = 0;
    switch (service.id) {
      case "mezevanie":
        // Example: 15000 base. If > 10 sot, +1000 per sot.
        calculated = 15000 + (val > 10 ? (val - 10) * 1000 : 0);
        break;
      case "vynos":
        // 1000 per point, min 4000
        calculated = Math.max(4000, val * 1000);
        break;
      case "topo":
        // 10000 base + 1500 per sot
        calculated = 10000 + (val * 1500);
        break;
    }
    setPrice(calculated);
  }, [service, paramValue]);

  // Handle Success
  if (state.success) {
    return (
      <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold">Заявка принята!</h3>
        <p className="text-muted-foreground">
          Мы получили ваш расчет. Наш специалист свяжется с вами в ближайшее время для уточнения деталей.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Рассчитать еще
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8 px-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step >= s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {s}
            </div>
            {s < 3 && <div className="w-12 h-[1px] bg-muted" />}
          </div>
        ))}
      </div>

      <div className="bg-background/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-bold">Выберите услугу</h2>
            <div className="grid gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setService(s);
                    setStep(2);
                    setParamValue(""); // Reset param when changing service
                  }}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-all hover:border-primary hover:bg-primary/5 flex items-center justify-between group",
                    service.id === s.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                  )}
                >
                  <span className="font-medium">{s.name}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="-ml-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold">Параметры</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {service.name} — укажите объем ({service.unit})
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={paramValue}
                  onChange={(e) => setParamValue(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={`Например: ${service.id === "vynos" ? "4" : "10"}`}
                  autoFocus
                />
              </div>

              {price !== null && (
                <div className="p-4 bg-muted/50 rounded-xl space-y-1">
                  <p className="text-sm text-muted-foreground">Предварительная стоимость:</p>
                  <p className="text-3xl font-bold text-primary">
                    {new Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                      maximumFractionDigits: 0,
                    }).format(price)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Стоимость является ориентировочной и может меняться в зависимости от удаленности объекта и сложности рельефа.
                  </p>
                </div>
              )}

              <Button
                className="w-full h-12 text-lg mt-4"
                disabled={!paramValue || parseFloat(paramValue) <= 0}
                onClick={() => setStep(3)}
              >
                Продолжить
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" onClick={() => setStep(2)} className="-ml-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold">Оформление заявки</h2>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl mb-6 border border-primary/10">
              <div className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-muted-foreground">
                    Объем: {paramValue} {service.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {price && new Intl.NumberFormat("ru-RU", {
                      style: "currency",
                      currency: "RUB",
                      maximumFractionDigits: 0,
                    }).format(price)}
                  </p>
                </div>
              </div>
            </div>

            <form action={formAction} className="space-y-4">
              {/* Hidden Fields for Calculator Data */}
              <input type="hidden" name="serviceType" value={service.name} />
              <input type="hidden" name="serviceParams" value={`${paramValue} ${service.unit}`} />
              <input 
                type="hidden" 
                name="estimatedPrice" 
                value={price ? `${price} руб.` : "Не рассчитано"} 
              />
              
              {/* Anti-spam */}
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_created" value={timestamp} />

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                <input
                  id="name"
                  name="name"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Иван"
                />
                {state.errors?.name && <p className="text-xs text-red-500">{state.errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="+7 (___) ___-__-__"
                />
                {state.errors?.phone && <p className="text-xs text-red-500">{state.errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (необязательно)</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="ivan@example.com"
                />
                 {state.errors?.email && <p className="text-xs text-red-500">{state.errors.email}</p>}
              </div>

              {/* Message field (hidden or prefilled, user can add comments) */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Комментарий (необязательно)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Адрес объекта, кадастровый номер или другие детали..."
                  defaultValue={`Расчет стоимости: ${service.name}`}
                />
                 {state.errors?.message && <p className="text-xs text-red-500">{state.errors.message}</p>}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  required
                  className="mt-1"
                />
                <label htmlFor="agreement" className="text-xs text-muted-foreground font-normal">
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <a href="/politika" className="underline hover:text-foreground">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
              {state.errors?.agreement && <p className="text-xs text-red-500">{state.errors.agreement}</p>}

              {state.message && !state.success && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {state.message}
                </div>
              )}

              <SubmitButton />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
