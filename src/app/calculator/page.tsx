import { Metadata } from "next";
import { GlassCard } from "@/components/ui/glass-card";
import { Calculator } from "@/components/Calculator";

export const metadata: Metadata = {
  title: "Калькулятор стоимости | НИИ ГИК",
  description: "Рассчитайте предварительную стоимость кадастровых и геодезических работ онлайн.",
};

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
            Калькулятор стоимости
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Рассчитайте примерную стоимость работ и оставьте заявку. Точную смету составит инженер после анализа документов.
          </p>
        </div>

        <Calculator />
      </div>
    </div>
  );
}
