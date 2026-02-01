"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Box,
  Globe,
  LayoutGrid,
  PenTool,
  Shield,
  Smile,
  BookText,
  BriefcaseBusiness,
  Code,
  Component,
  Network,
  Sparkles,
  ScreenShare,
  AppWindow,
  Layers,
  Monitor,
  Moon,
  Sun,
  LogOut,
  Map,
  Compass,
  LandPlot,
  Ruler,
  FileText,
  Users,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import { SearchModal } from "@/components/SearchModal";
import { Search } from "lucide-react";

const services: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Геодезия",
    href: "#",
    icon: <Compass className="w-4 h-4" />,
    description: "Топографические съемки и инженерные изыскания",
  },
  {
    title: "Картография",
    href: "#",
    icon: <Map className="w-4 h-4" />,
    description: "Создание и обновление карт и планов",
  },
  {
    title: "Кадастр",
    href: "#",
    icon: <LandPlot className="w-4 h-4" />,
    description: "Постановка на кадастровый учет",
  },
];

const core: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Инженерные изыскания",
    href: "#",
    icon: <Ruler className="w-4 h-4" />,
    description: "Геологические и экологические изыскания",
  },
  {
    title: "Землеустройство",
    href: "#",
    icon: <Globe className="w-4 h-4" />,
    description: "Межевание и планировка территорий",
  },
];

const company: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "О компании",
    href: "/o-kompanii",
    icon: <Smile className="w-4 h-4" />,
    description: "История и миссия НИИ ГИК",
  },
];

const materials: {
  title: string;
  icon: ReactElement;
  href: string;
  description: string;
}[] = [
  {
    title: "Полезные материалы",
    href: "/materialy",
    icon: <FileText className="w-4 h-4" />,
    description: "Полезные ресурсы и статьи",
  },
  {
    title: "Документы",
    href: "/dokumenty",
    icon: <BookText className="w-4 h-4" />,
    description: "Лицензии и нормативные акты",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`flex sticky px-4 py-4 z-50 top-0 w-full items-center h-auto min-h-[4rem] justify-between transition-all duration-300 ${
        scrolled 
          ? "border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60" 
          : "border-b-0 bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full relative">
        <div className="absolute top-2 left-0 flex items-center justify-start shrink-0 z-50">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image
              src="/logo.png"
              alt="НИИ ГИК"
              width={540}
              height={150}
              className="h-36 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        <div className="w-1 h-1" aria-hidden="true" />
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground bg-transparent hover:bg-muted"
                  )}
                >
                  Услуги
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background/95 backdrop-blur-sm">
                  <ul className="grid w-[400px] pt-2 grid-cols-2 md:w-[600px]">
                    <div>
                      <span className="p-4 text-muted-foreground block text-xs uppercase font-semibold">
                        Основные направления
                      </span>
                      {services.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                    <div>
                      <span className="p-4 text-muted-foreground block text-xs uppercase font-semibold">
                        Дополнительно
                      </span>
                      {core.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground bg-transparent hover:bg-muted"
                  )}
                >
                  Компания
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background/95 backdrop-blur-sm">
                  <ul className="grid w-[400px] pt-2 grid-cols-1 md:w-[400px]">
                    <div>
                      <span className="p-4 text-muted-foreground block text-xs uppercase font-semibold">Инфо</span>
                      {company.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground bg-transparent hover:bg-muted"
                  )}
                >
                  Материалы
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background/95 backdrop-blur-sm">
                  <ul className="grid w-[400px] pt-2 grid-cols-1 md:w-[400px]">
                    <div>
                      <span className="p-4 text-muted-foreground block text-xs uppercase font-semibold">Ресурсы</span>
                      {materials.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          icon={component.icon}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground bg-transparent hover:bg-muted"
                  )}
                >
                  <Link href="/b2b-i-goszakaz">B2B и Госзаказ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "rounded-full h-7.5 font-normal text-muted-foreground bg-transparent hover:bg-muted"
                  )}
                >
                  <Link href="/kontakty">Контакты</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-2 items-center shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="text-xs">Поиск...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href="/kontakty">Связаться</Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  icon,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon: ReactElement;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-transparent">
        <Link href={href}>
          <div className="flex gap-3 items-start rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
            <div className="border rounded-sm p-2 icon-container bg-background">{icon}</div>
            <div className="text-container">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 pt-1 text-xs leading-snug">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
];

export type ThemeSwitcherProps = {
  value?: "light" | "dark" | "system";
  onChange?: (theme: "light" | "dark" | "system") => void;
  defaultValue?: "light" | "dark" | "system";
  className?: string;
};

const ThemeSwitcher = ({ 
  className,
}: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleThemeClick = useCallback(
    (themeKey: "light" | "dark" | "system") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative isolate flex h-7 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-5 w-6 rounded-full flex items-center justify-center z-10"
            key={key}
            onClick={() => handleThemeClick(key as "light" | "dark" | "system")}
            type="button"
          >
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-secondary -z-10" />
            )}
            <Icon className={cn("h-3 w-3", isActive ? "text-foreground" : "text-muted-foreground")} />
          </button>
        );
      })}
    </div>
  );
};
