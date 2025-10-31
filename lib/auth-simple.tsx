'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Credenciais fixas
const VALID_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL
const VALID_PASSWORD = process.env.NEXT_PUBLIC_USER_PASSWORD

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há usuário no sessionStorage
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const user = { email };
      setUser(user);
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log('Login bem-sucedido, redirecionando...');
      router.push('/dashboard');
    } else {
      throw new Error('Email ou senha inválidos');
    }
  };

  const signOut = async () => {
    setUser(null);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);