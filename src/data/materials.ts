export interface Material {
  slug: string;
  title: string;
  description: string;
  type: string;
  date?: string;
  content?: string;
  relatedServices?: string[];
}

export const materials: Material[] = [
  {
    slug: "normativy-izyskaniy",
    title: "Нормативы инженерных изысканий 2024",
    description: "Обзор актуальных нормативных документов и изменений в законодательстве касательно инженерных изысканий.",
    type: "article",
    date: "27.01.2024",
    content: `
      <p>В данной статье мы рассмотрим основные изменения в нормативной базе...</p>
      <p>Соблюдение актуальных норм СП и ГОСТ является обязательным условием для прохождения экспертизы.</p>
    `,
    relatedServices: ["inzhenernye-izyskaniya"]
  },
  {
    slug: "litsenziya-sro",
    title: "Лицензии и допуски СРО",
    description: "Сканы наших лицензий и выписок из реестра членов СРО.",
    type: "document",
    date: "01.01.2024"
  }
];
