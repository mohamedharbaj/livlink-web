import type { MetadataRoute } from 'next';
import { CITIES } from '@/lib/data';
import { ALL } from '@/lib/ads';
export default function sitemap(): MetadataRoute.Sitemap {
  const b = process.env.NEXT_PUBLIC_SITE_URL;
  if (!b) return [];
  return ['ar', 'fr'].flatMap((l) => [`/${l}`, ...CITIES.filter((c) => c !== ALL).map((c) => `/${l}/city/${encodeURIComponent(c)}`)]).map((p) => ({ url: b + p }));
}
