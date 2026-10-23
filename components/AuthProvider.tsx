'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { watchUid } from '@/lib/client';
const C = createContext<string | null>(null);
export const useUid = () => useContext(C);
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => watchUid(setUid), []);
  return <C.Provider value={uid}>{children}</C.Provider>;
}
