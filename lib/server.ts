import { Ad, ALL, REQUEST, cleanAds } from './ads';
const val = (x: any) => (x == null ? undefined : x.stringValue ?? (x.integerValue != null ? Number(x.integerValue) : x.doubleValue));
// Server-side read through the Firestore REST API (rules allow public read) so Google can index the ads
export async function fetchAds(city?: string): Promise<Ad[]> {
  const q: any = { from: [{ collectionId: 'ads' }], limit: 100 };
  if (city && city !== ALL) q.where = { fieldFilter: { field: { fieldPath: 'city' }, op: 'EQUAL', value: { stringValue: city } } };
  else q.orderBy = [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }];
  try {
    const r = await fetch(
      `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`,
      { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ structuredQuery: q }), next: { revalidate: 120 } }
    );
    const rows = await r.json();
    return cleanAds(rows.filter((x: any) => x.document).map((x: any) => {
      const f = x.document.fields ?? {}, g = (k: string) => val(f[k]);
      return {
        id: x.document.name.split('/').pop(), title: g('title') ?? '', city: g('city') ?? '', district: g('district') ?? '',
        roleType: g('roleType') ?? REQUEST, phone: g('phone') ?? '', details: g('details') ?? '', vehicleType: g('vehicleType') ?? '',
        priceEstimate: g('priceEstimate') ?? '', latitude: g('latitude'), longitude: g('longitude'),
        locationAddress: g('locationAddress'), createdAt: g('createdAt') ?? 0, ownerId: g('ownerId') ?? '',
      } as Ad;
    }));
  } catch { return []; }
}
