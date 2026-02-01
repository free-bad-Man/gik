export interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeMap: Record<string, string> = {
  uslugi: "Услуги",
  proekty: "Проекты",
  materialy: "Материалы",
  "o-kompanii": "О компании",
  dokumenty: "Документы",
  "b2b-i-goszakaz": "B2B и Госзаказ",
  kontakty: "Контакты",
};

export function getBreadcrumbLabel(segment: string): string {
  return routeMap[segment] || segment;
}
