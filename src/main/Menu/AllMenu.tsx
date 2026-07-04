"use client";
import { useState, useEffect, useRef } from "react";
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
import OfferIcon from "../../../public/icons/offer-icon";
import SpecialOffer from "../Home/SpecialOffer";
import Pizzas from "./Pizza";

interface Category {
    id: string;
    label: string;
    icon: React.ComponentType;
}

const categories: Category[] = [
    { id: "offers", label: "Offers", icon: OfferIcon },
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
    const [active, setActive] = useState("offers");
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const scrollingRef = useRef(false);

    // Scroll spy via IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        categories.forEach((cat) => {
            const el = sectionRefs.current[cat.id];
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !scrollingRef.current) {
                        setActive(cat.id);
                    }
                },
                { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleCategoryClick = (id: string) => {
        setActive(id);
        const el = sectionRefs.current[id];
        if (!el) return;

        scrollingRef.current = true;
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Re-enable scroll spy after animation finishes
        setTimeout(() => { scrollingRef.current = false; }, 800);
    };

    return (
        <section className="w-full max-w-360 mx-auto">
            {/* Sticky category bar */}
            <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-white/10 w-full px-4 py-1">
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex items-center gap-2 sm:gap-4 w-max mx-auto p-2">
                        {categories.map((cat) => {
                            const isActive = active === cat.id;
                            const Icon = cat.icon;

                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3",
                                        "px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer",
                                        isActive
                                            ? "text-secondary bg-primary"
                                            : "text-white hover:text-white/80"
                                    )}
                                >
                                    <span className={cn("transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-105")}>
                                        <Icon />
                                    </span>
                                    <span className={cn(
                                        "font-sans text-sm font-semibold tracking-wide whitespace-nowrap leading-none",
                                        isActive ? "text-secondary" : "text-zinc-500 group-hover:text-zinc-300"
                                    )}>
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Sections */}
            <div ref={(el) => { sectionRefs.current["offers"] = el; }} style={{ scrollMarginTop: "170px" }}>
                <SpecialOffer />
            </div>
            <div ref={(el) => { sectionRefs.current["pizzas"] = el; }} style={{ scrollMarginTop: "170px" }}>
                <Pizzas />
            </div>
        </section>
    );
};

export default AllMenu;
