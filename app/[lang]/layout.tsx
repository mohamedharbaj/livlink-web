import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cairo } from 'next/font/google';
import '../globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import { langs, T, Lang } from '@/lib/i18n';
const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap' });
export const generateStaticParams = () => langs.map((lang) => ({ lang }));
export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const t = T[params.lang] ?? T.ar;
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    ...(base ? { metadataBase: new URL(base) } : {}),
    title: { default: `LIVLINK | ${t.tag}`, template: '%s | LIVLINK' },
    description: t.desc,
    openGraph: { title: `LIVLINK | ${t.tag}`, description: t.desc, siteName: 'LIVLINK', type: 'website' },
  };
}
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  const lang = params.lang;
  if (!langs.includes(lang)) notFound();
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={cairo.className}>
        <AuthProvider>
          <Header lang={lang} />
          <main>{children}</main>
          <footer className="border-t border-line py-6 text-center text-xs text-mute">
            © LIVLINK ·{' '}
            <a className="underline" href={lang === 'fr' ? 'https://livlink-ma.pages.dev/privacy-fr.html' : 'https://livlink-ma.pages.dev/privacy.html'} target="_blank" rel="noopener noreferrer">
              {lang === 'fr' ? 'Politique de confidentialité' : 'سياسة الخصوصية'}
            </a>
            {' · '}
            <a className="underline" href={lang === 'fr' ? 'https://livlink-ma.pages.dev/terms-fr.html' : 'https://livlink-ma.pages.dev/terms.html'} target="_blank" rel="noopener noreferrer">
              {lang === 'fr' ? "Conditions d'utilisation" : 'شروط الاستخدام'}
            </a>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
