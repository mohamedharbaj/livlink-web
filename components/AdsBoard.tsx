'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AdCard from './AdCard';
import { useUid } from './AuthProvider';
import { Ad, ALL, OFFER, REQUEST } from '@/lib/ads';
import { CITIES, DISTRICTS } from '@/lib/data';
import { T, Lang } from '@/lib/i18n';
import { watchAds, remove, report } from '@/lib/client';
const NO_DISTRICT = ['اختر الحي', 'جميع الأحياء'];
const KEY = 'livlink_reported';
export default function AdsBoard({ lang, initial, fixedCity }: { lang: Lang; initial: Ad[]; fixedCity?: string }) {
  const t = T[lang], uid = useUid();
  const [city, setCity] = useState(fixedCity ?? ALL), [district, setDistrict] = useState(''), [type, setType] = useState(''), [q, setQ] = useState('');
  const [ads, setAds] = useState(initial);
  // ids of ads this visitor reported: we hide them (same idea as the Android app)
  const [hidden, setHidden] = useState<string[]>([]);
  useEffect(() => { try { setHidden(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch {} }, []);
  useEffect(() => watchAds(city, setAds, () => {}), [city]);
  const districts = (DISTRICTS[city] ?? []).filter((d) => !NO_DISTRICT.includes(d));
  const list = useMemo(() => ads.filter((a) => (!type || a.roleType === type) && (!district || a.district === district) && (!q || (a.title + a.details).includes(q)) && !hidden.includes(a.id)), [ads, type, district, q, hidden]);
  const onDelete = async (a: Ad) => { if (!confirm(t.delAsk)) return; try { await remove(a.id); } catch { alert(t.eFail); } };
  const onReport = async (a: Ad, reason: string) => {
    if (!uid) return alert(t.wait);
    try {
      await report(a.id, uid, reason);
    } catch (e) {
      // permission-denied = this user already reported this ad (rules allow only one report), so we just hide it
      if ((e as { code?: string }).code !== 'permission-denied') return alert(t.eFail);
    }
    const next = [...hidden, a.id];
    setHidden(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    alert(t.reportThanks);
  };
  return (
    <section className="mx-auto max-w-5xl px-4 py-5">
      <div className="grid gap-2 sm:grid-cols-3">
        {!fixedCity && (
          <select className="field" aria-label={t.city} value={city} onChange={(e) => { setCity(e.target.value); setDistrict(''); }}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
        {districts.length > 0 && (
          <select className="field" aria-label={t.district} value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">{t.district}</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        )}
        <input className="field" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
        {[['', t.all], [REQUEST, t.requests], [OFFER, t.offers]].map(([v, l]) => (
          <button key={v} onClick={() => setType(v)} aria-pressed={type === v}
            className={`btn ${type === v ? (v === OFFER ? 'bg-rider text-white' : 'bg-shop text-white') : 'border border-line text-mute'}`}>{l}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {list.map((a) => <AdCard key={a.id} ad={a} lang={lang} uid={uid} onDelete={onDelete} onReport={onReport} />)}
      </div>
      {!list.length && (
        <div className="mt-10 text-center text-mute">
          <p>{t.empty}</p>
          <Link href={`/${lang}/add`} className="mt-3 inline-block font-bold text-fg underline">{t.emptyCta}</Link>
        </div>
      )}
    </section>
  );
}
