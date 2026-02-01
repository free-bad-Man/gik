import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <GlassCard className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Страница не найдена</h2>
          <p className="text-muted-foreground">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>
        <Button asChild className="w-full">
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </GlassCard>
    </div>
  );
}
