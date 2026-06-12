"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ClipboardList, MapPin, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "My Account", href: "/profile", icon: User },
    { label: "My Orders", href: "/profile/orders", icon: ClipboardList },
    { label: "My Addresses", href: "/profile/address", icon: MapPin },
    { label: "Sign Out", href: "", icon: LogOut, danger: true },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className=" text-white min-h-screen">
            <div className="mx-auto w-10/12  py-4 sm:py-6 md:py-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-[calc(100vh-80px)]">

                    {/* ── Sidebar ── */}
                    <aside className="w-full lg:w-56 xl:w-64 shrink-0 bg-primary rounded-2xl p-2">
                        <nav className="flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-2 lg:gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                            item.danger
                                                ? isActive
                                                    ? "bg-white/10 text-red-500"
                                                    : "text-red-500 hover:bg-white/5"
                                                : isActive
                                                    ? "bg-white text-black"
                                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <Icon className="h-5 w-5 shrink-0" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* ── Page content ── */}
                    <main className="flex-1 min-w-0 bg-primary rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
                        {children}
                    </main>

                </div>
            </div>
        </div>
    );
}