import { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { GlassCard } from "@/components/ui/glass-card";
import { constructMetadata } from "@/lib/seo/meta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getBreadcrumbLabel } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = constructMetadata({
  title: "Проекты | ООО НИИ «ГИК»",
  description: "Реализованные проекты НИИ Геодезии и Картографии",
  canonicalUrl: "/proekty",
});

export default function ProjectsPage() {
  const breadcrumbs = [
    { label: getBreadcrumbLabel("proekty"), href: "/proekty" },
  ];

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen">
      <Breadcrumbs items={breadcrumbs} />
      
      <h1 className="text-3xl font-bold mb-8 text-foreground">Проекты</h1>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link 
              key={project.slug} 
              href={`/proekty/${project.slug}`}
              className="block h-full"
            >
              <GlassCard className="h-full">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                {project.date && (
                  <p className="text-xs text-muted-foreground/60 mt-4">{project.date}</p>
                )}
              </GlassCard>
            </Link>
          ))}
        </div>
      ) : (
        <GlassCard className="flex flex-col items-center justify-center py-20 text-center" hoverEffect={false}>
          <p className="text-lg text-muted-foreground">Раздел будет дополнен</p>
          <p className="text-sm text-muted-foreground/60 mt-2">Мы работаем над описанием наших проектов.</p>
        </GlassCard>
      )}
    </div>
  );
}
