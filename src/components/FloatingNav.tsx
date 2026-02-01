"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(true);

  // Hide on home page if desired, but user said "any page".
  // Let's assume on Home page "Home" button is redundant, but "Close" might be weird.
  // User said "upon opening ANY page".
  // Maybe on home page we don't need them? "Close" usually implies leaving a page.
  // If I am on Home, "Close" might mean nothing.
  // I'll show them always for now as requested.

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full h-12 w-12 shadow-lg bg-background/80 backdrop-blur-sm border hover:bg-background"
        onClick={() => router.push("/")}
        title="На главную"
      >
        <Home className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full h-12 w-12 shadow-lg bg-background/80 backdrop-blur-sm border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
        onClick={() => router.back()}
        title="Закрыть (Назад)"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
