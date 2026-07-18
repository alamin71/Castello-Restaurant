import type { Product } from "@/types/product.types";

export interface SizeOption {
    label: string;
    price: number;
    originalPrice?: number;
}

export interface PizzaItem {
    title: string;
    description: string;
    badge?: string;
    sizes: SizeOption[];
    image?: string;
    toppings?: string[];
}

export interface Topping {
    name: string;
    price: number;
    qty: number;
}

export interface ToppingGroup {
    label: string;
    surcharge: string;
    items: Topping[];
}

// Shared topping catalog every pizza (and half & half combo) picks its preset from.
export const TOPPING_GROUPS: ToppingGroup[] = [
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
    {
        label: "Vegetables",
        surcharge: "+560 ISK. per item",
        items: [
            { name: "Red Onion", price: 560, qty: 0 },
            { name: "Pineapple", price: 560, qty: 0 },
            { name: "Dates", price: 560, qty: 0 },
            { name: "Mushrooms", price: 560, qty: 0 },
            { name: "Garlic", price: 560, qty: 0 },
            { name: "Bananas", price: 560, qty: 0 },
            { name: "Jalapeno", price: 560, qty: 0 },
            { name: "Rock Lettuce", price: 560, qty: 0 },
            { name: "Sun - Dried Tomatos", price: 560, qty: 0 },
            { name: "Corn", price: 560, qty: 0 },
            { name: "Artichoke", price: 560, qty: 0 },
            { name: "Onion", price: 560, qty: 0 },
            { name: "Broccoli", price: 560, qty: 0 },
            { name: "Tomatoes", price: 560, qty: 0 },
        ],
    },
    {
        label: "Spices & Sauces",
        surcharge: "+560 ISK. per item",
        items: [
            { name: "Sauce", price: 560, qty: 0 },
            { name: "Garlic Sauce", price: 560, qty: 0 },
            { name: "Garlic Salt", price: 560, qty: 0 },
            { name: "Jam", price: 560, qty: 0 },
            { name: "Chili Flakes", price: 560, qty: 0 },
            { name: "Green Peppercorns", price: 560, qty: 0 },
            { name: "Garlic Papers", price: 560, qty: 0 },
            { name: "Oregano", price: 560, qty: 0 },
            { name: "Basil", price: 560, qty: 0 },
        ],
    },
];

// Base starting point for the "Make Your Own Pizza" quick-action — admin-configurable in the future.
export const MAKE_YOUR_OWN_PIZZA: PizzaItem = {
    title: "Make Your Own Pizza",
    description: "Here you can choose from all the toppings we offer and make your own pizza.",
    sizes: [{ label: "15in", price: 5990 }, { label: "12in", price: 4850 }, { label: "9in", price: 3990 }],
    toppings: ["Cheese", "Sauce"],
};

// Maps a real API product (single or variant priced) into the shape the menu UI already
// knows how to render. Toppings are matched by name against TOPPING_GROUPS as a stand-in
// until the real topping-categories/items API is wired in.
export function productToPizzaItem(product: Product): PizzaItem {
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
        toppings: product.defaultToppingItemIds.map((t) => t.name),
    };
}
