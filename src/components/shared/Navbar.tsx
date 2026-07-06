"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "../ui/button"
import OrderCartSheet from "@/main/OrderCart/OrderCart"
import { ProfileDropdown } from "@/main/Profile/ProfileDropdown"
import { useAuth } from "@/context/AuthContext"
import Container from "./Container"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Find a branch", href: "/find-a-branch" },
]
const mobileNav = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Find a branch", href: "/find-a-branch" },
    { name: "Profile", href: "/profile" },
]

export default function Navbar() {
    const pathname = usePathname()
    const { isLoggedIn, openLoginModal } = useAuth()

    return (
        <nav className="bg-background sticky top-0 z-50 w-full text-white py-2">
            <Container className="py-2 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/assets/logo.png" alt="Logo" width={116} height={48} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => {
                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`relative text-base font-medium transition-all duration-300
                                ${isActive ? "text-secondary font-semibold" : "text-white/90 hover:text-secondary/70"}
                                after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                after:bg-secondary after:transition-all after:duration-300
                                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                                `}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop Right Section */}
                <div className="hidden md:flex items-center gap-4">
                    <OrderCartSheet />
                    {isLoggedIn ? (
                        <ProfileDropdown />
                    ) : (
                        <Button
                            onClick={openLoginModal}
                            className="px-6 py-5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full"
                        >
                            Log in
                        </Button>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-3">
                    <OrderCartSheet />

                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                aria-label="Open menu"
                                className="text-secondary focus:outline-none"
                            >
                                <Menu size={26} />
                            </button>
                        </SheetTrigger>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SheetContent side="right" className="bg-background border-none w-72">
                            <div className="flex flex-col h-full pt-10 pb-8 px-6">

                                {/* Mobile Nav Links */}
                                <div className="flex flex-col gap-6">
                                    {mobileNav.map((item) => {
                                        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                                        return (
                                            <SheetClose asChild key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={`relative text-lg font-medium transition-all duration-300
                                                    ${isActive ? "text-secondary font-semibold" : "text-white/90 hover:text-secondary/70"}
                                                    after:absolute after:left-0 after:-bottom-1 after:h-0.5
                                                    after:bg-secondary after:transition-all after:duration-300
                                                    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
                                                    `}
                                                >
                                                    {item.name}
                                                </Link>
                                            </SheetClose>
                                        )
                                    })}
                                </div>

                                {/* Mobile Auth */}
                                {!isLoggedIn && (
                                    <div className="mt-8 flex flex-col gap-3">
                                        <SheetClose asChild>
                                            <Button
                                                onClick={openLoginModal}
                                                className="w-full py-5 bg-transparent border border-white/30 text-white hover:bg-white/10"
                                            >
                                                Log in
                                            </Button>
                                        </SheetClose>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

            </Container>
        </nav>
    )
}
