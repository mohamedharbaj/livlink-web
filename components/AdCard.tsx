'use client';
import { useEffect, useState } from 'react';
import { Ad, OFFER, intl, mapUrl } from '@/lib/ads';
import { T, Lang, ago, roleLabel } from '@/lib/i18n';
export default function AdCard({ ad, lang, uid, onDelete, onReport }: { ad: Ad; lang: Lang; uid: string | null; onDelete: (a: Ad) => void; onReport: (a: Ad, reason: string) => void }) {
  const t = T[lang], offer = ad.roleType === OFFER, [when, setWhen] = useState(''), [askReport, setAskReport] = useState(false);
  const reasons: [string, string][] = [['spam', t.rSpam], ['scam', t.rScam], ['wrong', t.rWrong], ['other', t.rOther]];
  useEffect(() => setWhen(ago(ad.createdAt, lang)), [ad.createdAt, lang]);
  const ph = ad.phone.replace(/[^\d+]/g, ''), map = offer ? null : mapUrl(ad);
  const place = [ad.city, ad.district].filter((x) => x && x !== 'اختر الحي' && x !== 'جميع الأحياء').join(' • ');
  return (
    <article className={`rounded-xl border border-s-4 border-line bg-panel p-4 ${offer ? 'border-s-rider' : 'border-s-shop'}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold leading-snug">{ad.title}</h3>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${offer ? 'bg-rider/15 text-orange-300' : 'bg-shop/15 text-blue-300'}`}>{roleLabel(lang, ad.roleType)}</span>
      </div>
      <p className="mt-1 text-sm text-mute">{place}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-fg/80">{ad.details}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-mute">
        <span dir="ltr">{ph}</span><span>{when}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <a href={`tel:${ph}`} className="btn border border-line">{t.call}</a>
        <a href={`https://wa.me/${intl(ad.phone)}`} target="_blank" rel="noopener noreferrer" className="btn bg-green-600 text-white">{t.wa}</a>
        {map && <a href={map} target="_blank" rel="noopener noreferrer" className="btn bg-shop text-white">{t.map}</a>}
        {uid && uid === ad.ownerId && <button onClick={() => onDelete(ad)} className="btn ms-auto text-red-400">{t.del}</button>}
        {uid && uid !== ad.ownerId && <button onClick={() => setAskReport(!askReport)} aria-expanded={askReport} className="btn ms-auto text-xs font-normal text-mute underline">{t.report}</button>}
      </div>
      {askReport && (
        <div className="mt-3 rounded-lg border border-line p-3">
          <p className="mb-2 text-xs text-mute">{t.reportWhy}</p>
          <div className="flex flex-wrap gap-2">
            {reasons.map(([code, label]) => (
              <button key={code} onClick={() => { setAskReport(false); onReport(ad, code); }} className="btn border border-line text-xs">{label}</button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
