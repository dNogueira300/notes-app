import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isLoading: true,
      error: null,
      isAuthenticated: false,

      // Acciones
      signUp: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Error al registrarse";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            set({
              user: data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Error al iniciar sesión";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      signInWithGoogle: async () => {
        try {
          set({ isLoading: true, error: null });

          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: window.location.origin,
            },
          });

          if (error) throw error;

          // El estado se actualizará a través del AuthProvider cuando se complete el OAuth
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : "Error al iniciar sesión con Google";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      signOut: async () => {
        try {
          set({ isLoading: true });

          const { error } = await supabase.auth.signOut();

          if (error) throw error;

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Error al cerrar sesión";
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
