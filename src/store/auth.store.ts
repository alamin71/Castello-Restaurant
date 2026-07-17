import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    phone: string | null;
    countryCode: string | null;
    setAuth: (accessToken: string, refreshToken: string, phone: string, countryCode: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            phone: null,
            countryCode: null,
            setAuth: (accessToken, refreshToken, phone, countryCode) =>
                set({ accessToken, refreshToken, phone, countryCode }),
            clearAuth: () =>
                set({ accessToken: null, refreshToken: null, phone: null, countryCode: null }),
        }),
        { name: "castello-auth" }
    )
);
