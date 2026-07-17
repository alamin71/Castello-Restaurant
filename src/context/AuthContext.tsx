"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useAuthStore } from "@/store/auth.store";

interface User {
    phone: string;
    countryCode: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const accessToken = useAuthStore((s) => s.accessToken);
    const phone = useAuthStore((s) => s.phone);
    const countryCode = useAuthStore((s) => s.countryCode);
    const clearAuth = useAuthStore((s) => s.clearAuth);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const isLoggedIn = !!accessToken;
    const user = isLoggedIn && phone && countryCode ? { phone, countryCode } : null;

    const logout = () => {
        clearAuth();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoginModalOpen, openLoginModal, closeLoginModal, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
