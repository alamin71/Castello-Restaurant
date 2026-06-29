"use client";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import LoginModal from "@/main/Auth/LoginModal";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <Navbar />
            <LoginModal />
            {children}
            <Footer />
        </AuthProvider>
    );
}
