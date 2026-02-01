import { Metadata } from "next";
import Link from "next/link";
import { Book, FileText, Newspaper } from "lucide-react";
import { materials } from "@/data/materials";
import { GlassCard } from "@/components/ui/glass-card";
import { constructMetadata } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = constructMetadata({
  title: "Материалы | ООО НИИ «ГИК»",
  description: "Полезные материалы, статьи и новости",
  canonicalUrl: "/materialy",
});

export default function MaterialsPage() {
  const breadcrumbs = [
    { label: getBreadcrumbLabel("materialy"), href: "/materialy" },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <Book className="w-5 h-5" />;
      case 'news': return <Newspaper className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <Breadcrumbs items={breadcrumbs} />
      
      <h1 className="text-3xl font-bold mb-8 text-foreground">Материалы</h1>

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <Link 
              key={material.slug} 
              href={`/materialy/${material.slug}`}
              className="block h-full"
            >
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  {getIcon(material.type)}
                  <span className="text-xs font-medium uppercase tracking-wider opacity-80">{material.type}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{material.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{material.description}</p>
                {material.date && (
                  <p className="text-xs text-muted-foreground/60 mt-4">{material.date}</p>
                )}
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <GlassCard className="flex flex-col items-center justify-center py-20 text-center" hoverEffect={false}>
          <p className="text-lg text-muted-foreground">Раздел будет дополнен</p>
          <p className="text-sm text-muted-foreground/60 mt-2">Мы готовим полезные материалы для вас.</p>
        </GlassCard>
      )}
    </div>
  );
}
