'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T, Lang } from '@/lib/i18n';
export default function Header({ lang }: { lang: Lang }) {
  const p = usePathname() || '/', other = lang === 'ar' ? 'fr' : 'ar';
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${lang}`} className="text-xl font-extrabold tracking-wide">LIVLINK</Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href={`/${lang}/add`} className="btn bg-shop text-white">{T[lang].add}</Link>
          <Link href={p.replace(/^\/(ar|fr)/, `/${other}`)} hrefLang={other} className="btn border border-line text-mute">{other === 'ar' ? 'عربي' : 'FR'}</Link>
        </nav>
      </div>
    </header>
  );
}
