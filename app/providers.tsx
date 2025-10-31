'use client';

import { FC, ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-simple';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};