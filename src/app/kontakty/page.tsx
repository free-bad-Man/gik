import { org } from "@/data/org";
import { Mail, Phone, MapPin, Building2, CreditCard, Map, MessageSquare } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactForm } from "./ContactForm";
import { TrackedTelLink, TrackedMailLink } from "@/components/TrackedLink";

export const metadata = {
  title: "Контакты | НИИ ГИК",
  description: "Контактная информация НИИ ГИК: адрес, телефон, email, реквизиты. Форма обратной связи.",
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
        Контакты
      </h1>

      <div className="space-y-8">
        {/* 0. Форма обратной связи */}
        <GlassCard>
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-primary/80">
              <MessageSquare className="w-6 h-6" />
              Напишите нам
            </h2>
            <p className="text-muted-foreground">
              Оставьте заявку, и мы свяжемся с вами в ближайшее время.
            </p>
            <ContactForm />
          </section>
        </GlassCard>

        {/* 1. Контакты */}
        <GlassCard>
          <div className="grid md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-primary/80">
                <Phone className="w-5 h-5" />
                Связь
              </h2>
              <div className="space-y-3">
                <TrackedTelLink 
                  phone={org.phone} 
                  className="block text-lg hover:text-primary transition-colors"
                />
                <TrackedMailLink 
                  email={org.email} 
                  className="block text-lg hover:text-primary transition-colors"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-primary/80">
                <MapPin className="w-5 h-5" />
                Адрес
              </h2>
              <address className="not-italic text-lg text-muted-foreground">
                <p>{org.address.postalCode}, {org.address.region}</p>
                <p>{org.address.city}</p>
                <p>{org.address.street}</p>
              </address>
            </section>
          </div>
        </GlassCard>

        {/* 2. Карта */}
        <GlassCard>
          <section className="space-y-4 min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <Map className="w-12 h-12 opacity-50 mb-4" />
            <p>Карта загружается...</p>
            {/* Здесь будет компонент Яндекс.Карт */}
          </section>
        </GlassCard>

        {/* 3. Реквизиты организации */}
        <GlassCard>
          <section className="space-y-6">
            <h2 className="text-2xl flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              <Building2 className="w-6 h-6 text-foreground" />
              Реквизиты организации
            </h2>
            <div className="grid gap-6 text-sm md:text-base">
              <div className="grid md:grid-cols-[1fr_2fr] gap-2 border-b border-white/5 pb-4">
                <span className="text-muted-foreground font-normal">Полное наименование</span>
                <span className="text-foreground font-normal">{org.fullName}</span>
              </div>
              <div className="grid md:grid-cols-[1fr_2fr] gap-2 border-b border-white/5 pb-4">
                <span className="text-muted-foreground font-normal">Сокращенное</span>
                <span className="text-foreground font-normal">{org.shortName}</span>
              </div>
              <div className="grid md:grid-cols-[1fr_2fr] gap-2 border-b border-white/5 pb-4">
                <span className="text-muted-foreground font-normal">Директор</span>
                <span className="text-foreground font-normal">{org.director}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
                <div>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1 font-normal">ИНН</span>
                  <span className="text-foreground font-normal">{org.inn}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1 font-normal">КПП</span>
                  <span className="text-foreground font-normal">{org.kpp}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1 font-normal">ОГРН</span>
                  <span className="text-foreground font-normal">{org.ogrn}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1 font-normal">Налогообложение</span>
                <span className="text-foreground font-normal">{org.tax}</span>
              </div>
            </div>
          </section>
        </GlassCard>

        {/* 4. Банковские реквизиты */}
        <GlassCard>
          <section className="space-y-6">
            <h2 className="text-2xl flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              <CreditCard className="w-6 h-6 text-foreground" />
              Банковские реквизиты
            </h2>
            <div className="bg-transparent p-6 rounded-xl space-y-4 text-sm md:text-base border border-white/10">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-muted-foreground font-normal" style={{ fontWeight: 400 }}>Банк</span>
                <span className="text-foreground text-right font-normal" style={{ fontWeight: 400 }}>{org.bank.name}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-muted-foreground font-normal" style={{ fontWeight: 400 }}>Расчетный счет</span>
                <span className="text-foreground font-normal" style={{ fontWeight: 400 }}>{org.bank.account}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-muted-foreground font-normal" style={{ fontWeight: 400 }}>БИК</span>
                <span className="text-foreground font-normal" style={{ fontWeight: 400 }}>{org.bank.bik}</span>
              </div>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <span className="text-muted-foreground font-normal" style={{ fontWeight: 400 }}>Корр. счет</span>
                <span className="text-foreground font-normal" style={{ fontWeight: 400 }}>{org.bank.corrAccount}</span>
              </div>
            </div>
          </section>
        </GlassCard>
      </div>
    </div>
  );
}
