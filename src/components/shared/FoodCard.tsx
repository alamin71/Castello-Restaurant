"use client";

import Image from "next/image";
import AddCartDialog from "@/main/Menu/AddCart";

interface SizePrice {
    label: string;
    price: number;
    originalPrice?: number;
}

export interface FoodCardProps {
    title: string;
    description: string;
    price?: string | number;
    sizes?: SizePrice[];
    image: string;
    badge?: string;
    onAdd?: () => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ title, description, price, sizes, image, badge }) => {
    return (
        <div className="flex flex-col rounded-2xl border border-[#2e2e2e] bg-[#1a1a1a] overflow-hidden">
            {/* Image */}
            <div
                className="relative w-full h-44 flex items-center justify-center"
                style={{ backgroundImage: `url(/assets/FoodCardBg.png)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <Image
                    src={image}
                    alt={title}
                    width={160}
                    height={160}
                    className="object-contain drop-shadow-xl"
                />
                {badge && (
                    <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                        {badge}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3">
                {/* Title + Description */}
                <div className="text-center">
                    <h2 className="text-white font-bold text-base leading-snug">{title}</h2>
                    <p className="text-[#888] text-xs mt-1 leading-relaxed line-clamp-2">{description}</p>
                </div>

                {/* Prices */}
                <div className="mt-auto flex flex-col gap-2">
                    {sizes && sizes.length > 0 ? (
                        <div className="flex justify-between gap-1">
                            {sizes.map((s) => (
                                <div key={s.label} className="flex flex-col">
                                    <span className="text-[#666] text-[11px]">{s.label}</span>
                                    <span className="text-white font-bold text-sm">{s.price.toLocaleString()} kr.</span>
                                    {s.originalPrice && (
                                        <span className="text-[#555] text-[11px] line-through">{s.originalPrice.toLocaleString()} kr.</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className="text-[#888] text-xs">Start from</p>
                            <p className="text-white font-bold text-lg leading-none mt-0.5">{price} kr</p>
                        </div>
                    )}

                    <AddCartDialog variant="full" />
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
