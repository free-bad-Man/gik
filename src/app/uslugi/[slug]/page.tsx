import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { materials } from "@/data/materials";
import { ChevronRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { GlassCard } from "@/components/ui/glass-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return constructMetadata({
      title: "Услуга не найдена",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${service.title} | Услуги`,
    description: service.description,
    canonicalUrl: `/uslugi/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { label: getBreadcrumbLabel("uslugi"), href: "/uslugi" },
    { label: service.title, href: `/uslugi/${service.slug}` },
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

      <article className="max-w-4xl mx-auto bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{service.title}</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="lead text-xl mb-8">{service.description}</p>
          {service.content && (
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          )}
        </div>
      </article>

      {/* Related Projects */}
      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Связанные проекты</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects
              .filter(p => service.relatedProjects?.includes(p.slug))
              .map(project => (
                <Link 
                  key={project.slug}
                  href={`/proekty/${project.slug}`}
                  className="group block p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                    {project.title}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Related Materials */}
      {service.relatedMaterials && service.relatedMaterials.length > 0 && (
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Полезные материалы</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {materials
              .filter(m => service.relatedMaterials?.includes(m.slug))
              .map(material => (
                <Link 
                  key={material.slug}
                  href={`/materialy/${material.slug}`}
                  className="group block p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                    {material.title}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
