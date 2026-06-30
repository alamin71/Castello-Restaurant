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
}

export const PIZZAS: PizzaItem[] = [
    { title: "Hawaiian", description: "Ham, pineapple", sizes: [{ label: "15in", price: 3690 }, { label: "12in", price: 3090 }, { label: "9in", price: 2450 }] },
    { title: "Neapolitan", description: "Pepperoni, mushrooms, ground beef", badge: "20% OFF", sizes: [{ label: "15in", price: 4050, originalPrice: 980 }, { label: "12in", price: 3350, originalPrice: 980 }, { label: "9in", price: 2650, originalPrice: 980 }] },
    { title: "Pacific", description: "Shrimp, Chili flakes, Paprika, Pea", sizes: [{ label: "15in", price: 4300 }, { label: "12in", price: 3600 }, { label: "9in", price: 2850 }] },
    { title: "The Fresh Veggie", description: "Tomato, Basil, Parsley, Feta, Olive", sizes: [{ label: "15in", price: 3900 }, { label: "12in", price: 3200 }, { label: "9in", price: 2500 }] },
    { title: "Mexican", description: "Jalapeno, Beef, Tomato, Red onion", sizes: [{ label: "15in", price: 4780 }, { label: "12in", price: 3900 }, { label: "9in", price: 3080 }] },
    { title: "Classic", description: "Pepperoni, Cheese, Tomato sauce", sizes: [{ label: "15in", price: 4050 }, { label: "12in", price: 3750 }, { label: "9in", price: 3080 }] },
    { title: "The Rosa", description: "Pepperoni, Parma, Basil, Sundried tomato", sizes: [{ label: "15in", price: 4100 }, { label: "12in", price: 3400 }, { label: "9in", price: 2700 }] },
    { title: "Cheese Pizza", description: "Mozzarella, Cheddar, Parmesan, Cream cheese", sizes: [{ label: "15in", price: 3900 }, { label: "12in", price: 3350 }, { label: "9in", price: 2650 }] },
];
