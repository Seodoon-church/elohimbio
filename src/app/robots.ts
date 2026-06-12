import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*/ir/', '/*/ir/login/', '/*/board/write/'],
      },
    ],
    sitemap: 'https://elohimbio.com/sitemap.xml',
  };
}
