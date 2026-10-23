import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdsBoard from '@/components/AdsBoard';
import { fetchAds } from '@/lib/server';
import { CITIES } from '@/lib/data';
import { Lang } from '@/lib/i18n';
export const revalidate = 120;
type P = { params: { lang: Lang; city: string } };
export function generateMetadata({ params }: P): Metadata {
  const c = decodeURIComponent(params.city);
  return { title: params.lang === 'ar' ? `ليفرور وطلبات توصيل في ${c}` : `Livreurs et demandes de livraison à ${c}` };
}
export default async function City({ params }: P) {
  const city = decodeURIComponent(params.city);
  if (!CITIES.includes(city)) notFound();
  return (
    <>
      <h1 className="mx-auto max-w-5xl px-4 pt-10 text-3xl font-extrabold">{city}</h1>
      <AdsBoard lang={params.lang} initial={await fetchAds(city)} fixedCity={city} />
    </>
  );
}
