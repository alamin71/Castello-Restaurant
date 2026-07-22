"use client";

import Image from "next/image";
import FoodCard from "@/components/shared/FoodCard";
import FoodCardSkeleton from "@/components/shared/FoodCardSkeleton";
import Container from "@/components/shared/Container";
import AddCartDialog from "./AddCart";
import { MAKE_YOUR_OWN_PIZZA, productToMenuItem } from "./pizzaData";
import { useProducts } from "@/hooks/queries/useProducts";

const Pizzas = () => {
    const { data: products, isLoading } = useProducts();
    const pizzas = (products ?? [])
        .filter((p) => p.categoryId?.name?.toLowerCase() === "pizza")
        .map(productToMenuItem);

    return (
        <Container className="mb-12">
            <h2 className="text-white text-[32px] font-bold my-12">Pizzas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <AddCartDialog
                    pizza={MAKE_YOUR_OWN_PIZZA}
                    allowHalfHalf
                    trigger={
                        <button className="flex cursor-pointer items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 text-left hover:border-[#555] transition-colors group">
                            <div className="shrink-0 w-14 h-14 flex items-center justify-center">
                                <Image src="/icons/pizza-vector.svg" alt="Make Your Own Pizza" width={48} height={48} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-lg leading-tight">Make Your Own Pizza</p>
                                <p className="text-gray-400 text-sm mt-1 leading-snug">Here you can choose from all the toppings we offer and make your own pizza.</p>
                            </div>
                            <svg className="shrink-0 text-gray-400 group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    }
                />

                <AddCartDialog
                    trigger={
                        <button className="flex cursor-pointer items-center gap-4 bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 text-left hover:border-[#555] transition-colors group">
                            <div className="shrink-0 w-14 h-14 flex items-center justify-center">
                                <Image src="/icons/pizza-half.svg" alt="Half and Half Pizza" width={48} height={48} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-lg leading-tight">Half &amp; Half Pizza</p>
                                <p className="text-gray-400 text-sm mt-1 leading-snug">Here you can choose two pizzas from the menu, each half of them, and customize them.</p>
                            </div>
                            <svg className="shrink-0 text-gray-400 group-hover:text-white transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    }
                />
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => <FoodCardSkeleton key={i} />)
                    : pizzas.map((pizza, i) => (
                        <FoodCard
                            key={i}
                            title={pizza.title}
                            description={pizza.description}
                            badge={pizza.badge}
                            sizes={pizza.sizes}
                            toppings={pizza.toppings}
                            allowHalfHalf
                            image={pizza.image ?? "/assets/pizza.png"}
                            gallery={pizza.gallery}
                        />
                    ))}
            </div>
        </Container>
    );
};

export default Pizzas;
