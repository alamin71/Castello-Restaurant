"use client";

import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "./QueryProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import LoginModal from "@/main/Auth/LoginModal";
import { Toaster } from "sonner";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <AuthProvider>
                <Navbar />
                <LoginModal />
                {children}
                <Footer />
                <Toaster position="top-center" richColors closeButton={false} toastOptions={{ style: { width: "fit-content" } }} />
            </AuthProvider>
        </QueryProvider>
    );
}
