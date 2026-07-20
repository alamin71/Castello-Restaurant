import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    id: string;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
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
