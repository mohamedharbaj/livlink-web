import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '../globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import { langs, T, Lang } from '@/lib/i18n';
const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap' });
export const dynamicParams = false;
export const generateStaticParams = () => langs.map((lang) => ({ lang }));
export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const t = T[params.lang];
  return { title: { default: `LIVLINK | ${t.tag}`, template: '%s | LIVLINK' }, description: t.desc };
}
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: Lang } }) {
  const lang = params.lang;
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={cairo.className}>
        <AuthProvider>
          <Header lang={lang} />
          <main>{children}</main>
          <footer className="border-t border-line py-6 text-center text-xs text-mute">© LIVLINK</footer>
        </AuthProvider>
      </body>
    </html>
  );
}
