import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { materials } from '@/data/materials';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/kontakty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/o-kompanii`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/uslugi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/proekty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/materialy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/dokumenty`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic Services
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/uslugi/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Projects
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/proekty/${project.slug}`,
    lastModified: new Date(), // In real app, use project.date
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic Materials
  const materialRoutes: MetadataRoute.Sitemap = materials.map((material) => ({
    url: `${siteConfig.url}/materialy/${material.slug}`,
    lastModified: material.date ? new Date() : new Date(), // Simplification
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...projectRoutes, ...materialRoutes];
}
