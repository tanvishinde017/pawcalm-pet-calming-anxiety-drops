export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/cart', '/checkout', '/orders'] },
    ],
    sitemap: process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` : undefined,
  };
}

