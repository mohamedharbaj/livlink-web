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
      <section className="mx-auto max-w-5xl px-4 pt-5 text-center">
        <h1 className="sr-only">{t.tag}</h1>
        <p className="mx-auto max-w-xl text-sm text-mute sm:text-base">{t.desc}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
          <Link href={`/${lang}/add?type=request`} className="rounded-xl bg-shop px-3 py-3 text-start"><b className="block text-sm sm:text-base">{t.shopCta}</b><span className="mt-0.5 block text-xs text-white/80">{t.shopSub}</span></Link>
          <Link href={`/${lang}/add?type=offer`} className="rounded-xl bg-rider px-3 py-3 text-start"><b className="block text-sm sm:text-base">{t.driverCta}</b><span className="mt-0.5 block text-xs text-white/80">{t.driverSub}</span></Link>
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
