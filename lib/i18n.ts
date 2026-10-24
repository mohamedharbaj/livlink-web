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
  cities: 'المدن', type: 'نوع الإعلان', name: 'الاسم - نوع المركبة (مثال: يوسف - دراجة نارية)', title: 'اسم المحل ونوع السلعة', vehicle: 'وسيلة النقل',
  phone: 'رقم الهاتف', details: 'التفاصيل', publish: 'نشر الإعلان',
  ePhone: 'رقم الهاتف غير صحيح (مثال: 06XXXXXXXX)', eTitle: 'هاد الخانة إجبارية', eCity: 'اختر المدينة',
  eLimit: 'وصلتي للحد الأقصى (5 إعلانات). احذف إعلان قديم.', eFail: 'تعذر نشر الإعلان. عاود المحاولة.',
  wait: 'جاري الاتصال بالسيرفر...', req: 'طلب توصيل', off: 'عرض توصيل', now: 'الآن',
  foot: 'الإعلان كيتحيد بعد 7 أيام.',
  hero: 'اربط محلك بليفرور في دقائق',
  citiesSub: 'اختار مدينتك وشوف الإعلانات القريبة منك', citiesBadge: 'تغطية وطنية',
  locTitle: 'موقع المحل على الخريطة (اختياري)',
  locHint: 'غادي يتنشر الموقع مع إعلانك باش يوصلو لك الليفرورات عبر الخريطة. ما كنستعملوه لشي غرض آخر.',
  locGps: 'تحديد عبر GPS', locBusy: 'جاري التحديد...', locManual: 'إدخال يدوي', locDone: 'تم تحديد الموقع', locClear: 'مسح',
  locAddr: 'العنوان (مثال: شارع محمد الخامس، قرب الصيدلية)', locErr: 'تعذر تحديد الموقع. فعّل الموقع وعاود المحاولة.',
  chips: ['مجاني 100٪', 'جميع مدن المغرب', 'تواصل مباشر بلا وسيط'],
  report: 'إبلاغ', reportWhy: 'سبب البلاغ:', rSpam: 'سبام / مكرر', rScam: 'احتيال', rWrong: 'معلومات خاطئة', rOther: 'سبب آخر',
  reportThanks: 'شكراً، توصلنا بالبلاغ وتم إخفاء الإعلان عنك.',
};
const fr: typeof ar = {
  tag: 'La plateforme qui relie commerçants et livreurs',
  desc: 'Plateforme marocaine 100 % gratuite qui met en relation commerçants et livreurs dans toutes les villes du Maroc.',
  shopCta: 'Publier une demande de livraison', shopSub: 'Vous avez un commerce et cherchez un livreur ?',
  driverCta: 'Publier une offre de livraison', driverSub: 'Livreur à la recherche de courses ?',
  all: 'Tout', requests: 'Demandes', offers: 'Livreurs', search: 'Rechercher...',
  city: 'Ville', district: 'Quartier', add: 'Publier', call: 'Appeler', wa: 'WhatsApp', map: 'Carte',
  del: 'Supprimer', delAsk: 'Supprimer cette annonce ?', empty: "Aucune annonce pour l'instant.", emptyCta: 'Publiez la première',
  cities: 'Villes', type: "Type d'annonce", name: 'Nom - type de véhicule (ex : Youssef - moto)', title: 'Nom du commerce et type de marchandise', vehicle: 'Véhicule',
  phone: 'Téléphone', details: 'Détails', publish: "Publier l'annonce",
  ePhone: 'Numéro invalide (ex : 06XXXXXXXX)', eTitle: 'Ce champ est obligatoire', eCity: 'Choisissez une ville',
  eLimit: 'Limite atteinte (5 annonces). Supprimez-en une.', eFail: 'Échec de la publication. Réessayez.',
  wait: 'Connexion au serveur...', req: 'Demande de livraison', off: 'Offre de livraison', now: "à l'instant",
  foot: 'Les annonces expirent après 7 jours.',
  hero: 'Connectez votre commerce à un livreur en quelques minutes',
  citiesSub: 'Choisissez votre ville pour voir les annonces près de chez vous', citiesBadge: 'Couverture nationale',
  locTitle: 'Position du commerce sur la carte (facultatif)',
  locHint: 'La position sera publiée avec votre annonce pour que les livreurs vous trouvent sur la carte. Elle n’est utilisée à aucune autre fin.',
  locGps: 'Localiser via GPS', locBusy: 'Localisation...', locManual: 'Saisie manuelle', locDone: 'Position enregistrée', locClear: 'Effacer',
  locAddr: 'Adresse (ex : Avenue Mohammed V, près de la pharmacie)', locErr: 'Impossible de vous localiser. Activez la localisation et réessayez.',
  chips: ['100 % gratuit', 'Toutes les villes du Maroc', 'Contact direct sans intermédiaire'],
  report: 'Signaler', reportWhy: 'Motif du signalement :', rSpam: 'Spam / doublon', rScam: 'Arnaque', rWrong: 'Infos erronées', rOther: 'Autre',
  reportThanks: 'Merci, signalement reçu. L’annonce est masquée pour vous.',
};
export const T = { ar, fr };
export const roleLabel = (l: Lang, r: string) => (r === OFFER ? T[l].off : T[l].req);
export const ago = (t: number, l: Lang) => {
  const m = Math.round((t - Date.now()) / 6e4), f = new Intl.RelativeTimeFormat(l, { numeric: 'auto' });
  return Math.abs(m) < 1 ? T[l].now : Math.abs(m) < 60 ? f.format(m, 'minute') : Math.abs(m) < 1440 ? f.format(Math.round(m / 60), 'hour') : f.format(Math.round(m / 1440), 'day');
};
