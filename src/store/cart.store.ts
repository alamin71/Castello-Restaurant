import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ToppingGroup } from "@/main/Menu/pizzaData";

// One product bundled inside an offer's cart line — has its own toppings (if any) but no
// separate price/qty of its own, since the whole offer is billed and quantified as one item.
export interface CartBundleSubItem {
    name: string;
    variantLabel?: string;
    image: string;
    toppingGroups?: ToppingGroup[];
}

export interface CartItem {
    id: string;
    name: string;
    variantLabel?: string;
    image: string;
    quantity: number;
    price: number;
    toppingGroups?: ToppingGroup[];
    bundleItems?: CartBundleSubItem[];
    // Plain-text fallback for cases with no structured topping/bundle data (e.g. half & half).
    description?: string;
}

interface CartState {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, "id">) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartItems: [],

            addToCart: (item) =>
                set((state) => ({
                    cartItems: [
                        ...state.cartItems,
                        { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` },
                    ],
                })),

            updateQuantity: (id, delta) =>
                set((state) => ({
                    cartItems: state.cartItems
                        .map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity + delta } : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            removeItem: (id) =>
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== id),
                })),
        }),
        { name: "castello-cart" }
    )
);
