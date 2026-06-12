"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PizzaIcon from "../../../public/icons/pizza-icon";
import KebabsIcon from "../../../public/icons/kebabs-icon";
import CrispyChickenIcon from "../../../public/icons/crispy-chicken-icon";
import BurgerIcon from "../../../public/icons/burger-icon";
import ChampionshipIcon from "../../../public/icons/championship-icon";
import DessertsIcon from "../../../public/icons/desserts-icon";
import SaucesIcon from "../../../public/icons/sauces-icon";
import DrinksIcon from "../../../public/icons/drinks-icon";
import SpecialOffer from "../Home/SpecialOffer";
import Pizzas from "./Pizza";
interface Category {
    id: string;
    label: string;
    icon: React.ComponentType;
}

const categories: Category[] = [
    { id: "pizzas", label: "Pizzas", icon: PizzaIcon },
    { id: "kebabs", label: "Kebabs", icon: KebabsIcon },
    { id: "crispy-chicken", label: "Crispy Chicken", icon: CrispyChickenIcon },
    { id: "burger", label: "Burger", icon: BurgerIcon },
    { id: "championship", label: "Championship", icon: ChampionshipIcon },
    { id: "desserts", label: "Desserts", icon: DessertsIcon },
    { id: "sauces", label: "Sauces", icon: SaucesIcon },
    { id: "drinks", label: "Drinks", icon: DrinksIcon },
];

const AllMenu = () => {
    const [active, setActive] = useState("pizzas");

    return (
        <section>
            <div className="w-full px-4 my-10">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-4 w-max mx-auto p-2">
                        {categories.map((cat) => {
                            const isActive = active === cat.id;
                            const Icon = cat.icon;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActive(cat.id)}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3",
                                        "px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                        isActive
                                            ? "text-secondary bg-primary"
                                            : "text-white hover:text-white/80"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "transition-transform duration-200",
                                            isActive
                                                ? "scale-110"
                                                : "group-hover:scale-105"
                                        )}
                                    >
                                        <Icon />
                                    </span>

                                    <span
                                        className={cn(
                                            "font-sans text-sm font-semibold tracking-wide whitespace-nowrap leading-none",
                                            isActive
                                                ? "text-secondary"
                                                : "text-zinc-500 group-hover:text-zinc-300"
                                        )}
                                    >
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            <SpecialOffer />
            <Pizzas />
        </section>
    );
};

export default AllMenu;