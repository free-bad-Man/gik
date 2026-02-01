import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noDefaultBg?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, noDefaultBg = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        !noDefaultBg && "bg-white/10 dark:bg-black/10",
        "backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8",
        hoverEffect && "hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
