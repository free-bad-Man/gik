import { org } from "@/data/org";
import { Mail, Phone, MapPin } from "lucide-react";
import { TrackedTelLink, TrackedMailLink } from "@/components/TrackedLink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-fit max-w-[98vw] bg-transparent backdrop-blur-none z-50 rounded-t-3xl border-t border-white/10 shadow-lg px-24 mb-0">
      <div className="flex flex-col items-center justify-center gap-2 py-4">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <TrackedTelLink 
            phone={org.phone} 
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{org.phone}</span>
          </TrackedTelLink>
          <TrackedMailLink 
            email={org.email} 
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </TrackedMailLink>
        </div>

        <div className="text-xs text-muted-foreground/80 text-center">
          <address className="not-italic">{org.address.full}</address>
        </div>
        
        <div className="text-[10px] text-muted-foreground/60">
          <p>{org.shortName} © {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
