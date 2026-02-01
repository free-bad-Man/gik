import { Metadata } from "next";

import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "B2B и Госзаказ | ООО НИИ «ГИК»",
  description: "Информация для корпоративных клиентов и государственных заказчиков",
};

export default function B2BPage() {
  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <GlassCard hoverEffect={false}>
        <h1 className="text-3xl font-bold mb-6 text-foreground">B2B и Госзаказ</h1>
        <p className="text-muted-foreground">
          Страница находится в разработке.
        </p>
      </GlassCard>
    </div>
  );
}
