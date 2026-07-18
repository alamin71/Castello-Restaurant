"use client";

import FoodCard from "@/components/shared/FoodCard";
import FoodCardSkeleton from "@/components/shared/FoodCardSkeleton";
import Container from "@/components/shared/Container";
import { useOffers } from "@/hooks/queries/useOffers";

const SpecialOffer = () => {
  const { data: offers, isLoading } = useOffers();

  return (
    <Container className="py-12">
      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl text-left font-bold mb-12">
        Special Offers
      </h2>
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
            />
          ))}
      </div>
    </Container>
  );
};

export default SpecialOffer;
