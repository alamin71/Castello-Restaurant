import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Cart from "../../../public/icons/cart";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
    price: number;
};

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "Durum Kebab w/chicken",
        description: "Chicken, cabbage, cucumber, tomatoes, red onion",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
    {
        id: 2,
        name: "The front page pizza",
        description: "Pepperoni, Bacon, Paprika, Garlic Sauce, Basil",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
    {
        id: 3,
        name: "Coke",
        description: "2L",
        image: "/assets/pizza.png",
        quantity: 2,
        price: 960,
    },
];

export default function OrderCartSheet() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button aria-label="Open cart">
                    <Cart />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-screen sm:w-105 max-w-full border-none bg-primary p-0 text-white"
            >
                <div className="flex h-full flex-col">

                    {/* Header */}
                    <SheetHeader className="border-b border-zinc-800 px-4 py-4 shrink-0">
                        <SheetTitle className="text-xl sm:text-2xl font-semibold text-white">
                            My Order Cart
                        </SheetTitle>
                    </SheetHeader>

                    {/* Scrollable cart items */}
                    <ScrollArea className="flex-1 min-h-0 p-3">
                        <div className="space-y-3 border border-white/20 rounded-2xl p-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-white/20 p-3"
                                >
                                    {/* Top row: image + name + delete */}
                                    <div className="flex items-start gap-3">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="h-14 w-14 shrink-0 rounded-xl object-cover"
                                            width={56}
                                            height={56}
                                        />

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="text-sm font-semibold text-white leading-tight wrap-break-word">
                                                    {item.name}
                                                </h3>
                                                <Trash2
                                                    className="size-5 text-secondary cursor-pointer"
                                                    onClick={() => removeItem(item.id)}
                                                />
                                            </div>

                                            <p className="mt-0.5 text-xs text-zinc-400 wrap-break-word">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom row: checkbox + qty + price */}
                                    <div className="mt-3 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox className="border-secondary data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-white shrink-0" />

                                            <div className="flex items-center rounded-md border border-white/20">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7 text-white hover:bg-secondary"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-6 text-center text-sm font-medium text-white">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7 text-white hover:bg-secondary"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="text-sm font-semibold text-white">
                                                {item.price * item.quantity} ISK.
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                {item.price} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Footer */}
                    <div className="shrink-0 border-t border-white/20 bg-primary px-4 py-4">
                        <div className="mb-3 flex items-center justify-between text-base sm:text-lg font-semibold text-white">
                            <span>{cartItems.length} Items</span>
                            <span>{subtotal} ISK.</span>
                        </div>
                        <Separator className="mb-4 bg-white/10" />
                        <SheetClose asChild>
                            <Link
                                href="/checkout"
                                className="w-full block py-3 rounded-full bg-secondary text-base tracking-wider font-medium text-white hover:bg-secondary/90 text-center"
                            >
                                Complete this order
                            </Link>
                        </SheetClose>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    );
}