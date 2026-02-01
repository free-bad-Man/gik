"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Briefcase, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { materials } from "@/data/materials";
import { Button } from "@/components/ui/button";

interface SearchResult {
  title: string;
  href: string;
  type: "service" | "project" | "material";
  description: string;
}

export function SearchModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  const allItems: SearchResult[] = React.useMemo(() => {
    const items: SearchResult[] = [];
    
    services.forEach(s => items.push({
      title: s.title,
      href: `/uslugi/${s.slug}`,
      type: "service",
      description: s.description
    }));

    projects.forEach(p => items.push({
      title: p.title,
      href: `/proekty/${p.slug}`,
      type: "project",
      description: p.description
    }));

    materials.forEach(m => items.push({
      title: m.title,
      href: `/materialy/${m.slug}`,
      type: "material",
      description: m.description
    }));

    return items;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return allItems.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 results
  }, [query, allItems]);

  const handleSelect = (href: string) => {
    router.push(href);
    onOpenChange(false);
    setQuery("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center sm:items-center pt-[20vh] sm:pt-0">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="relative z-50 w-full max-w-lg mx-4 overflow-hidden rounded-xl border bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Поиск по сайту..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 h-6 w-6 rounded-full" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {query && (
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                Ничего не найдено.
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    className="flex items-start gap-3 rounded-md p-3 text-left text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="mt-0.5">
                      {item.type === "service" && <Ruler className="h-4 w-4 text-blue-500" />}
                      {item.type === "project" && <Briefcase className="h-4 w-4 text-green-500" />}
                      {item.type === "material" && <FileText className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {!query && (
          <div className="p-4 text-xs text-muted-foreground text-center">
            Введите запрос для поиска услуг, проектов или материалов.
          </div>
        )}
      </div>
    </div>
  );
}
