import Link from 'next/link';
import AdsBoard from '@/components/AdsBoard';
import { fetchAds } from '@/lib/server';
import { T, Lang } from '@/lib/i18n';
import { CITIES } from '@/lib/data';
import { ALL } from '@/lib/ads';
export const revalidate = 120;
export default async function Home({ params }: { params: { lang: Lang } }) {
  const lang = params.lang, t = T[lang], ads = await fetchAds();
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-10">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">{t.tag}</h1>
        <p className="mt-3 max-w-xl text-mute">{t.desc}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href={`/${lang}/add?type=request`} className="rounded-2xl bg-shop p-5"><b className="block text-lg">{t.shopCta}</b><span className="text-sm text-white/80">{t.shopSub}</span></Link>
          <Link href={`/${lang}/add?type=offer`} className="rounded-2xl bg-rider p-5"><b className="block text-lg">{t.driverCta}</b><span className="text-sm text-white/80">{t.driverSub}</span></Link>
        </div>
      </section>
      <AdsBoard lang={lang} initial={ads} />
      <nav className="mx-auto max-w-5xl px-4 pb-10" aria-label={t.cities}>
        <h2 className="mb-2 text-sm font-bold text-mute">{t.cities}</h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.filter((c) => c !== ALL).slice(0, 24).map((c) => (
            <Link key={c} href={`/${lang}/city/${encodeURIComponent(c)}`} className="rounded-full border border-line px-3 py-1 text-sm text-mute">{c}</Link>
          ))}
        </div>
      </nav>
    </>
  );
}
