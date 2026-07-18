"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategories } from "@/hooks/queries/useCategories";
import { useOfferCategories } from "@/hooks/queries/useOfferCategories";
import OfferIcon from "../../../public/icons/offer-icon";
import SpecialOffer from "../Home/SpecialOffer";
import Pizzas from "./Pizza";
import CategoryProducts from "./CategoryProducts";

interface NavTab {
    id: string;
    label: string;
    icon?: React.ComponentType;
    image?: string;
}

const AllMenu = () => {
    const { data: categories } = useCategories();
    const { data: offerCategories } = useOfferCategories();

    const tabs: NavTab[] = useMemo(() => {
        const offersTab: NavTab = offerCategories?.[0]
            ? { id: "offers", label: "Offers", image: offerCategories[0].image }
            : { id: "offers", label: "Offers", icon: OfferIcon };

        return [
            offersTab,
            ...[...(categories ?? [])]
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((c) => ({
                    id: c.name.toLowerCase() === "pizza" ? "pizza" : c.categoryId,
                    label: c.name,
                    image: c.image,
                })),
        ];
    }, [categories, offerCategories]);

    const otherCategories = useMemo(
        () => (categories ?? []).filter((c) => c.name.toLowerCase() !== "pizza"),
        [categories]
    );

    const [active, setActive] = useState("offers");
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const scrollingRef = useRef(false);

    // Scroll spy via IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        tabs.forEach((tab) => {
            const el = sectionRefs.current[tab.id];
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !scrollingRef.current) {
                        setActive(tab.id);
                    }
                },
                { threshold: 0.2, rootMargin: "-80px 0px -50% 0px" }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [tabs]);

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
                        {tabs.map((tab) => {
                            const isActive = active === tab.id;
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleCategoryClick(tab.id)}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3",
                                        "px-3 py-2.5 rounded-xl transition-all duration-200 group cursor-pointer",
                                        isActive
                                            ? "text-secondary bg-primary"
                                            : "text-white hover:text-white/80"
                                    )}
                                >
                                    <span className={cn("relative flex h-6 w-6 items-center justify-center transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-105")}>
                                        {Icon ? (
                                            <Icon />
                                        ) : tab.image ? (
                                            isActive ? (
                                                <span
                                                    aria-hidden
                                                    className="h-6 w-6 bg-secondary"
                                                    style={{
                                                        WebkitMaskImage: `url(${tab.image})`,
                                                        maskImage: `url(${tab.image})`,
                                                        WebkitMaskSize: "contain",
                                                        maskSize: "contain",
                                                        WebkitMaskRepeat: "no-repeat",
                                                        maskRepeat: "no-repeat",
                                                        WebkitMaskPosition: "center",
                                                        maskPosition: "center",
                                                    }}
                                                />
                                            ) : (
                                                <Image src={tab.image} alt={tab.label} fill className="object-contain" />
                                            )
                                        ) : null}
                                    </span>
                                    <span className={cn(
                                        "font-sans text-sm font-semibold tracking-wide whitespace-nowrap leading-none",
                                        isActive ? "text-secondary" : "text-zinc-500 group-hover:text-zinc-300"
                                    )}>
                                        {tab.label}
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
            <div ref={(el) => { sectionRefs.current["pizza"] = el; }} style={{ scrollMarginTop: "170px" }}>
                <Pizzas />
            </div>
            {otherCategories.map((c) => (
                <div
                    key={c.categoryId}
                    ref={(el) => { sectionRefs.current[c.categoryId] = el; }}
                    style={{ scrollMarginTop: "170px" }}
                >
                    <CategoryProducts categoryName={c.name} />
                </div>
            ))}
        </section>
    );
};

export default AllMenu;
