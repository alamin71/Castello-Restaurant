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

const FoodCard: React.FC<FoodCardProps> = ({
  title,
  description,
  price,
  sizes,
  image,
  badge,
}) => {
  return (
    <div className="flex flex-col rounded-2xl border border-[#2e2e2e] bg-[#1a1a1a] overflow-hidden min-w-0">
      {/* Image */}
      <div
        className="relative w-full h-44 flex items-center justify-center"
        style={{
          backgroundImage: `url(/assets/FoodCardBg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src={image}
          alt={title}
          width={160}
          height={160}
          className="object-contain drop-shadow-xl"
        />
        {badge && (
          <span className="absolute top-0 left-0 bg-secondary text-white text-xs font-bold uppercase px-3 py-1.5 rounded-br-xl">
            {badge}
          </span>
        )}
      </div>

      <div className="border-t border-[#2e2e2e]" />

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 py-4 gap-3">
        {/* Title + Description */}
        <div className="text-center">
          <h2 className="text-white font-bold text-base leading-snug">
            {title}
          </h2>
          <p className="text-[#888] text-sm font-normal mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Prices */}
        <div className="mt-auto flex flex-col gap-6">
          {sizes && sizes.length > 0 ? (
            <div className="flex my-2">
              {sizes.map((s, idx) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center justify-center flex-1 py-3 px-1 ${idx < sizes.length - 1 ? "border-r border-[#2e2e2e]" : ""}`}
                >
                  <span className="text-[#666] text-xs font-normal leading-none mb-1">
                    {s.label}
                  </span>
                  <span className="text-white font-bold text-base leading-none my-1.5">
                    {s.price.toLocaleString()} kr.
                  </span>
                  {s.originalPrice && (
                    <span className="text-[#555] text-xs font-normal line-through leading-none mt-0.5">
                      {s.originalPrice.toLocaleString()} kr.
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white font-bold text-base leading-none text-center">
              {price} kr.
            </p>
          )}

          <AddCartDialog variant="full" />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
