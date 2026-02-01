import { Metadata } from "next";
import { GlassCard } from "@/components/ui/glass-card";
import { org } from "@/data/org";
import { Building2, FileText, MapPin, Phone, Mail, User, Landmark } from "lucide-react";
import { TrackedTelLink, TrackedMailLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "О компании | ООО НИИ «ГИК»",
  description: "Информация о компании НИИ Геодезии и Картографии, реквизиты, руководство.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-32 min-h-screen space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          О компании
        </h1>
        <p className="text-lg text-muted-foreground">
          {org.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Info */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Общая информация</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Генеральный директор</p>
                <p className="font-medium">{org.director}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Юридический адрес</p>
                <p className="font-medium">{org.address.full}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Телефон</p>
                <TrackedTelLink phone={org.phone} className="font-medium hover:text-primary transition-colors" />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <TrackedMailLink email={org.email} className="font-medium hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Requisites */}
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <FileText className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Реквизиты</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">ИНН</p>
              <p className="font-mono font-medium">{org.inn}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">КПП</p>
              <p className="font-mono font-medium">{org.kpp}</p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">ОГРН</p>
              <p className="font-mono font-medium">{org.ogrn}</p>
            </div>
            <div className="col-span-2 p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">Налогообложение</p>
              <p className="font-medium text-sm">{org.tax}</p>
            </div>
          </div>
        </GlassCard>

        {/* Bank Details */}
        <GlassCard className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b">
            <Landmark className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Банковские реквизиты</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Банк</p>
              <p className="font-medium">{org.bank.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">БИК</p>
              <p className="font-mono font-medium">{org.bank.bik}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Расчетный счет</p>
              <p className="font-mono font-medium">{org.bank.account}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Корреспондентский счет</p>
              <p className="font-mono font-medium">{org.bank.corrAccount}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
