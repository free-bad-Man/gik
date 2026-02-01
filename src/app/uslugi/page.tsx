import { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { GlassCard } from "@/components/ui/glass-card";
import { constructMetadata } from "@/lib/seo/meta";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = constructMetadata({
  title: "Услуги | ООО НИИ «ГИК»",
  description: "Список услуг компании НИИ Геодезии и Картографии",
  canonicalUrl: "/uslugi",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: getBreadcrumbLabel("uslugi"), href: "/uslugi" },
  ];

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <Breadcrumbs items={breadcrumbs} />
      
      <h1 className="text-3xl font-bold mb-8 text-foreground">Услуги</h1>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link 
              key={service.slug} 
              href={`/uslugi/${service.slug}`}
              className="block h-full"
            >
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{service.description}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <GlassCard className="flex flex-col items-center justify-center py-20 text-center" hoverEffect={false}>
          <p className="text-lg text-muted-foreground">Раздел будет дополнен</p>
          <p className="text-sm text-muted-foreground/60 mt-2">Мы работаем над наполнением каталога услуг.</p>
        </GlassCard>
      )}
    </div>
  );
}
