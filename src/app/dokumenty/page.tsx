import { Metadata } from "next";
import { GlassCard } from "@/components/ui/glass-card";
import { materials } from "@/data/materials";
import { FileText, Download, ShieldCheck } from "lucide-react";
import { TrackedDownloadLink } from "@/components/TrackedLink";

export const metadata: Metadata = {
  title: "Документы | ООО НИИ «ГИК»",
  description: "Нормативные документы, лицензии и свидетельства.",
};

export default function DocumentsPage() {
  const documents = materials.filter(m => m.type === 'document');

  const foundingDocs = [
    { title: "Устав ООО НИИ «ГИК»", size: "2.4 MB" },
    { title: "Свидетельство ОГРН", size: "1.1 MB" },
    { title: "Свидетельство ИНН", size: "0.8 MB" },
    { title: "Выписка из ЕГРЮЛ", size: "1.5 MB" },
  ];

  return (
    <div className="container mx-auto px-4 py-32 min-h-screen space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          Документы
        </h1>
        <p className="text-lg text-muted-foreground">
          Официальная документация и лицензии компании
        </p>
      </div>

      {/* Licenses Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Лицензии и допуски</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <GlassCard key={doc.slug} className="flex flex-col justify-between group hover:border-primary/50 transition-colors">
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 w-fit rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {doc.description}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{doc.date}</span>
                <TrackedDownloadLink 
                  href="#" 
                  className="text-sm font-medium flex items-center gap-2 text-primary hover:underline"
                >
                  <Download className="w-4 h-4" />
                  Скачать
                </TrackedDownloadLink>
              </div>
            </GlassCard>
          ))}
          
          {documents.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              В данный момент раздел лицензий обновляется.
            </div>
          )}
        </div>
      </section>

      {/* Founding Docs Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Учредительные документы</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foundingDocs.map((doc, i) => (
            <GlassCard key={i} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-md">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.size}</p>
                </div>
              </div>
              <TrackedDownloadLink 
                href="#"
                className="p-2 hover:bg-background rounded-full transition-colors"
              >
                <Download className="w-4 h-4 text-muted-foreground" />
              </TrackedDownloadLink>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
