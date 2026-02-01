import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-foreground transition-colors flex items-center">
        <Home className="h-4 w-4" />
        <span className="sr-only">Главная</span>
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 opacity-50" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
