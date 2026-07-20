"use client";

import FoodCard from "@/components/shared/FoodCard";
import FoodCardSkeleton from "@/components/shared/FoodCardSkeleton";
import Container from "@/components/shared/Container";
import { useOffers } from "@/hooks/queries/useOffers";

export default function OfferCategorySection({
    offerCategoryId,
    categoryName,
}: {
    offerCategoryId: string;
    categoryName: string;
}) {
    const { data: offers, isLoading } = useOffers({ offerCategoryId });

    if (!isLoading && (offers ?? []).length === 0) return null;

    return (
        <Container className="py-12">
            <h2 className="text-white text-[32px] text-left font-bold mb-12">{categoryName}</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <FoodCardSkeleton key={i} />)
                    : (offers ?? []).map((offer) => (
                        <FoodCard
                            key={offer._id}
                            title={offer.title}
                            description={offer.description}
                            price={offer.price}
                            image={offer.mainImage}
                            gallery={offer.gallery}
                        />
                    ))}
            </div>
        </Container>
    );
}
