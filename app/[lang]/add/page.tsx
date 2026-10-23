import { Suspense } from 'react';
import AddForm from '@/components/AddForm';
import { T, Lang } from '@/lib/i18n';
export default function Add({ params }: { params: { lang: Lang } }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-extrabold">{T[params.lang].add}</h1>
      <Suspense><AddForm lang={params.lang} /></Suspense>
    </div>
  );
}
