import { OFFER } from './ads';
export const langs = ['ar', 'fr'] as const;
export type Lang = (typeof langs)[number];
const ar = {
  tag: 'منصة ربط المحلات بالليفرورات',
  desc: 'منصة وطنية مغربية مجانية 100٪ لربط أصحاب المحلات بالليفرورات في جميع مدن المغرب.',
  shopCta: 'أنشر طلب توصيل', shopSub: 'عندك محل وكتقلب على ليفرور؟',
  driverCta: 'أنشر عرض توصيل', driverSub: 'ليفرور وكتقلب على طلبات؟',
  all: 'الكل', requests: 'طلبات التوصيل', offers: 'عروض الليفرورات', search: 'ابحث...',
  city: 'المدينة', district: 'الحي', add: 'إضافة إعلان', call: 'اتصال', wa: 'واتساب', map: 'الخريطة',
  del: 'حذف', delAsk: 'واش بغيتي تحذف هاد الإعلان؟', empty: 'ما كاين حتى إعلان دابا.', emptyCta: 'كن أول من ينشر',
  cities: 'المدن', type: 'نوع الإعلان', name: 'الاسم', title: 'عنوان الطلب', vehicle: 'وسيلة النقل',
  phone: 'رقم الهاتف', details: 'التفاصيل', publish: 'نشر الإعلان',
  ePhone: 'رقم الهاتف غير صحيح (مثال: 06XXXXXXXX)', eTitle: 'اكتب العنوان', eCity: 'اختر المدينة',
  eLimit: 'وصلتي للحد الأقصى (5 إعلانات). احذف إعلان قديم.', eFail: 'تعذر نشر الإعلان. عاود المحاولة.',
  wait: 'جاري الاتصال بالسيرفر...', req: 'طلب توصيل', off: 'عرض توصيل', now: 'الآن',
  foot: 'الإعلان كيتحيد بعد 7 أيام.',
};
const fr: typeof ar = {
  tag: 'La plateforme qui relie commerçants et livreurs',
  desc: 'Plateforme marocaine 100 % gratuite qui met en relation commerçants et livreurs dans toutes les villes du Maroc.',
  shopCta: 'Publier une demande de livraison', shopSub: 'Vous avez un commerce et cherchez un livreur ?',
  driverCta: 'Publier une offre de livraison', driverSub: 'Livreur à la recherche de courses ?',
  all: 'Tout', requests: 'Demandes', offers: 'Livreurs', search: 'Rechercher...',
  city: 'Ville', district: 'Quartier', add: 'Publier', call: 'Appeler', wa: 'WhatsApp', map: 'Carte',
  del: 'Supprimer', delAsk: 'Supprimer cette annonce ?', empty: "Aucune annonce pour l'instant.", emptyCta: 'Publiez la première',
  cities: 'Villes', type: "Type d'annonce", name: 'Nom', title: 'Titre de la demande', vehicle: 'Véhicule',
  phone: 'Téléphone', details: 'Détails', publish: "Publier l'annonce",
  ePhone: 'Numéro invalide (ex : 06XXXXXXXX)', eTitle: 'Saisissez un titre', eCity: 'Choisissez une ville',
  eLimit: 'Limite atteinte (5 annonces). Supprimez-en une.', eFail: 'Échec de la publication. Réessayez.',
  wait: 'Connexion au serveur...', req: 'Demande de livraison', off: 'Offre de livraison', now: "à l'instant",
  foot: 'Les annonces expirent après 7 jours.',
};
export const T = { ar, fr };
export const roleLabel = (l: Lang, r: string) => (r === OFFER ? T[l].off : T[l].req);
export const ago = (t: number, l: Lang) => {
  const m = Math.round((t - Date.now()) / 6e4), f = new Intl.RelativeTimeFormat(l, { numeric: 'auto' });
  return Math.abs(m) < 1 ? T[l].now : Math.abs(m) < 60 ? f.format(m, 'minute') : Math.abs(m) < 1440 ? f.format(Math.round(m / 60), 'hour') : f.format(Math.round(m / 1440), 'day');
};
