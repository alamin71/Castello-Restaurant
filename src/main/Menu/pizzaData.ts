import type { Product } from "@/types/product.types";

export interface SizeOption {
    label: string;
    price: number;
    originalPrice?: number;
}

// A topping that comes pre-selected with a product, keyed by its real backend id so it can
// be matched exactly against the real topping-items catalog (no name-matching guesswork).
export interface DefaultToppingSelection {
    toppingItemId: string;
    price: number;
}

export interface PizzaItem {
    title: string;
    description: string;
    badge?: string;
    sizes: SizeOption[];
    image?: string;
    gallery?: string[];
    // Real topping-category ids this product supports. `undefined` means "show every
    // topping category" (used by the "Make Your Own Pizza" quick-action); an empty array
    // means this product has no toppings at all (e.g. drinks).
    toppingCategoryIds?: string[];
    defaultToppings?: DefaultToppingSelection[];
}

export interface Topping {
    name: string;
    price: number;
    qty: number;
    // Whether this topping came pre-selected with the product (vs added by the customer).
    isDefault?: boolean;
}

export interface ToppingGroup {
    label: string;
    items: Topping[];
}

// Base starting point for the "Make Your Own Pizza" quick-action — admin-configurable in the future.
export const MAKE_YOUR_OWN_PIZZA: PizzaItem = {
    title: "Make Your Own Pizza",
    description: "Here you can choose from all the toppings we offer and make your own pizza.",
    sizes: [{ label: "15in", price: 5990 }, { label: "12in", price: 4850 }, { label: "9in", price: 3990 }],
};

// Maps a real API product (single or variant priced) into the shape the menu UI already
// knows how to render.
export function productToMenuItem(product: Product): PizzaItem {
    const sizes: SizeOption[] =
        product.type === "variant" && product.variants.length > 0
            ? product.variants.map((v) => ({
                label: v.variantItemId.name,
                price: v.price,
            }))
            : [{ label: "Regular", price: product.price ?? 0 }];

    return {
        title: product.name,
        description: product.description,
        sizes,
        image: product.mainImage,
        gallery: product.gallery,
        toppingCategoryIds: product.toppingCategoryIds.map((c) => c.toppingCategoryId),
        defaultToppings: product.defaultToppingItemIds.map((t) => ({
            toppingItemId: t.toppingItemId,
            price: t.price,
        })),
    };
}
