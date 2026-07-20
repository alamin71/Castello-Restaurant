"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/queries/useCategories";
import { useOfferCategories } from "@/hooks/queries/useOfferCategories";
import Pizzas from "./Pizza";
import CategoryProducts from "./CategoryProducts";
import OfferCategorySection from "./OfferCategorySection";

interface NavTab {
    id: string;
    label: string;
    image?: string;
}

// Recolors any icon image to the brand orange (#FF4D00): first flattens it to a solid
// black silhouette (brightness/saturate), then colorizes that black to the target hue.
// Works on already-rendered pixels, so — unlike CSS masks — it needs no extra cross-origin fetch.
const ACTIVE_ICON_FILTER =
    "brightness(0) saturate(100%) invert(25%) sepia(37%) saturate(4977%) hue-rotate(3deg) brightness(156%) contrast(124%)";

const AllMenu = () => {
    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const { data: offerCategories } = useOfferCategories();

    // Only offer categories that actually have offers assigned to them get a tab.
    const featuredOfferCategories = useMemo(
        () =>
            (offerCategories ?? [])
                .filter((oc) => oc.assignedOffers > 0)
                .sort((a, b) => a.sortOrder - b.sortOrder),
        [offerCategories]
    );

    const tabs: NavTab[] = useMemo(() => [
        ...featuredOfferCategories.map((oc) => ({
            id: oc.offerCategoryId,
            label: oc.name,
            image: oc.image,
        })),
        ...[...(categories ?? [])]
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((c) => ({
                id: c.name.toLowerCase() === "pizza" ? "pizza" : c.categoryId,
                label: c.name,
                image: c.image,
            })),
    ], [categories, featuredOfferCategories]);

    const otherCategories = useMemo(
        () => (categories ?? []).filter((c) => c.name.toLowerCase() !== "pizza"),
        [categories]
    );

    const [active, setActive] = useState("");
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const scrollingRef = useRef(false);

    // Default to the first tab until the user clicks/scrolls, without syncing via an effect.
    const activeTab = active || tabs[0]?.id || "";

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
                        {categoriesLoading
                            ? Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 px-3 py-2.5">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <Skeleton className="h-3 w-12" />
                                </div>
                            ))
                            : tabs.map((tab) => {
                                const isActive = activeTab === tab.id;

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
                                        <span className={cn("relative flex h-9 w-9 items-center justify-center transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-105")}>
                                            {tab.image && (
                                                <Image
                                                    src={tab.image}
                                                    alt={tab.label}
                                                    fill
                                                    className="object-contain"
                                                    style={isActive ? { filter: ACTIVE_ICON_FILTER } : undefined}
                                                />
                                            )}
                                        </span>
                                        <span className={cn(
                                            "font-sans text-base font-semibold tracking-wide whitespace-nowrap leading-none",
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
            {featuredOfferCategories.map((oc) => (
                <div
                    key={oc.offerCategoryId}
                    ref={(el) => { sectionRefs.current[oc.offerCategoryId] = el; }}
                    style={{ scrollMarginTop: "210px" }}
                >
                    <OfferCategorySection offerCategoryId={oc.offerCategoryId} categoryName={oc.name} />
                </div>
            ))}
            <div ref={(el) => { sectionRefs.current["pizza"] = el; }} style={{ scrollMarginTop: "210px" }}>
                <Pizzas />
            </div>
            {otherCategories.map((c) => (
                <div
                    key={c.categoryId}
                    ref={(el) => { sectionRefs.current[c.categoryId] = el; }}
                    style={{ scrollMarginTop: "210px" }}
                >
                    <CategoryProducts categoryName={c.name} />
                </div>
            ))}
        </section>
    );
};

export default AllMenu;
