"use client";

import Image from "next/image";
import AddCartDialog from "@/main/Menu/AddCart";

export interface FoodCardProps {
    title: string,
    description: string,
    price: string | number,
    image: string,
    badge?: string,
    onAdd?: () => void,
};

const FoodCard: React.FC<FoodCardProps> = ({
    title,
    description,
    price,
    image,
    badge,
    // onAdd,
}) => {
    return (
        <section className="border border-[#3B3B3B] rounded-3xl overflow-hidden">
            {/* Image section */}
            <div
                className="relative w-full h-fit bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url(/assets/FoodCardBg.png)`,
                }}
            >
                <Image
                    src={image}
                    alt={title}
                    width={180}
                    height={180}
                    className="object-contain py-6"
                />
                {/* badge */}
                {badge && (
                    <div className="absolute top-0 left-0 bg-secondary rounded-br-full px-4 uppercase text-white py-2 text-sm">
                        {badge}
                    </div>
                )}
            </div>
            {/* Content */}
            <div className="p-3 flex flex-col justify-center items-center">
                <h2 className="text-white font-bold text-lg">{title}</h2>
                <p className="text-gray-300 text-sm text-center w-3/4">{description}</p>
            </div>

            {/* Footer */}

            <div className="flex justify-between items-center p-3">
                <div>
                    <h3 className="text-white text-xl font-semibold">{price} ISK</h3>
                    <p className="text-[#B5B5B5] text-sm">Start from</p>
                </div>

                <AddCartDialog />
            </div>
        </section>
    );
};

export default FoodCard;