"use client";

import { useMemo } from "react";
import { useOfferCategories } from "@/hooks/queries/useOfferCategories";
import OfferCategorySection from "@/main/Menu/OfferCategorySection";

const SpecialOffer = () => {
  const { data: offerCategories } = useOfferCategories();

  // Only offer categories that actually have offers assigned to them get a section here —
  // same rule as the Menu page's category tabs.
  const featuredOfferCategories = useMemo(
    () =>
      (offerCategories ?? [])
        .filter((oc) => oc.assignedOffers > 0)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [offerCategories]
  );

  return (
    <>
      {featuredOfferCategories.map((oc) => (
        <OfferCategorySection
          key={oc.offerCategoryId}
          offerCategoryId={oc.offerCategoryId}
          categoryName={oc.name}
        />
      ))}
    </>
  );
};

export default SpecialOffer;
