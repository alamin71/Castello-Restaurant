'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ServiceCardProps {
    title: string;
    description: string;
    ctaText: string;
    imageSrc: string;
    btnText: string;
}

export function Services() {
    const service: ServiceCardProps[] = [
        {
            title: "Dine-In Experience",
            description: "For catering or larger pizza orders, please use the form to contact us. We look forward to hearing from you!",
            ctaText: "Want to enjoy a cozy dine-in experience?",
            imageSrc: "/assets/Dine.png",
            btnText: "Explore Menu"
        },
        {
            title: "Takeaway",
            description: "Order your food and pick it up whenever it's convenient for you. Quick, easy, and perfect for busy days on the go.",
            ctaText: "Ready to grab your food on the go?",
            imageSrc: "/assets/Dine.png",
            btnText: "Order Now"
        },
        {
            title: "Fast Home Delivery",
            description: "Get hot and fresh food delivered straight to your doorstep. Fast, reliable service so you can enjoy your meal without leaving home.",
            ctaText: "Want it hot and delivered fast?",
            imageSrc: "/assets/Dine.png",
            btnText: "Order Now"
        },
        {
            title: "Catering Services",
            description: "For catering or larger pizza orders, please use the form to contact us. We look forward to hearing from you!",
            ctaText: "Planning an event? Let us handle the food",
            imageSrc: "/assets/Dine.png",
            btnText: "Send a message"
        }
    ];

    return (
        <section className="relative w-full">
            {/*
              * Total scroll height:
              *   - mobile: each card occupies 100svh (safe viewport height, avoids mobile browser chrome issues)
              *   - desktop (md+): each card occupies 65vh
              *
              * Using a wrapper with two height classes — Tailwind picks the right one.
              */}
            <div
                className="relative"
                style={{
                    // CSS custom property approach so both breakpoints work without JS
                    // On mobile browsers, svh accounts for the collapsible address bar
                }}
            >
                {/* Mobile total height  */}
                <div
                    className="md:hidden absolute inset-0 pointer-events-none"
                    style={{ height: `${service.length * 100}svh` }}
                />

                {/* Actual scroll container — height drives the sticky scroll budget */}
                <div
                    className="hidden md:block absolute inset-0 pointer-events-none"
                    style={{ height: `${service.length * 65}vh` }}
                />

                {/* This wrapper needs the real height set for scroll to work */}
                <div
                    className="md:hidden"
                    style={{ height: `${service.length * 100}svh` }}
                >
                    {service.map((s, index) => (
                        <div key={index} className="sticky top-0 h-svh flex items-center py-4">
                            <section className="w-[92%] mx-auto bg-primary text-white rounded-xl p-5 flex flex-col gap-4">
                                {/* Image on top for mobile */}
                                <div className="w-full">
                                    <Image
                                        src={s.imageSrc}
                                        alt={s.title}
                                        className="rounded-xl shadow-lg w-full h-44 object-cover"
                                        width={900}
                                        height={176}
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <div className="h-0.5 bg-secondary w-1/3" />
                                    <h2 className="text-2xl font-bold">{s.title}</h2>
                                    <p className="text-white/90 text-sm font-normal leading-relaxed">{s.description}</p>
                                    <p className="text-white text-base font-medium">{s.ctaText}</p>
                                    <Button variant="secondary" className="px-4 py-2 text-sm text-white">
                                        {s.btnText}
                                    </Button>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>

                {/* Desktop layout — original parallax */}
                <div
                    className="hidden md:block"
                    style={{ height: `${service.length * 65}vh` }}
                >
                    {service.map((s, index) => (
                        <div key={index} className="sticky top-0 h-[65vh] flex items-center">
                            <section className="w-10/12 mx-auto bg-primary text-white rounded-lg p-8 flex items-center justify-between gap-8">
                                <div className="space-y-4 flex-1">
                                    <div className="h-0.5 bg-secondary w-1/3" />
                                    <h2 className="text-5xl font-bold pb-1">{s.title}</h2>
                                    <p className="text-white text-base font-normal">{s.description}</p>
                                    <p className="text-white text-2xl font-medium">{s.ctaText}</p>
                                    <Button variant="secondary" className="px-4 py-5 text-base text-white">
                                        {s.btnText}
                                    </Button>
                                </div>
                                <div className="flex-1 w-full">
                                    <Image
                                        src={s.imageSrc}
                                        alt={s.title}
                                        className="rounded-2xl shadow-lg w-full h-96 object-cover"
                                        width={900}
                                        height={400}
                                    />
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}