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

export const PIZZAS: PizzaItem[] = [
    { title: "Hawaiian", description: "Ham, pineapple", sizes: [{ label: "15in", price: 3690 }, { label: "12in", price: 3090 }, { label: "9in", price: 2450 }], toppings: ["Ham", "Pineapple"] },
    { title: "Neapolitan", description: "Pepperoni, mushrooms, ground beef", badge: "20% OFF", sizes: [{ label: "15in", price: 4050, originalPrice: 980 }, { label: "12in", price: 3350, originalPrice: 980 }, { label: "9in", price: 2650, originalPrice: 980 }], toppings: ["Pepperoni", "Mushrooms"] },
    { title: "Pacific", description: "Shrimp, Onion, Chili Flakes, Garlic, Pineapple, Oregano", sizes: [{ label: "15in", price: 4690 }, { label: "12in", price: 3750 }, { label: "9in", price: 3050 }], toppings: ["Shrimp", "Onion", "Chili Flakes", "Garlic", "Pineapple", "Oregano"] },
    { title: "The Fresh Veggie", description: "Tomato, Basil, Parsley, Feta, Olive", sizes: [{ label: "15in", price: 3900 }, { label: "12in", price: 3200 }, { label: "9in", price: 2500 }], toppings: ["Tomatoes", "Basil"] },
    { title: "Mexican", description: "Cream Cheese, Chicken, Onion, Corn, Garlic Salt, Garlic Papers", sizes: [{ label: "15in", price: 4790 }, { label: "12in", price: 3850 }, { label: "9in", price: 3180 }], toppings: ["Cream Cheese", "Chicken", "Onion", "Corn", "Garlic Salt", "Garlic Papers"] },
    { title: "Classic", description: "Pepperoni, Ham, Mushrooms, Onion", sizes: [{ label: "15in", price: 4690 }, { label: "12in", price: 3750 }, { label: "9in", price: 3050 }], toppings: ["Pepperoni", "Ham", "Mushrooms", "Onion"] },
    { title: "The Rosa", description: "Pepperoni, Parma, Basil, Sundried tomato", sizes: [{ label: "15in", price: 4100 }, { label: "12in", price: 3400 }, { label: "9in", price: 2700 }], toppings: ["Pepperoni", "Parma Ham", "Basil", "Sun - Dried Tomatos"] },
    { title: "Cheese Pizza", description: "Camembert, Parmesan, Cream Cheese, Blue Cheese", sizes: [{ label: "15in", price: 4790 }, { label: "12in", price: 3850 }, { label: "9in", price: 3180 }], toppings: ["Camembert", "Parmesan", "Cream Cheese", "Blue Cheese"] },
    { title: "Florence", description: "Pepperoni, Onion, Tomatoes, Basil, Cream Cheese, Dates", sizes: [{ label: "15in", price: 4950 }, { label: "12in", price: 3950 }, { label: "9in", price: 3290 }], toppings: ["Pepperoni", "Onion", "Tomatoes", "Basil", "Cream Cheese", "Dates"] },
    { title: "The Rose", description: "Ham, Cheese, Bacon, Pineapple, Sauce", sizes: [{ label: "15in", price: 4690 }, { label: "12in", price: 3750 }, { label: "9in", price: 3050 }], toppings: ["Ham", "Cheese", "Bacon", "Pineapple", "Sauce"] },
    { title: "Kebab pizza with chicken", description: "Chicken, Onion, Garlic Sauce", sizes: [{ label: "15in", price: 4950 }, { label: "12in", price: 3950 }, { label: "9in", price: 3290 }], toppings: ["Chicken", "Onion", "Garlic Sauce"] },
];
