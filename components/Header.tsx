'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { T, Lang, langs } from '@/lib/i18n';
const LABEL: Record<Lang, string> = { ar: 'العربية', fr: 'Français' };
export default function Header({ lang }: { lang: Lang }) {
  const p = usePathname() || '/';
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-4 text-center">
        <Link href={`/${lang}`} className="inline-flex items-center justify-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-xl shadow-lg shadow-shop/20" />
          <span className="text-3xl font-extrabold tracking-wider">LIVLINK</span>
        </Link>
        <p className="mt-1 text-sm text-mute">{T[lang].tag}</p>
        <nav className="mt-3 flex justify-center gap-2" aria-label="Language">
          {langs.map((l) => (
            <Link
              key={l}
              href={p.replace(/^\/(ar|fr)/, `/${l}`)}
              hrefLang={l}
              aria-current={l === lang ? 'true' : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${l === lang ? 'bg-shop text-white' : 'border border-line text-mute'}`}
            >
              {LABEL[l]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
