import { articles } from '@/app/lib/articles';

export default function sitemap() {
  const base = 'https://example.com';
  const routes = ['', '/about', '/anxiety', '/calm-techniques', '/pet-care', '/resources', '/contact', '/privacy'];
  return [
    ...routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() })),
    ...articles.map((a) => ({ url: `${base}/resources/${a.slug}`, lastModified: new Date() })),
  ];
}
