"use client";

import { useCartStore, type CartItem } from "@/store/cart.store";

export type { CartItem };

export function useCart() {
    const cartItems = useCartStore((s) => s.cartItems);
    const addToCart = useCartStore((s) => s.addToCart);
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeItem);

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return { cartItems, itemCount, addToCart, updateQuantity, removeItem };
}
