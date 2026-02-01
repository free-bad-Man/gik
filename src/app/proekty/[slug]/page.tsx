import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { constructMetadata } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import JsonLd from "@/components/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return constructMetadata({
      title: "Проект не найден",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${project.title} | Проекты`,
    description: project.description,
    canonicalUrl: `/proekty/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const breadcrumbs = [
    { label: getBreadcrumbLabel("proekty"), href: "/proekty" },
    { label: project.title, href: `/proekty/${project.slug}` },
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{project.title}</h1>
        {project.date && (
          <p className="text-sm text-muted-foreground/80 mb-6">{project.date}</p>
        )}
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="lead text-xl mb-8">{project.description}</p>
          {project.content && (
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          )}
        </div>
      </GlassCard>
    </div>
  );
}
