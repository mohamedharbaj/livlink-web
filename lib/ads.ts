export const OFFER = 'عرض توصيل', REQUEST = 'طلب توصيل', ALL = 'جميع مدن المغرب';
export const TTL = 7 * 864e5, MAX_ADS = 5;
export type Ad = {
  id: string; title: string; city: string; district: string; roleType: string; phone: string;
  details: string; vehicleType: string; priceEstimate: string; latitude?: number; longitude?: number;
  locationAddress?: string; createdAt: number; ownerId: string;
};
export const isFresh = (t: number) => t <= 0 || Date.now() - t <= TTL;
export const cleanAds = (l: Ad[]) => l.filter((a) => isFresh(a.createdAt)).sort((x, y) => y.createdAt - x.createdAt);
// Same rule as the Android app
export const validPhone = (r: string) => /^(\+212|00212|0)[5-7][0-9]{8}$/.test(r.replace(/[^\d+]/g, ''));
export const intl = (p: string) => {
  const d = p.replace(/[^\d+]/g, '').replace(/^\+/, '');
  return d.startsWith('00212') ? d.slice(2) : d.startsWith('212') ? d : '212' + d.replace(/^0/, '');
};
export const mapUrl = (a: Ad) =>
  a.latitude != null && a.longitude != null
    ? `https://www.google.com/maps/search/?api=1&query=${a.latitude},${a.longitude}`
    : a.locationAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.locationAddress)}` : null;
