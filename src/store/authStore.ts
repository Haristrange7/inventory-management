import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, _password: string, name?: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: name || email.split('@')[0],
          email,
        };

        const token = 'fake-jwt-token-' + Math.random().toString(36).substr(2, 9);

        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
