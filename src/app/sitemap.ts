import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://elohimbio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: 'about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: 'technology', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'products', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'business', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: 'board', changeFrequency: 'weekly' as const, priority: 0.6 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of paths) {
    for (const locale of routing.locales) {
      const url = path
        ? `${BASE_URL}/${locale}/${path}`
        : `${BASE_URL}/${locale}`;

      const languages: Record<string, string> = {};
      for (const altLocale of routing.locales) {
        languages[altLocale] = path
          ? `${BASE_URL}/${altLocale}/${path}`
          : `${BASE_URL}/${altLocale}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
