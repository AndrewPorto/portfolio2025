'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Tentando login com:', email);
      // Validação simples - substitua por sua própria lógica de autenticação
      if (email === "andrewluizporto@hotmail.com" && password === "DuDa199210") {
        const user = { email };
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('Login bem-sucedido:', user.email);
        router.push('/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Falha ao fazer login');
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      sessionStorage.removeItem('user');
      console.log('Logout realizado com sucesso');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw new Error('Falha ao fazer logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);