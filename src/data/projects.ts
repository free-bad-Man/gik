export interface Project {
  slug: string;
  title: string;
  description: string;
  content?: string;
  date?: string;
  relatedServices?: string[]; // slugs of related services
}

export const projects: Project[] = [];
