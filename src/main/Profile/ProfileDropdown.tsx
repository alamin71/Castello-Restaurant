"use client";

import Link from "next/link";
import { User, ClipboardList, MapPin, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";

interface ProfileDropdownProps {
    user?: {
        name: string;
        avatarUrl?: string;
    };
    onSignOut?: () => void;
}

export function ProfileDropdown({
    user = { name: "Jón Sigurðsson", avatarUrl: "/assets/avatar.png" },
    onSignOut,
}: ProfileDropdownProps) {
    return (
        <DropdownMenu>
            {/* ── Trigger ── */}
            <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-white/20 hover:ring-white/50 transition-all duration-200 focus:outline-none focus-visible:ring-secondary">
                    <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                    <AvatarFallback className="bg-white/10 text-white text-base font-semibold">
                        {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            {/* ── Panel ── */}
            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-64 rounded-xl bg-primary shadow-xl shadow-white/10 p-0 "
            >
                {/* Profile header */}
                <div className="flex flex-col items-center gap-3 px-6 py-4">
                    <Avatar className="h-18 w-18 ring-2 ring-white/20">
                        <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                        <AvatarFallback className="bg-white/10 text-white text-xl font-semibold">
                            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-white font-semibold text-base tracking-tight">
                        {user.name}
                    </span>
                </div>

                <DropdownMenuSeparator className="bg-white/10 mx-0" />

                {/* My Account */}
                <DropdownMenuItem asChild className="rounded-none px-5 py-3 cursor-pointer">
                    <Link href="/profile" className="flex items-center gap-3 text-white">
                        <User className="h-5 w-5 shrink-0 text-white/60" />
                        <span className="text-base font-medium">My Account</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10 mx-0" />
                {/* My Orders */}
                <DropdownMenuItem asChild className="rounded-none px-5 py-3 cursor-pointer">
                    <Link href="/profile/orders" className="flex items-center gap-3 text-white">
                        <ClipboardList className="h-5 w-5 shrink-0 text-white/60" />
                        <span className="text-base font-medium">My Orders</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10 mx-0" />
                {/* Addresses */}
                <DropdownMenuItem asChild className="rounded-none px-5 py-3 cursor-pointer">
                    <Link href="/profile/address" className="flex items-center gap-3 text-white">
                        <MapPin className="h-5 w-5 shrink-0 text-white/60" />
                        <span className="text-base font-medium">Addresses</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 mx-0" />

                {/* Sign Out */}
                <DropdownMenuItem
                    onClick={onSignOut}
                    className="rounded-none rounded-b-2xl px-5 py-3 focus:bg-red-500 cursor-pointer"
                >
                    <LogOut className="h-5 w-5 shrink-0 text-secondary" />
                    <span className="text-base font-medium text-secondary">Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}