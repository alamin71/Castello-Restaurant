"use client";

import { useState } from "react";
import {
    Minus,
    Plus,
    Trash2,
    MapPin,
    Phone,
    User,
    Circle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { SavedAddressesDialog } from "./SavedAddressesDialog";
import { SelectBranchDialog } from "./SelectBranchDialog";
import { PersonalDetailsDialog } from "./Personaldetailsdialog ";
import Link from "next/link";
import giro from "../../../public/icons/giro";
import Card from "../../../public/icons/card";
import Aur from "../../../public/icons/aur";
import Cash from "../../../public/icons/cash";

type CartItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
};

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "Durum Kebab w/chicken",
        description: "Chicken, cabbage, cucumber, tomatoes, red onion",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
    {
        id: 2,
        name: "The front page pizza",
        description: "Pepperoni, Bacon, Paprika, Garlic Sauce, Basil",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
    {
        id: 3,
        name: "Coke",
        description: "2L",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
];

const paymentMethods = [
    { id: "card", title: "Card payment", icon: Card },
    { id: "giro", title: "Online giro", icon: giro },
    { id: "aur", title: "Aur", icon: Aur },
    { id: "cash", title: "Cash on delivery", icon: Cash },
];

export default function CompleteOrder() {
    const [selectedPayment, setSelectedPayment] = useState("giro");
    const [deliveryType, setDeliveryType] = useState("delivery");
    const [branchDialogOpen, setBranchDialogOpen] = useState(false);
    const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false);
    const [personalDetails, setPersonalDetails] = useState({
        fullName: "Jón Sigurðsson",
        email: "jon.sigurdsson@gmail.com",
        phone: "+354 661 4821",
    });
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 1000;
    const total = subtotal + deliveryFee;

    return (
        <div className="text-white">

            {/* ── PAGE HEADER ── */}
            <div className="border-b border-white/20">
                <div className="mx-auto w-11/12 md:w-10/12 px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center gap-3">
                        <div className="h-1 w-10 sm:w-16 rounded-full bg-secondary" />
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            Complete order
                        </h1>
                    </div>
                </div>
            </div>

            {/*
             *  RESPONSIVE GRID
             *  mobile  (<sm)  : 1 col  — all sections stack vertically
             *  tablet  (sm)   : 2 cols — cart | details+payment stacked
             *  desktop (lg+)  : 3 cols — cart | details | payment
             */}
            <div className="mx-auto w-11/12 md:w-10/12 px-4 sm:px-6 py-6
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">

                {/* ══ LEFT — CART ITEMS ══ */}
                <div className="col-span-1">
                    <div className="mb-4 sm:mb-6 flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-semibold">Items</h2>
                        <Link href="/menu" className="rounded-xl px-4 sm:px-6 py-2 sm:py-5 text-sm bg-secondary hover:bg-secondary/90">
                            Shop More
                        </Link>
                    </div>

                    {/* Uncapped on mobile so nothing is hidden; fixed height on larger screens */}
                    <ScrollArea className="w-full sm:h-[60vh] pr-1">
                        <div className="space-y-3 sm:space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-white/20 p-3 sm:p-4"
                                >
                                    <div className="flex gap-3 sm:gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={56}
                                            height={56}
                                            className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-xl object-cover"
                                        />
                                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                                            {/* Name + delete */}
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-sm font-semibold">
                                                        {item.name}
                                                    </h3>
                                                    <p className="truncate text-xs text-white/70">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => removeItem(item.id)}
                                                    className="h-7 w-7 shrink-0 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Controls + price */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox className="border-secondary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white shrink-0" />

                                                    <div className="flex items-center rounded-md border border-white/20">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="h-7 w-7 text-white hover:bg-secondary"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-6 text-center text-sm font-medium text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="h-7 w-7 text-white hover:bg-secondary"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold">
                                                        {item.price * item.quantity} ISK.
                                                    </p>
                                                    <p className="text-xs text-white/70">
                                                        {item.price} × {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* ══ CENTER — DELIVERY / ADDRESS / PERSONAL / INSTRUCTIONS ══
                    tablet: col 2 only
                    desktop: col 2 only                                          */}
                <div className="col-span-1 space-y-3">

                    {/* DELIVERY OPTIONS */}
                    <section>
                        <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                            Delivery options
                        </h2>
                        <div className="flex rounded-2xl border border-white/20 p-1">
                            <button
                                onClick={() => setDeliveryType("delivery")}
                                className={cn(
                                    "flex-1 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium transition",
                                    deliveryType === "delivery" ? "bg-secondary text-white" : "text-white"
                                )}
                            >
                                Home Delivery
                                <span className="block text-xs opacity-80">55 - 60 Minutes</span>
                            </button>
                            <button
                                onClick={() => { setDeliveryType("pickup"); setBranchDialogOpen(true); }}
                                className={cn(
                                    "flex-1 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium transition",
                                    deliveryType === "pickup" ? "bg-secondary text-white" : "text-white"
                                )}
                            >
                                Pick up
                                <span className="block text-xs opacity-80">15 - 20 Minutes</span>
                            </button>
                        </div>
                    </section>

                    {/* ADDRESS */}
                    <section>
                        <div className="mb-3 sm:mb-4 flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-semibold">Address</h2>
                            <SavedAddressesDialog />
                        </div>
                        <div className="flex min-h-45 sm:min-h-55 flex-col items-center justify-center rounded-2xl border border-white/20 p-5 sm:p-6 text-center">
                            <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/20">
                                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <p className="text-sm text-white">No address found</p>
                            <p className="mt-1 text-xs text-white/70">
                                Please add an address to deliver you
                            </p>
                        </div>
                    </section>

                    {/* PERSONAL DETAILS */}
                    <section>
                        <div className="mb-3 sm:mb-4 flex items-center justify-between">
                            <h2 className="text-base sm:text-lg font-semibold">Personal details</h2>
                            <Button
                                variant="ghost"
                                className="text-white text-sm"
                                onClick={() => setPersonalDetailsOpen(true)}
                            >
                                Change
                            </Button>
                        </div>
                        <div className="space-y-3 sm:space-y-4 rounded-2xl border border-white/20 p-4 sm:p-5">
                            <div className="flex items-center gap-3 text-sm">
                                <User className="h-4 w-4 shrink-0 text-white" />
                                <span className="truncate">{personalDetails.fullName}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="h-4 w-4 shrink-0 text-white" />
                                <span className="truncate">{personalDetails.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 shrink-0 text-white" />
                                <span className="truncate">{personalDetails.phone}</span>
                            </div>
                        </div>
                    </section>

                    {/* INSTRUCTIONS */}
                    <section>
                        <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                            Instruction
                        </h2>
                        <Textarea
                            placeholder="Write any instruction here..."
                            className="min-h-30 sm:min-h-35 rounded-2xl border-white/20 text-white placeholder:text-white/50"
                        />
                    </section>
                </div>

                {/* ══ RIGHT — PAYMENT / VOUCHER / SUMMARY ══
                    mobile: col 1 (full width, stacked below)
                    tablet: col 1-2 (spans both columns)
                    desktop: col 3 (own column)                  */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-5 sm:space-y-6">

                    {/* PAYMENT METHODS
                        On tablet (where this panel is full-width) show cards in a row. */}
                    <section>
                        <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
                            Select payment method
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-2xl border p-3 sm:p-4 transition",
                                            selectedPayment === method.id
                                                ? "border-secondary bg-white/5"
                                                : "border-white/20 hover:border-white/40"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                            <Icon />
                                            <span className="text-sm font-medium truncate">
                                                {method.title}
                                            </span>
                                        </div>
                                        <Circle
                                            className={cn(
                                                "h-4 w-4 sm:h-5 sm:w-5 shrink-0 ml-2",
                                                selectedPayment === method.id
                                                    ? "fill-secondary text-secondary"
                                                    : "text-white/40"
                                            )}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {selectedPayment === "giro" && (
                            <Input
                                placeholder="Enter phone number"
                                className="mt-3 sm:mt-4 h-12 rounded-2xl border-white/20"
                            />
                        )}
                    </section>

                    {/* VOUCHER */}
                    <section>
                        <h2 className="mb-3 sm:mb-4 text-sm font-medium text-white">
                            Do you have a voucher code?
                        </h2>
                        <div className="flex gap-2 sm:gap-3">
                            <Input
                                placeholder="Voucher code"
                                className="h-12 rounded-2xl border-white/20"
                            />
                            <Button className="h-12 shrink-0 rounded-2xl bg-secondary px-4 sm:px-6 hover:bg-secondary">
                                Apply
                            </Button>
                        </div>
                    </section>

                    {/* PAYMENT SUMMARY */}
                    <section>
                        <h2 className="mb-4 sm:mb-5 text-base sm:text-lg font-semibold">
                            Payment summary
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between text-sm text-white">
                                <span>Sub Total</span>
                                <span>{subtotal} ISK.</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-white">
                                <span>Delivery Charge</span>
                                <span>{deliveryFee} ISK.</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base sm:text-lg font-semibold">Total</p>
                                    <p className="text-xs text-white/70">1% Tax (Included)</p>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold">{total} ISK.</p>
                            </div>
                            <Button className="mt-3 sm:mt-4 h-12 sm:h-14 w-full rounded-2xl bg-secondary text-sm sm:text-base font-semibold hover:bg-secondary">
                                Pay Now
                            </Button>
                        </div>
                    </section>
                </div>
            </div>

            {/* ── DIALOGS ── */}
            <SelectBranchDialog
                open={branchDialogOpen}
                onOpenChange={setBranchDialogOpen}
                onContinue={(branchId) => console.log("Selected branch:", branchId)}
            />
            <PersonalDetailsDialog
                open={personalDetailsOpen}
                onOpenChange={setPersonalDetailsOpen}
                defaultValues={personalDetails}
                onSave={(data) => setPersonalDetails(data)}
            />
        </div>
    );
}