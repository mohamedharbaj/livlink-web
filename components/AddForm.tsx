'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUid } from './AuthProvider';
import { ALL, MAX_ADS, OFFER, REQUEST, validPhone } from '@/lib/ads';
import { CITIES, DISTRICTS, VEHICLES } from '@/lib/data';
import { T, Lang } from '@/lib/i18n';
import { myAdsCount, publish } from '@/lib/client';
export default function AddForm({ lang }: { lang: Lang }) {
  const t = T[lang], uid = useUid(), router = useRouter(), sp = useSearchParams();
  const [type, setType] = useState(sp.get('type') === 'offer' ? OFFER : REQUEST);
  const [f, setF] = useState({ name: '', title: '', vehicle: VEHICLES[0], city: '', district: '', phone: '', details: '' });
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [addr, setAddr] = useState(''), [showAddr, setShowAddr] = useState(false), [locBusy, setLocBusy] = useState(false);
  const offer = type === OFFER, accent = offer ? 'bg-rider' : 'bg-shop';
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value, ...(k === 'city' ? { district: '' } : {}) });
  const districts = (DISTRICTS[f.city] ?? []).filter((d) => d !== 'اختر الحي' && d !== 'جميع الأحياء');
  const getGps = () => {
    setErr('');
    if (!navigator.geolocation) return setErr(t.locErr);
    setLocBusy(true);
    navigator.geolocation.getCurrentPosition(
      (p) => { setLoc({ lat: +p.coords.latitude.toFixed(5), lng: +p.coords.longitude.toFixed(5) }); setLocBusy(false); },
      () => { setErr(t.locErr); setLocBusy(false); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    const label = (offer ? f.name : f.title).trim();
    if (!uid) return setErr(t.wait);
    if (!label) return setErr(t.eTitle);
    if (!f.city) return setErr(t.eCity);
    if (!validPhone(f.phone)) return setErr(t.ePhone);
    setBusy(true);
    try {
      if ((await myAdsCount(uid)) >= MAX_ADS) { setErr(t.eLimit); setBusy(false); return; }
      // إلا كتب الليفرور نوع المركبة فالاسم (يوسف - دراجة نارية) كنستعملوه كما هو ما نكرروهش
      const typed = [...VEHICLES].sort((x, y) => y.length - x.length).find((v) => label.includes(v));
      const vehicle = offer ? (typed ?? f.vehicle) : f.vehicle;
      await publish({
        title: offer ? (typed ? label : `${label} - ${f.vehicle}`) : label, city: f.city, district: f.district || 'اختر الحي', roleType: type,
        phone: f.phone.replace(/[^\d+]/g, ''),
        details: f.details.trim() || (offer ? `سائق ${vehicle} جاهز للتوصيل الفوري بمدينة ${f.city}` : `طلب توصيل طلبيات بمدينة ${f.city}`),
        vehicleType: offer ? vehicle : REQUEST, priceEstimate: 'حسب الاتفاق', createdAt: Date.now(), ownerId: uid,
        ...(!offer && loc ? { latitude: loc.lat, longitude: loc.lng } : {}),
        ...(!offer && addr.trim() ? { locationAddress: addr.trim() } : {}),
      });
      router.push(`/${lang}`);
    } catch { setErr(t.eFail); setBusy(false); }
  };
  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.type}>
        {[[REQUEST, t.req, 'bg-shop'], [OFFER, t.off, 'bg-rider']].map(([v, l, c]) => (
          <button type="button" key={v} aria-pressed={type === v} onClick={() => setType(v)}
            className={`btn justify-center ${type === v ? `${c} text-white` : 'border border-line text-mute'}`}>{l}</button>
        ))}
      </div>
      {offer ? (
        <>
          <input className="field" placeholder={t.name} maxLength={80} value={f.name} onChange={set('name')} />
          <select className="field" aria-label={t.vehicle} value={f.vehicle} onChange={set('vehicle')}>{VEHICLES.map((v) => <option key={v}>{v}</option>)}</select>
        </>
      ) : (
        <input className="field" placeholder={t.title} maxLength={120} value={f.title} onChange={set('title')} />
      )}
      <select className="field" aria-label={t.city} value={f.city} onChange={set('city')}>
        <option value="">{t.city}</option>{CITIES.filter((c) => c !== ALL).map((c) => <option key={c}>{c}</option>)}
      </select>
      {districts.length > 0 && (
        <select className="field" aria-label={t.district} value={f.district} onChange={set('district')}>
          <option value="">{t.district}</option>{districts.map((d) => <option key={d}>{d}</option>)}
        </select>
      )}
      <input className="field" dir="ltr" inputMode="tel" placeholder={`${t.phone} 06XXXXXXXX`} value={f.phone} onChange={set('phone')} />
      <textarea className="field" rows={4} maxLength={600} placeholder={t.details} value={f.details} onChange={set('details')} />
      {!offer && (
        <div className="rounded-xl border border-line bg-panel p-3">
          <p className="text-sm font-bold">📍 {t.locTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-mute">{t.locHint}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" onClick={getGps} disabled={locBusy} className="btn justify-center bg-shop text-white disabled:opacity-60">{locBusy ? t.locBusy : t.locGps}</button>
            <button type="button" onClick={() => setShowAddr(!showAddr)} aria-expanded={showAddr} className="btn justify-center border border-line">{t.locManual}</button>
          </div>
          {loc && (
            <p className="mt-2 flex items-center justify-between text-xs text-green-400">
              <span>✓ {t.locDone}</span>
              <button type="button" onClick={() => setLoc(null)} className="text-mute underline">{t.locClear}</button>
            </p>
          )}
          {showAddr && <input className="field mt-2" placeholder={t.locAddr} maxLength={300} value={addr} onChange={(e) => setAddr(e.target.value)} />}
        </div>
      )}
      {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
      <button disabled={busy} className={`btn justify-center py-3 text-white disabled:opacity-60 ${accent}`}>{t.publish}</button>
      <p className="text-center text-xs text-mute">{t.foot}</p>
    </form>
  );
}
