"use client";

import { isValidElement, useState, type ReactNode } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ArrowLeft, ChevronRight, Pencil } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useOffer } from "@/hooks/queries/useOffer";
import { useProducts } from "@/hooks/queries/useProducts";
import { useCategories } from "@/hooks/queries/useCategories";
import { useToppingCategories } from "@/hooks/queries/useToppingCategories";
import { useToppingItems } from "@/hooks/queries/useToppingItems";
import { buildGroups, ToppingGroupSection, toppingsTotal } from "./toppingUtils";
import type { ToppingGroup } from "./pizzaData";
import type {
    OfferItemDetail,
    OfferItemProductRef,
    OfferItemVariantRef,
} from "@/types/offerDetail.types";
import type { ToppingCategory } from "@/types/toppingCategory.types";
import type { ToppingItem } from "@/types/toppingItem.types";
import type { Product } from "@/types/product.types";

const FALLBACK_IMAGE = "/assets/pizza.png";

interface SlotSelection {
    product: OfferItemProductRef;
    variant: OfferItemVariantRef | null;
    groups: ToppingGroup[];
}

// A slot only needs an explicit customer choice when there's more than one product option,
// or the default product itself offers more than one variant.
function slotRequiresChoice(item: OfferItemDetail): boolean {
    const first = item.products[0];
    return item.products.length > 1 || (first?.variantItemIds.length ?? 0) > 1;
}

function buildSlotGroups(
    productRef: OfferItemProductRef,
    products: Product[],
    toppingCategories: ToppingCategory[],
    toppingItems: ToppingItem[]
): ToppingGroup[] {
    const real = products.find((p) => p._id === productRef._id);
    if (!real) return [];
    return buildGroups(
        {
            toppingCategoryIds: real.toppingCategoryIds.map((c) => c.toppingCategoryId),
            defaultToppings: real.defaultToppingItemIds.map((t) => ({
                toppingItemId: t.toppingItemId,
                price: t.price,
            })),
        },
        toppingCategories,
        toppingItems
    );
}

// Inline "− Bacon, Chicken, 2 × Ham, +2 × Sauce" style summary of a slot's topping picks —
// only toppings that are either default or were added show up.
function ToppingSummaryLine({ groups }: { groups: ToppingGroup[] }) {
    const chips = groups.flatMap((g) => g.items.filter((t) => t.isDefault || t.qty > 0));
    if (chips.length === 0) return null;

    const extraQty = groups.reduce(
        (sum, g) => sum + g.items.reduce((s, t) => s + (t.isDefault ? Math.max(0, t.qty - 1) : t.qty), 0),
        0
    );
    const extraPrice = toppingsTotal(groups);

    return (
        <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
                {chips.map((t) => {
                    const removed = t.isDefault && t.qty === 0;
                    const extra = t.isDefault ? t.qty - 1 : t.qty;
                    return (
                        <span
                            key={t.name}
                            className={removed ? "text-red-500" : extra > 0 ? "text-secondary" : "text-zinc-400"}
                        >
                            {removed ? `− ${t.name}` : extra > 0 ? `${t.qty} × ${t.name}` : t.name}
                        </span>
                    );
                })}
            </div>
            {extraQty > 0 && (
                <p className="mt-1 text-xs text-zinc-500">
                    +{extraQty} toppings · +{extraPrice.toLocaleString()} kr.
                </p>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OfferAddCartDialog({
    offerId,
    trigger,
}: {
    offerId: string;
    trigger?: ReactNode;
}) {
    const { addToCart } = useCart();
    const [open, setOpen] = useState(false);
    const { data: offer } = useOffer(open ? offerId : undefined);
    const { data: products } = useProducts();
    const { data: categories } = useCategories();
    const { data: toppingCategories } = useToppingCategories();
    const { data: toppingItems } = useToppingItems();

    const [cartQty, setCartQty] = useState(1);
    const [explicitSelections, setExplicitSelections] = useState<Record<number, SlotSelection>>({});
    const [activeSlot, setActiveSlot] = useState<number | null>(null);
    const [draft, setDraft] = useState<{ productIndex: number; variantIndex: number; groups: ToppingGroup[] } | null>(
        null
    );

    const handleOpenChange = (next: boolean) => {
        if (next) {
            setCartQty(1);
            setExplicitSelections({});
            setActiveSlot(null);
            setDraft(null);
        }
        setOpen(next);
    };

    const slotGroupsFor = (productRef: OfferItemProductRef) =>
        buildSlotGroups(productRef, products ?? [], toppingCategories ?? [], toppingItems ?? []);

    // A slot the customer hasn't touched yet resolves to its default product/variant unless it
    // genuinely requires a choice — computed fresh at render time so it always reflects the
    // latest catalog data (no effect needed to keep it in sync).
    const getSlotSelection = (item: OfferItemDetail, index: number): SlotSelection | null => {
        if (explicitSelections[index]) return explicitSelections[index];
        if (slotRequiresChoice(item)) return null;
        const first = item.products[0];
        if (!first) return null;
        return {
            product: first.productId,
            variant: first.variantItemIds[0] ?? null,
            groups: slotGroupsFor(first.productId),
        };
    };

    const slotSelections = offer?.offerItems.map(getSlotSelection) ?? [];
    const toppingsSum = slotSelections.reduce((sum, sel) => sum + (sel ? toppingsTotal(sel.groups) : 0), 0);
    const total = ((offer?.price ?? 0) + toppingsSum) * cartQty;
    const canAddToCart = !!offer && slotSelections.every((sel) => sel !== null);

    const openSlot = (index: number) => {
        if (!offer) return;
        const item = offer.offerItems[index];
        const current = getSlotSelection(item, index);
        const productIndex = current
            ? item.products.findIndex((p) => p.productId._id === current.product._id)
            : 0;
        const resolvedProductIndex = productIndex === -1 ? 0 : productIndex;
        const productOption = item.products[resolvedProductIndex];
        const variantIndex = current?.variant
            ? productOption.variantItemIds.findIndex((v) => v._id === current.variant?._id)
            : 0;

        setDraft({
            productIndex: resolvedProductIndex,
            variantIndex: variantIndex === -1 ? 0 : variantIndex,
            groups: current?.groups ?? slotGroupsFor(productOption.productId),
        });
        setActiveSlot(index);
    };

    const closeSlot = () => {
        setActiveSlot(null);
        setDraft(null);
    };

    const selectDraftProduct = (productIndex: number) => {
        if (activeSlot === null || !offer) return;
        const productOption = offer.offerItems[activeSlot].products[productIndex];
        setDraft({
            productIndex,
            variantIndex: 0,
            groups: slotGroupsFor(productOption.productId),
        });
    };

    const updateDraftQty = (gi: number, ti: number, delta: number) => {
        setDraft((prev) =>
            prev
                ? {
                    ...prev,
                    groups: prev.groups.map((g, i) =>
                        i !== gi
                            ? g
                            : {
                                ...g,
                                items: g.items.map((t, j) =>
                                    j !== ti ? t : { ...t, qty: Math.max(0, t.qty + delta) }
                                ),
                            }
                    ),
                }
                : prev
        );
    };

    const removeDraftTopping = (gi: number, ti: number) => {
        setDraft((prev) =>
            prev
                ? {
                    ...prev,
                    groups: prev.groups.map((g, i) =>
                        i !== gi ? g : { ...g, items: g.items.map((t, j) => (j !== ti ? t : { ...t, qty: 0 })) }
                    ),
                }
                : prev
        );
    };

    const resetDraftToppings = () => {
        if (activeSlot === null || !offer || !draft) return;
        const productOption = offer.offerItems[activeSlot].products[draft.productIndex];
        setDraft((prev) => (prev ? { ...prev, groups: slotGroupsFor(productOption.productId) } : prev));
    };

    const confirmSlot = () => {
        if (activeSlot === null || !draft || !offer) return;
        const productOption = offer.offerItems[activeSlot].products[draft.productIndex];
        setExplicitSelections((prev) => ({
            ...prev,
            [activeSlot]: {
                product: productOption.productId,
                variant: productOption.variantItemIds[draft.variantIndex] ?? null,
                groups: draft.groups,
            },
        }));
        closeSlot();
    };

    const handleAddToCart = () => {
        if (!offer || !canAddToCart) return;
        const parts = offer.offerItems.map((item, i) => {
            const sel = getSlotSelection(item, i);
            return sel ? `${sel.product.name}${sel.variant ? ` (${sel.variant.name})` : ""}` : "";
        });

        addToCart({
            name: offer.title,
            description: parts.filter(Boolean).join(", "),
            image: offer.mainImage,
            quantity: cartQty,
            price: offer.price + toppingsSum,
        });

        toast.success(`${offer.title} added to cart!`);
    };

    const activeItem = activeSlot !== null ? offer?.offerItems[activeSlot] : undefined;
    const activeProductOption = activeItem && draft ? activeItem.products[draft.productIndex] : undefined;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger && isValidElement(trigger) ? (
                    trigger
                ) : (
                    <button className="w-full h-10 flex items-center justify-center rounded-full bg-[#222222] text-white text-sm font-semibold hover:bg-[#2c2c2c] active:scale-95 transition-all cursor-pointer">
                        Add to Cart
                    </button>
                )}
            </DialogTrigger>
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogContent className="max-h-[92vh] md:w-full w-11/12 max-w-180.25! overflow-hidden border-0 bg-background shadow-md shadow-white/10 p-0 text-white">
                <div className="flex h-[92vh] flex-col">
                    {activeItem && draft && activeProductOption ? (
                        <>
                            {/* Header — per-slot picker */}
                            <div className="flex shrink-0 items-center gap-3 border-b border-zinc-800 px-4 py-3 sm:px-6">
                                <button
                                    onClick={closeSlot}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                                <div>
                                    <p className="text-sm font-bold text-white">Choose {activeItem.categoryId.name}</p>
                                    <p className="text-xs text-zinc-500">
                                        Choose one{draft.groups.length > 0 ? ", you can also customize toppings" : ""}
                                    </p>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 min-h-0">
                                <div>
                                    {/* Product carousel */}
                                    <div className="flex gap-3 overflow-x-auto px-4 py-4 sm:px-6">
                                        {activeItem.products.map((p, pi) => (
                                            <button
                                                key={p.productId._id}
                                                onClick={() => selectDraftProduct(pi)}
                                                className={`flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl border p-2 text-center transition-all cursor-pointer ${pi === draft.productIndex
                                                    ? "border-secondary"
                                                    : "border-white/15 hover:border-white/30"
                                                    }`}
                                            >
                                                <div
                                                    className="relative h-16 w-16 overflow-hidden rounded-xl bg-cover bg-center"
                                                    style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                                >
                                                    <Image
                                                        src={p.productId.mainImage || FALLBACK_IMAGE}
                                                        alt={p.productId.name}
                                                        fill
                                                        className="object-contain p-1.5"
                                                    />
                                                </div>
                                                <p className="line-clamp-2 text-xs font-semibold text-white">
                                                    {p.productId.name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Variants */}
                                    {activeProductOption.variantItemIds.length > 0 && (
                                        <>
                                            <div className="px-4 pt-2 sm:px-6">
                                                <h3 className="text-sm font-semibold text-white">Variants</h3>
                                                <p className="text-xs text-zinc-500">Select a variant</p>
                                            </div>
                                            <RadioGroup
                                                value={draft.variantIndex.toString()}
                                                onValueChange={(value) =>
                                                    setDraft((prev) => (prev ? { ...prev, variantIndex: Number(value) } : prev))
                                                }
                                                className="grid grid-cols-2 gap-2 px-4 pb-4 pt-3 sm:grid-cols-3 sm:px-6 sm:pb-6"
                                            >
                                                {activeProductOption.variantItemIds.map((v, vi) => {
                                                    const active = draft.variantIndex === vi;
                                                    return (
                                                        <Label
                                                            key={v._id}
                                                            htmlFor={`variant-${vi}`}
                                                            className={`flex cursor-pointer items-center justify-center rounded-full border p-3 text-center text-sm font-semibold transition-all ${active
                                                                ? "border-secondary bg-white/3 text-white"
                                                                : "border-white/15 text-zinc-300 hover:border-white/30"
                                                                }`}
                                                        >
                                                            <RadioGroupItem
                                                                value={vi.toString()}
                                                                id={`variant-${vi}`}
                                                                className="sr-only"
                                                            />
                                                            {v.name}
                                                        </Label>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </>
                                    )}

                                    {/* Toppings */}
                                    {draft.groups.length > 0 && (
                                        <>
                                            <Separator />
                                            <div className="flex items-start justify-between px-4 pt-3 sm:px-6">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-white">Toppings</h3>
                                                    <p className="text-xs text-zinc-500">You can customize toppings</p>
                                                </div>
                                                <button
                                                    onClick={resetDraftToppings}
                                                    className="cursor-pointer text-xs font-semibold text-secondary hover:underline"
                                                >
                                                    Reset Toppings
                                                </button>
                                            </div>
                                            <div className="space-y-5 px-4 pt-4 pb-10 sm:px-6">
                                                {draft.groups.map((group, gi) => (
                                                    <ToppingGroupSection
                                                        key={group.label}
                                                        group={group}
                                                        onInc={(ti) => updateDraftQty(gi, ti, 1)}
                                                        onDec={(ti) => updateDraftQty(gi, ti, -1)}
                                                        onRemove={(ti) => removeDraftTopping(gi, ti)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="border-t border-zinc-800 bg-zinc-900/95 px-3 py-3 backdrop-blur sm:px-6">
                                <button
                                    onClick={confirmSlot}
                                    className="flex h-11 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-zinc-800 px-4 text-sm font-bold text-white transition-all hover:bg-zinc-700 active:scale-95"
                                >
                                    Add to list
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Header — offer overview */}
                            <div className="shrink-0 border-b border-zinc-800 py-3 pl-4 pr-12 text-left sm:pl-6 sm:pr-14">
                                <h2 className="text-lg font-bold tracking-tight text-white">{offer?.title ?? ""}</h2>
                                <p className="mt-0.5 text-xs text-zinc-500">{offer?.description ?? ""}</p>
                            </div>

                            <ScrollArea className="flex-1 min-h-0">
                                <div>
                                    <div
                                        className="relative flex h-64 w-full items-center justify-center bg-cover bg-center sm:h-72"
                                        style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                    >
                                        {offer && (
                                            <Image
                                                src={offer.mainImage}
                                                alt={offer.title}
                                                width={280}
                                                height={280}
                                                className="object-contain py-6"
                                            />
                                        )}
                                    </div>

                                    <div className="px-4 pt-4 sm:px-6">
                                        <h3 className="text-sm font-semibold text-white">Offer Items</h3>
                                    </div>

                                    <div className="space-y-3 px-4 py-4 sm:px-6">
                                        {offer?.offerItems.map((item, i) => {
                                            const sel = getSlotSelection(item, i);
                                            const customizable = slotRequiresChoice(item) || (sel?.groups.length ?? 0) > 0;
                                            const category = (categories ?? []).find(
                                                (c) => c.categoryId === item.categoryId.categoryId
                                            );

                                            if (!customizable) {
                                                return (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3"
                                                    >
                                                        <div
                                                            className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
                                                            style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                                        >
                                                            <Image
                                                                src={sel?.product.mainImage || category?.image || FALLBACK_IMAGE}
                                                                alt={sel?.product.name ?? item.categoryId.name}
                                                                fill
                                                                className="object-contain p-1"
                                                            />
                                                        </div>
                                                        <p className="text-sm font-semibold text-white">
                                                            {sel?.product.name ?? item.categoryId.name}
                                                            {sel?.variant ? ` - ${sel.variant.name}` : ""}
                                                        </p>
                                                    </div>
                                                );
                                            }

                                            if (!sel) {
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => openSlot(i)}
                                                        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/15 px-4 py-3 text-left hover:border-white/30"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
                                                                style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                                            >
                                                                <Image
                                                                    src={category?.image ?? FALLBACK_IMAGE}
                                                                    alt={item.categoryId.name}
                                                                    fill
                                                                    className="object-contain p-1.5"
                                                                />
                                                            </div>
                                                            <p className="text-sm font-semibold text-white">
                                                                {item.categoryId.name}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                                                    </button>
                                                );
                                            }

                                            return (
                                                <div key={i} className="rounded-2xl border border-white/15">
                                                    <div className="flex items-center justify-between px-4 py-3">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div
                                                                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
                                                                style={{ backgroundImage: `url(/assets/FoodCardBg.png)` }}
                                                            >
                                                                <Image
                                                                    src={sel.product.mainImage || FALLBACK_IMAGE}
                                                                    alt={sel.product.name}
                                                                    fill
                                                                    className="object-contain p-1"
                                                                />
                                                            </div>
                                                            <p className="truncate text-sm font-semibold text-white">
                                                                {sel.product.name}
                                                                {sel.variant ? ` / ${sel.variant.name}` : ""}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => openSlot(i)}
                                                            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:border-white/30"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" />
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <ToppingSummaryLine groups={sel.groups} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </ScrollArea>

                            {/* Fixed Footer */}
                            <div className="border-t border-zinc-800 bg-zinc-900/95 px-3 py-3 backdrop-blur sm:px-6">
                                <div className="flex flex-col gap-2 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-2 sm:gap-3">
                                    <div className="flex items-center gap-1.5 sm:gap-3">
                                        <div className="flex h-11 shrink-0 items-center gap-1 rounded-full bg-zinc-800 px-1 sm:gap-2 sm:px-5">
                                            <button
                                                onClick={() => setCartQty((q) => Math.max(1, q - 1))}
                                                className="flex h-11 w-9 cursor-pointer items-center justify-center text-base text-white transition-colors hover:text-secondary/90 sm:text-lg"
                                            >
                                                −
                                            </button>
                                            <span className="w-4 text-center text-xs font-bold text-white sm:text-sm">
                                                {cartQty}
                                            </span>
                                            <button
                                                onClick={() => setCartQty((q) => q + 1)}
                                                className="flex h-11 w-9 cursor-pointer items-center justify-center text-base text-white transition-colors hover:text-secondary/90 sm:text-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-zinc-800 px-2 text-xs font-bold text-white min-[400px]:flex-none sm:px-8 sm:text-sm lg:px-16">
                                            {total.toLocaleString()} kr.
                                        </span>
                                    </div>

                                    {canAddToCart ? (
                                        <DialogClose asChild>
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex h-11 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-secondary px-2 text-xs font-bold text-white transition-all hover:bg-secondary/90 active:scale-95 min-[400px]:w-auto min-[400px]:flex-1 sm:px-4 sm:text-sm"
                                            >
                                                Add to Cart
                                            </button>
                                        </DialogClose>
                                    ) : (
                                        <button
                                            disabled
                                            className="flex h-11 w-full cursor-not-allowed items-center justify-center whitespace-nowrap rounded-full bg-secondary/40 px-2 text-xs font-bold text-white/60 min-[400px]:w-auto min-[400px]:flex-1 sm:px-4 sm:text-sm"
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
