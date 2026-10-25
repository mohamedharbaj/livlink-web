import { initializeApp, getApps } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, getDocs, Timestamp } from 'firebase/firestore';
import { Ad, ALL, TTL, cleanAds, isFresh } from './ads';
const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = () => {
  if (getApps().length) return getApps()[0];
  const a = initializeApp(cfg);
  // App Check (reCAPTCHA v3): يحمي Firestore من السكريبتات. كيشتغل غير إلا كان المفتاح موجود
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (siteKey && typeof window !== 'undefined') {
    try { initializeAppCheck(a, { provider: new ReCaptchaV3Provider(siteKey), isTokenAutoRefreshEnabled: true }); } catch {}
  }
  return a;
};
const db = () => getFirestore(app());

// Anonymous sign-in, same as the Android app
export const watchUid = (cb: (u: string | null) => void) => {
  const a = getAuth(app());
  return onAuthStateChanged(a, (u) => { if (u) cb(u.uid); else { cb(null); signInAnonymously(a).catch(() => {}); } });
};
export const watchAds = (city: string, cb: (l: Ad[]) => void, err: (e: Error) => void) => {
  const base = collection(db(), 'ads');
  const q = city === ALL ? query(base, orderBy('createdAt', 'desc'), limit(100)) : query(base, where('city', '==', city), orderBy('createdAt', 'desc'), limit(100));
  return onSnapshot(q, (s) => cb(cleanAds(s.docs.map((d) => ({ ...d.data(), id: d.id }) as Ad))), err);
};
export const myAdsCount = async (uid: string) =>
  (await getDocs(query(collection(db(), 'ads'), where('ownerId', '==', uid)))).docs.filter((d) => isFresh(d.data().createdAt)).length;
export const publish = (a: Omit<Ad, 'id'>) =>
  setDoc(doc(collection(db(), 'ads')), { ...a, expiresAt: Timestamp.fromMillis(a.createdAt + TTL) });
export const remove = (id: string) => deleteDoc(doc(db(), 'ads', id));
// Report an ad (same rules as the Android app: one report per user per ad, id = adId_uid)
export const report = (adId: string, uid: string, reason: string) =>
  setDoc(doc(db(), 'reports', `${adId}_${uid}`), { adId, reporterId: uid, reason, createdAt: Date.now() });
