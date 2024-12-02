import create from 'zustand';
import { User } from 'firebase/auth';
import { signIn, signUp, logout, resetPassword, resendVerificationEmail } from '../lib/auth/authService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    set({ loading: true, error: null });
    const { user, error } = await signIn(email, password);
    set({ user, error, loading: false });
  },
  signUp: async (email, password, userData) => {
    set({ loading: true, error: null });
    const { user, error } = await signUp(email, password, userData);
    set({ user, error, loading: false });
  },
  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await logout();
    if (!error) {
      set({ user: null });
    }
    set({ error, loading: false });
  },
  resetPassword: async (email) => {
    set({ loading: true, error: null });
    const { error } = await resetPassword(email);
    set({ error, loading: false });
  },
  resendVerification: async () => {
    const { user } = get();
    if (!user) return;
    
    set({ loading: true, error: null });
    const { error } = await resendVerificationEmail(user);
    set({ error, loading: false });
  },
  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));