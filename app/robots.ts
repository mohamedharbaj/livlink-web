import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  const b = process.env.NEXT_PUBLIC_SITE_URL;
  return { rules: { userAgent: '*', allow: '/' }, ...(b ? { sitemap: `${b}/sitemap.xml` } : {}) };
}
