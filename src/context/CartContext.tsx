"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
}

interface CartContextType {
    cartItems: CartItem[];
    itemCount: number;
    addToCart: (item: Omit<CartItem, "id">) => void;
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, "id">) => {
        setCartItems((prev) => [
            ...prev,
            { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` },
        ]);
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, itemCount, addToCart, updateQuantity, removeItem }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
