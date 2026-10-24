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
      <section className="relative isolate mx-auto max-w-5xl px-4 pb-1 pt-7 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(37,99,235,0.22),transparent)]" />
        <h1 className="text-2xl font-extrabold leading-tight sm:text-4xl">{t.hero}</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-mute sm:text-base">{t.desc}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-mute">
          {t.chips.map((c) => <li key={c} className="rounded-full border border-line bg-panel px-3 py-1">✓ {c}</li>)}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href={`/${lang}/add?type=request`} className="flex items-center gap-2.5 rounded-2xl bg-shop px-3 py-3 text-start shadow-lg shadow-shop/25 transition hover:brightness-110">
            <span className="text-2xl" aria-hidden>🏪</span>
            <span><b className="block text-sm sm:text-base">{t.shopCta}</b><span className="mt-0.5 block text-xs text-white/80">{t.shopSub}</span></span>
          </Link>
          <Link href={`/${lang}/add?type=offer`} className="flex items-center gap-2.5 rounded-2xl bg-rider px-3 py-3 text-start shadow-lg shadow-rider/25 transition hover:brightness-110">
            <span className="text-2xl" aria-hidden>🛵</span>
            <span><b className="block text-sm sm:text-base">{t.driverCta}</b><span className="mt-0.5 block text-xs text-white/80">{t.driverSub}</span></span>
          </Link>
        </div>
      </section>
      <AdsBoard lang={lang} initial={ads} />
      <nav className="mx-auto max-w-5xl px-4 pb-10 pt-2" aria-label={t.cities}>
        <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold">
          <span aria-hidden className="h-5 w-1 rounded-full bg-gradient-to-b from-shop to-rider" />
          {t.cities}
        </h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {CITIES.filter((c) => c !== ALL).slice(0, 24).map((c) => (
            <Link
              key={c}
              href={`/${lang}/city/${encodeURIComponent(c)}`}
              className="flex items-center justify-center gap-1 rounded-xl border border-line bg-panel px-2 py-2.5 text-sm font-semibold text-fg/90 transition hover:border-shop hover:bg-shop/10"
            >
              <span aria-hidden className="text-xs">📍</span>
              <span className="truncate">{c}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
