import { Metadata } from "next";
import { notFound } from "next/navigation";
import { materials } from "@/data/materials";
import { constructMetadata } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import JsonLd from "@/components/JsonLd";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return materials.map((material) => ({
    slug: material.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const material = materials.find((m) => m.slug === params.slug);

  if (!material) {
    return constructMetadata({
      title: "Материал не найден",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${material.title} | Материалы`,
    description: material.description,
    canonicalUrl: `/materialy/${material.slug}`,
  });
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params;
  const material = materials.find((m) => m.slug === slug);

  if (!material) {
    notFound();
  }

  const breadcrumbs = [
    { label: getBreadcrumbLabel("materialy"), href: "/materialy" },
    { label: material.title, href: `/materialy/${material.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `https://nii-gik.ru${item.href}`,
          })),
        }} 
      />
      
      <Breadcrumbs items={breadcrumbs} />

      <GlassCard className="max-w-4xl mx-auto" hoverEffect={false}>
        <div className="flex items-center gap-3 mb-6 text-primary">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80 px-2 py-1 bg-primary/10 rounded">{material.type}</span>
          {material.date && <span className="text-xs text-muted-foreground">{material.date}</span>}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{material.title}</h1>
        
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="lead text-xl mb-8">{material.description}</p>
          {material.content && (
            <div dangerouslySetInnerHTML={{ __html: material.content }} />
          )}
        </div>
      </GlassCard>
    </div>
  );
}
