"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Topping {
    name: string;
    price: number;
    qty: number;
}

interface ToppingGroup {
    label: string;
    surcharge: string;
    items: Topping[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SIZES = [
    { label: '8″', price: 870, sub: "960 ISK." },
    { label: '10″', price: 870, sub: "960 ISK." },
    { label: '12″', price: 870, sub: "960 ISK." },
];

const CRUSTS = [
    { label: "Classic" },
    { label: "Thin" },
    { label: "Thick" },
    { label: "Stuffed" },
    { label: "Gluten-Free" },
];

const BASE_GROUPS: ToppingGroup[] = [
    {
        label: "Meat",
        surcharge: "+950 ISK. per item",
        items: [
            { name: "Pepperoni", price: 950, qty: 0 },
            { name: "Ham", price: 950, qty: 0 },
            { name: "Bacon", price: 950, qty: 0 },
            { name: "Hack", price: 950, qty: 0 },
            { name: "Tuna", price: 950, qty: 0 },
            { name: "Shrimp", price: 950, qty: 0 },
            { name: "Parma Ham", price: 950, qty: 0 },
            { name: "Chicken", price: 950, qty: 0 },
            { name: "Mussel", price: 950, qty: 0 },
        ],
    },
    {
        label: "Cheeses",
        surcharge: "+560 ISK. per item",
        items: [
            { name: "Cheese", price: 560, qty: 0 },
            { name: "Cream Cheese", price: 560, qty: 0 },
            { name: "Pepper Cheese", price: 560, qty: 0 },
            { name: "Blue Cheese", price: 560, qty: 0 },
            { name: "Parmesan", price: 560, qty: 0 },
            { name: "Vegan Cheese", price: 560, qty: 0 },
            { name: "Camembert", price: 560, qty: 0 },
            { name: "Cheddar Cheese", price: 560, qty: 0 },
        ],
    },
];

const BASE_PRICE = 870;

// ─── Sub-components ───────────────────────────────────────────────────────────
function QtyButton({
    qty,
    onInc,
    onDec,
}: {
    qty: number;
    onInc: () => void;
    onDec: () => void;
}) {
    return (
        <div className="mt-1 flex items-center gap-1">
            <button
                onClick={onDec}
                className="flex h-6 w-6 items-center justify-center rounded  text-sm text-white transition-colors hover:bg-zinc-600"
            >
                −
            </button>

            {qty > 0 && (
                <span className="w-4 text-center text-xs text-white">{qty}</span>
            )}

            <button
                onClick={onInc}
                className="flex h-6 w-6 items-center justify-center rounded  text-sm text-white transition-colors hover:bg-secondary"
            >
                +
            </button>
        </div>
    );
}

function ToppingCard({
    topping,
    onInc,
    onDec,
}: {
    topping: Topping;
    onInc: () => void;
    onDec: () => void;
}) {
    const active = topping.qty > 0;

    return (
        <div
            className={`rounded-2xl border p-2 transition-colors ${active
                ? "border-secondary"
                : "border-white/20"
                }`}
        >
            <p className="text-sm leading-tight ">{topping.name}</p>
            <div className="flex justify-between items-center">
                <p className="text-xs text-white">
                    {topping.price} × {topping.qty || 1}
                </p>

                <QtyButton qty={topping.qty} onInc={onInc} onDec={onDec} />
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddCartDialog({ variant = "icon" }: { variant?: "icon" | "full" }) {
    const { isLoggedIn, openLoginModal } = useAuth();
    const [open, setOpen] = useState(false);

    const [selectedSize, setSelectedSize] = useState(1);
    const [selectedCrust, setSelectedCrust] = useState(0);
    const [cartQty, setCartQty] = useState(1);
    const [groups, setGroups] = useState<ToppingGroup[]>(BASE_GROUPS);

    const handleInc = (gi: number, ti: number) => {
        setGroups((prev) =>
            prev.map((g, i) =>
                i !== gi
                    ? g
                    : {
                        ...g,
                        items: g.items.map((t, j) =>
                            j !== ti ? t : { ...t, qty: t.qty + 1 }
                        ),
                    }
            )
        );
    };

    const handleDec = (gi: number, ti: number) => {
        setGroups((prev) =>
            prev.map((g, i) =>
                i !== gi
                    ? g
                    : {
                        ...g,
                        items: g.items.map((t, j) =>
                            j !== ti ? t : { ...t, qty: Math.max(0, t.qty - 1) }
                        ),
                    }
            )
        );
    };

    const toppingTotal = groups.reduce(
        (sum, g) => sum + g.items.reduce((s, t) => s + t.price * t.qty, 0),
        0
    );

    const total = (BASE_PRICE + toppingTotal) * cartQty;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {variant === "full" ? (
                    <button
                        className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-secondary text-white text-sm font-semibold hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer"
                        onClick={(e) => { if (!isLoggedIn) { e.preventDefault(); openLoginModal(); } }}
                    >
                        <Plus className="h-4 w-4" />
                        Add to Cart
                    </button>
                ) : (
                    <button
                        className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 cursor-pointer"
                        onClick={(e) => { if (!isLoggedIn) { e.preventDefault(); openLoginModal(); } }}
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                )}
            </DialogTrigger>
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogContent className="max-h-[92vh] md:w-full w-11/12 max-w-3xl! overflow-hidden border-0 bg-background shadow-md shadow-white/10 p-0 text-white">
                <div className="flex h-[92vh] flex-col ">

                    {/* Scrollable Content */}
                    <ScrollArea className="flex-1 min-h-0">
                        <div>
                            {/* Hero image */}
                            <div
                                className="relative flex h-fit w-full items-center justify-center bg-cover bg-center"
                                style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                            >
                                <Image
                                    src="/assets/pizza.png"
                                    alt=""
                                    width={180}
                                    height={180}
                                    className="object-contain py-6"
                                />
                            </div>

                            {/* Crust thumbnails */}
                            <div className="flex justify-center gap-3 overflow-x-auto px-4 py-2">
                                {CRUSTS.map((c, i) => (
                                    <button
                                        key={c.label}
                                        onClick={() => setSelectedCrust(i)}
                                        className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 transition-all ${selectedCrust === i
                                            ? "scale-105 border-secondary"
                                            : "border-zinc-700 hover:border-zinc-500"
                                            }`}
                                    >
                                        <Image
                                            src="/assets/pizza.png"
                                            alt={c.label}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                            <Separator />

                            {/* Title */}
                            <div className="px-4 pb-3 text-center">
                                <h2 className="text-lg font-bold tracking-tight text-white">
                                    Arugula Pizza
                                </h2>
                                <p className="mt-0.5 text-xs text-zinc-500">
                                    Parma ham, Rock lettuce, Oregano, Parmesan
                                </p>
                            </div>

                            {/* Size selector — 1 col on mobile, 3 on sm+ */}
                            <RadioGroup
                                value={selectedSize.toString()}
                                onValueChange={(value) => setSelectedSize(Number(value))}
                                className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-2"
                            >
                                {SIZES.map((s, i) => {
                                    const active = selectedSize === i;
                                    return (
                                        <Label
                                            key={i}
                                            htmlFor={`size-${i}`}
                                            className={`flex cursor-pointer items-center justify-between rounded-3xl border px-4 py-4 transition-all ${active
                                                ? "border-secondary bg-white/3"
                                                : "border-white/15 hover:border-white/30"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <RadioGroupItem
                                                    value={i.toString()}
                                                    id={`size-${i}`}
                                                    className="border-white/40 text-secondary"
                                                />
                                                <span className="text-lg font-medium text-zinc-300">
                                                    {s.label}
                                                </span>
                                                <div className="h-8 w-px bg-white/10" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-base font-bold text-white">
                                                    {s.price} ISK.
                                                </span>
                                                <span className="text-sm text-zinc-500 line-through">
                                                    {s.sub}
                                                </span>
                                            </div>
                                        </Label>
                                    );
                                })}
                            </RadioGroup>
                            <Separator />

                            {/* Topping groups — 2 col on mobile, 3 on sm+ */}
                            <div className="space-y-5 px-4 pb-10">
                                {groups.map((group, gi) => (
                                    <div key={group.label}>
                                        <div className="mb-2 flex items-baseline justify-between">
                                            <span className="text-sm font-semibold text-white">
                                                {group.label}
                                            </span>
                                            <span className="text-[10px] text-zinc-500">
                                                {group.surcharge}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {group.items.map((topping, ti) => (
                                                <ToppingCard
                                                    key={topping.name}
                                                    topping={topping}
                                                    onInc={() => handleInc(gi, ti)}
                                                    onDec={() => handleDec(gi, ti)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Fixed Footer */}
                    <div className="border-t border-zinc-800 bg-zinc-900/95 px-4 py-3 backdrop-blur">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1.5">
                                <button
                                    onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                                    className="flex h-5 w-5 items-center justify-center text-base text-white transition-colors hover:text-secondary/90"
                                >
                                    −
                                </button>
                                <span className="w-4 text-center text-sm font-bold text-white">
                                    {cartQty}
                                </span>
                                <button
                                    onClick={() => setCartQty((q) => q + 1)}
                                    className="flex h-5 w-5 items-center justify-center text-base text-white transition-colors hover:text-secondary/90"
                                >
                                    +
                                </button>
                            </div>
                            <DialogClose asChild>

                                <button className="flex flex-1 items-center justify-between rounded-full bg-secondary px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-secondary/90 active:scale-95">
                                    <span>Add to cart</span>
                                    <span>{total.toLocaleString()} ISK.</span>
                                </button>
                            </DialogClose>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}