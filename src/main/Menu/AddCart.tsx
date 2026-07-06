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
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PIZZAS, TOPPING_GROUPS, type PizzaItem, type Topping, type ToppingGroup } from "./pizzaData";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CRUSTS = [
    { label: "Classic" },
    { label: "Thin" },
    { label: "Thick" },
    { label: "Stuffed" },
    { label: "Gluten-Free" },
];

const FALLBACK_IMAGE = "/assets/pizza.png";

const formatSizeLabel = (label: string) => label.replace(/in$/i, "″");

function buildGroups(preset?: string[]): ToppingGroup[] {
    const selected = new Set(preset ?? []);
    return TOPPING_GROUPS.map((group) => ({
        ...group,
        items: group.items.map((item) => ({
            ...item,
            qty: selected.has(item.name) ? 1 : 0,
        })),
    }));
}

const toppingsTotal = (groups: ToppingGroup[]) =>
    groups.reduce(
        (sum, g) => sum + g.items.reduce((s, t) => s + t.price * t.qty, 0),
        0
    );

interface HalfState {
    pizza: PizzaItem;
    groups: ToppingGroup[];
}

type HalfSlot = "first" | "second";

function makeHalf(pizza: PizzaItem): HalfState {
    return { pizza, groups: buildGroups(pizza.toppings) };
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function HalfCircleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
    );
}

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
                className="flex h-8 w-8 items-center justify-center rounded text-lg text-white transition-colors hover:bg-zinc-600"
            >
                −
            </button>

            {qty > 0 && (
                <span className="w-4 text-center text-xs text-white">{qty}</span>
            )}

            <button
                onClick={onInc}
                className="flex h-8 w-8 items-center justify-center rounded text-lg text-white transition-colors hover:bg-secondary"
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

function PizzaPickerRow({
    pizza,
    onSelect,
}: {
    pizza: PizzaItem;
    onSelect: () => void;
}) {
    return (
        <div className="flex items-stretch gap-2 rounded-2xl border border-white/10 p-2 sm:gap-4 sm:p-3">
            <div
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cover bg-center sm:h-36 sm:w-36 lg:h-52 lg:w-52"
                style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
            >
                <Image
                    src={pizza.image ?? FALLBACK_IMAGE}
                    alt={pizza.title}
                    fill
                    className="object-contain p-2"
                />
            </div>
            <div className="w-px self-stretch bg-white/10" />
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2 px-1 text-center min-w-0 sm:gap-4 sm:py-4 sm:px-2">
                <div>
                    <p className="text-sm font-bold text-white sm:text-lg">{pizza.title}</p>
                    <p className="text-xs text-zinc-500 line-clamp-1">
                        {pizza.description}
                    </p>
                </div>
                <div className="flex justify-center gap-2 sm:gap-4">
                    {pizza.sizes.map((s) => (
                        <div key={s.label} className="text-xs text-zinc-400 sm:text-sm">
                            <div>{formatSizeLabel(s.label)}</div>
                            <div className="text-sm font-bold text-white sm:text-base">
                                {s.price.toLocaleString()} kr.
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onSelect}
                    className="w-full cursor-pointer rounded-full bg-zinc-800 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 sm:py-2 sm:text-base"
                >
                    Select this one
                </button>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddCartDialog({
    pizza,
    allowHalfHalf = false,
    variant = "icon",
}: {
    pizza: PizzaItem;
    allowHalfHalf?: boolean;
    variant?: "icon" | "full";
}) {
    const { isLoggedIn, openLoginModal } = useAuth();
    const [open, setOpen] = useState(false);

    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedCrust, setSelectedCrust] = useState(0);
    const [cartQty, setCartQty] = useState(1);

    const [mode, setMode] = useState<"single" | "half">("single");
    const [activeHalf, setActiveHalf] = useState<HalfSlot>("first");
    const [half1, setHalf1] = useState<HalfState>(() => makeHalf(pizza));
    const [half2, setHalf2] = useState<HalfState | null>(null);
    const [pickerFor, setPickerFor] = useState<HalfSlot | null>(null);

    const handleOpenChange = (next: boolean) => {
        if (next) {
            setMode("single");
            setActiveHalf("first");
            setHalf1(makeHalf(pizza));
            setHalf2(null);
            setPickerFor(null);
            setSelectedSize(0);
            setCartQty(1);
        }
        setOpen(next);
    };

    const toggleHalfHalf = () => {
        setMode((m) => (m === "single" ? "half" : "single"));
        setActiveHalf("first");
    };

    const selectTab = (tab: HalfSlot) => {
        if (tab === "second" && !half2) {
            setPickerFor("second");
            return;
        }
        setActiveHalf(tab);
    };

    const handleSelectPizza = (chosen: PizzaItem) => {
        if (!pickerFor) return;
        const half = makeHalf(chosen);
        if (pickerFor === "first") setHalf1(half);
        else setHalf2(half);
        setActiveHalf(pickerFor);
        setPickerFor(null);
    };

    const editTarget: HalfSlot = mode === "single" ? "first" : activeHalf;
    const activeState: HalfState = editTarget === "second" && half2 ? half2 : half1;

    const updateQty = (target: HalfSlot, gi: number, ti: number, delta: number) => {
        const updater = (groups: ToppingGroup[]) =>
            groups.map((g, i) =>
                i !== gi
                    ? g
                    : {
                        ...g,
                        items: g.items.map((t, j) =>
                            j !== ti ? t : { ...t, qty: Math.max(0, t.qty + delta) }
                        ),
                    }
            );

        if (target === "first") {
            setHalf1((prev) => ({ ...prev, groups: updater(prev.groups) }));
        } else {
            setHalf2((prev) => (prev ? { ...prev, groups: updater(prev.groups) } : prev));
        }
    };

    const half1Price = half1.pizza.sizes[selectedSize]?.price ?? 0;
    const half2Price = half2?.pizza.sizes[selectedSize]?.price ?? 0;

    const basePrice =
        mode === "single"
            ? half1Price
            : half2
                ? Math.round((half1Price + half2Price) / 2)
                : half1Price;

    const toppingsSum =
        mode === "single"
            ? toppingsTotal(half1.groups)
            : toppingsTotal(half1.groups) + (half2 ? toppingsTotal(half2.groups) : 0);

    const total = (basePrice + toppingsSum) * cartQty;

    const canAddToCart = !pickerFor && !(mode === "half" && !half2);

    const titlePizza = mode === "half" ? null : half1.pizza;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {variant === "full" ? (
                    <button
                        className="w-full h-10 flex items-center justify-center rounded-full bg-secondary text-white text-sm font-semibold hover:bg-secondary/90 active:scale-95 transition-all cursor-pointer"
                        onClick={(e) => { if (!isLoggedIn) { e.preventDefault(); openLoginModal(); } }}
                    >
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
            <DialogContent className="max-h-[92vh] md:w-full w-11/12 max-w-180.25! overflow-hidden border-0 bg-background shadow-md shadow-white/10 p-0 text-white">
                <div className="flex h-[92vh] flex-col ">

                    {/* Header */}
                    {pickerFor ? (
                        <div className="flex shrink-0 items-center gap-3 border-b border-zinc-800 px-6 py-3">
                            <button
                                onClick={() => setPickerFor(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/10"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <p className="text-sm font-bold text-white">
                                    {pickerFor === "first" ? "1st Half" : "2nd Half"}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Choose one pizza for {pickerFor === "first" ? "1st" : "2nd"} half
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="shrink-0 border-b border-zinc-800 py-3 pl-6 pr-14 text-left">
                            <h2 className="text-lg font-bold tracking-tight text-white">
                                {titlePizza ? titlePizza.title : "Half & Half Pizza"}
                            </h2>
                            <p className="mt-0.5 text-xs text-zinc-500">
                                {titlePizza ? titlePizza.description : "Two cravings, One pizza"}
                            </p>
                        </div>
                    )}

                    {pickerFor ? (
                        <ScrollArea className="flex-1 min-h-0">
                            <div className="space-y-3 px-6 py-4">
                                {PIZZAS.map((p) => (
                                    <PizzaPickerRow
                                        key={p.title}
                                        pizza={p}
                                        onSelect={() => handleSelectPizza(p)}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <ScrollArea className="flex-1 min-h-0">
                            <div>
                                {/* Hero image */}
                                <div
                                    className="relative flex h-56 w-full items-center justify-center bg-cover bg-center"
                                    style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                >
                                    {mode === "single" ? (
                                        <Image
                                            src={half1.pizza.image ?? FALLBACK_IMAGE}
                                            alt={half1.pizza.title}
                                            width={180}
                                            height={180}
                                            className="object-contain py-6"
                                        />
                                    ) : (
                                        <div className="relative h-44 w-44">
                                            <div
                                                className="absolute inset-0"
                                                style={{ clipPath: "inset(0 50% 0 0)" }}
                                            >
                                                <Image
                                                    src={half1.pizza.image ?? FALLBACK_IMAGE}
                                                    alt={half1.pizza.title}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div
                                                className="absolute inset-0"
                                                style={{ clipPath: "inset(0 0 0 50%)" }}
                                            >
                                                {half2 ? (
                                                    <Image
                                                        src={half2.pizza.image ?? FALLBACK_IMAGE}
                                                        alt={half2.pizza.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full rounded-full border-2 border-dashed border-white/20" />
                                                )}
                                            </div>
                                            <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 bg-white/20" />
                                        </div>
                                    )}
                                </div>

                                {/* Crust thumbnails — only relevant outside half & half mode */}
                                {mode === "single" && (
                                    <>
                                        <div className="flex justify-center gap-3 overflow-x-auto px-6 py-2">
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
                                                        src={FALLBACK_IMAGE}
                                                        alt={c.label}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <Separator />
                                    </>
                                )}

                                {/* Half & Half toggle */}
                                {allowHalfHalf && (
                                    <div className="flex justify-center my-6">
                                        <button
                                            onClick={toggleHalfHalf}
                                            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${mode === "half"
                                                ? "border-secondary text-secondary"
                                                : "border-white/20 text-white hover:border-white/40"
                                                }`}
                                        >
                                            <HalfCircleIcon className="h-4 w-4" />
                                            Half & Half
                                        </button>
                                    </div>
                                )}

                                {/* 1st Half / 2nd Half tabs + active-half summary */}
                                {mode === "half" && (
                                    <div className="px-6 pb-6">
                                        <div className="grid grid-cols-2 overflow-hidden rounded-full border border-white/15">
                                            {(["first", "second"] as HalfSlot[]).map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => selectTab(slot)}
                                                    className={`py-2.5 text-sm font-semibold transition-colors ${activeHalf === slot
                                                        ? "bg-white text-black"
                                                        : "text-zinc-400 hover:text-white"
                                                        }`}
                                                >
                                                    {slot === "first" ? "1st Half" : "2nd Half"}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setPickerFor(activeHalf)}
                                            className="mt-6 flex w-full items-center justify-between rounded-2xl border border-white/15 px-4 py-3 text-left hover:border-white/30"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <HalfCircleIcon className="h-5 w-5 shrink-0 text-secondary" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-white">
                                                        {activeState.pizza.title}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 line-clamp-1">
                                                        {activeState.pizza.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                                        </button>
                                    </div>
                                )}

                                {/* Variants */}
                                <div className="px-6 pt-6">
                                    <h3 className="text-sm font-semibold text-white">Variants</h3>
                                </div>
                                <RadioGroup
                                    value={selectedSize.toString()}
                                    onValueChange={(value) => setSelectedSize(Number(value))}
                                    className="px-6 pb-6 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2"
                                >
                                    {half1.pizza.sizes.map((s, i) => {
                                        const active = selectedSize === i;
                                        return (
                                            <Label
                                                key={i}
                                                htmlFor={`size-${i}`}
                                                className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-3xl border p-3 text-center transition-all ${active
                                                    ? "border-secondary bg-white/3"
                                                    : "border-white/15 hover:border-white/30"
                                                    }`}
                                            >
                                                <RadioGroupItem
                                                    value={i.toString()}
                                                    id={`size-${i}`}
                                                    className="sr-only"
                                                />
                                                <span className="text-base font-bold text-white">
                                                    {s.price.toLocaleString()} kr.
                                                    {s.originalPrice && (
                                                        <span className="ml-2 text-sm font-normal text-zinc-500 line-through">
                                                            {s.originalPrice.toLocaleString()} kr.
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-sm text-zinc-400">
                                                    {formatSizeLabel(s.label)}
                                                </span>
                                            </Label>
                                        );
                                    })}
                                </RadioGroup>
                                <Separator />

                                {/* Topping groups for the currently active half */}
                                <div className="px-6 pt-3">
                                    <h3 className="text-sm font-semibold text-white">Toppings</h3>
                                    <p className="text-xs text-zinc-500">You can customize toppings</p>
                                </div>
                                <div className="space-y-5 px-6 pt-4 pb-10">
                                    {activeState.groups.map((group, gi) => (
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
                                                        onInc={() => updateQty(editTarget, gi, ti, 1)}
                                                        onDec={() => updateQty(editTarget, gi, ti, -1)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    )}

                    {/* Fixed Footer */}
                    <div className="border-t border-zinc-800 bg-zinc-900/95 px-3 py-3 backdrop-blur sm:px-6">
                        <div className="flex items-center gap-1.5 sm:gap-3">
                            <div className="flex h-10 shrink-0 items-center gap-1 rounded-full bg-zinc-800 px-2 sm:h-11 sm:gap-2 sm:px-5">
                                <button
                                    onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                                    className="flex h-6 w-6 items-center justify-center text-base text-white transition-colors hover:text-secondary/90 sm:text-lg"
                                >
                                    −
                                </button>
                                <span className="w-4 text-center text-xs font-bold text-white sm:text-sm">
                                    {cartQty}
                                </span>
                                <button
                                    onClick={() => setCartQty((q) => q + 1)}
                                    className="flex h-6 w-6 items-center justify-center text-base text-white transition-colors hover:text-secondary/90 sm:text-lg"
                                >
                                    +
                                </button>
                            </div>

                            <span className="flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-zinc-800 px-2 text-xs font-bold text-white sm:h-11 sm:px-8 sm:text-sm lg:px-16">
                                {total.toLocaleString()} ISK.
                            </span>

                            {canAddToCart ? (
                                <DialogClose asChild>
                                    <button className="flex h-10 min-w-0 flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-secondary px-2 text-xs font-bold text-white transition-all hover:bg-secondary/90 active:scale-95 sm:h-11 sm:px-4 sm:text-sm">
                                        Add to cart
                                    </button>
                                </DialogClose>
                            ) : (
                                <button
                                    disabled
                                    className="flex h-10 min-w-0 flex-1 cursor-not-allowed items-center justify-center whitespace-nowrap rounded-full bg-secondary/40 px-2 text-xs font-bold text-white/60 sm:h-11 sm:px-4 sm:text-sm"
                                >
                                    Add to cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
