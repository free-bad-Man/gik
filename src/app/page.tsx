import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Calculator, FileText, MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 relative z-0 w-full min-h-full pt-32 md:pt-40">
      
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-8 mb-20">
        <GlassCard noDefaultBg className="flex flex-col items-center justify-center text-center p-8 space-y-4 group cursor-pointer bg-transparent backdrop-blur-none hover:bg-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-white/10 hover:border-gray-500/50">
          <h3 className="text-2xl font-semibold text-gray-200">Заказать расчет</h3>
          <p className="text-sm text-muted-foreground">
            Получите предварительный расчет стоимости работ для вашего объекта
          </p>
          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
             <Link href="/calculator" className="text-gray-400 flex items-center gap-2 text-sm font-medium hover:text-gray-200">
                Перейти <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </GlassCard>

        <GlassCard noDefaultBg className="flex flex-col items-center justify-center text-center p-8 space-y-4 group cursor-pointer bg-transparent backdrop-blur-none hover:bg-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-white/10 hover:border-gray-500/50">
          <h3 className="text-2xl font-semibold text-gray-200">Получить предложение</h3>
          <p className="text-sm text-muted-foreground">
            Индивидуальное коммерческое предложение с учетом специфики
          </p>
          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
             <Link href="/kontakty" className="text-gray-400 flex items-center gap-2 text-sm font-medium hover:text-gray-200">
                Отправить запрос <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </GlassCard>

        <GlassCard noDefaultBg className="flex flex-col items-center justify-center text-center p-8 space-y-4 group cursor-pointer bg-transparent backdrop-blur-none hover:bg-white/5 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-white/10 hover:border-gray-500/50">
          <h3 className="text-2xl font-semibold text-gray-200">Заказать консультацию</h3>
          <p className="text-sm text-muted-foreground">
            Бесплатная консультация эксперта по вашим вопросам
          </p>
          <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
             <Link href="/kontakty" className="text-gray-400 flex items-center gap-2 text-sm font-medium hover:text-gray-200">
                Связаться <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        </GlassCard>
      </div>

      <div className="z-10 text-center space-y-8 max-w-full px-4 mb-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-emerald-500/60 via-emerald-300/60 to-emerald-100/60 bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap pb-4">
          НИИ Геодезии и Картографии
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-light bg-gradient-to-r from-emerald-500/60 to-emerald-300/60 bg-clip-text text-transparent mt-8">
          Профессиональные решения в области инженерных изысканий, землеустройства и кадастра.
        </p>
      </div>
    </div>
  );
}
