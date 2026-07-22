"use client";

import FoodCard from "@/components/shared/FoodCard";
import FoodCardSkeleton from "@/components/shared/FoodCardSkeleton";
import Container from "@/components/shared/Container";
import { useProducts } from "@/hooks/queries/useProducts";
import { productToMenuItem } from "./pizzaData";

export default function CategoryProducts({ categoryName }: { categoryName: string }) {
    const { data: products, isLoading } = useProducts();
    const items = (products ?? [])
        .filter((p) => p.categoryId?.name?.toLowerCase() === categoryName.toLowerCase())
        .map(productToMenuItem);

    if (!isLoading && items.length === 0) return null;

    return (
        <Container className="mb-12">
            <h2 className="text-white text-[32px] font-bold my-12">{categoryName}</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <FoodCardSkeleton key={i} />)
                    : items.map((item, i) => (
                        <FoodCard
                            key={i}
                            title={item.title}
                            description={item.description}
                            badge={item.badge}
                            sizes={item.sizes}
                            toppingCategoryIds={item.toppingCategoryIds}
                            defaultToppings={item.defaultToppings}
                            image={item.image ?? "/assets/pizza.png"}
                            gallery={item.gallery}
                        />
                    ))}
            </div>
        </Container>
    );
}
