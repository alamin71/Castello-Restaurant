import { useQuery } from "@tanstack/react-query";
import { offerCategoryService } from "@/services/offerCategory.service";

export function useOfferCategories() {
    return useQuery({
        queryKey: ["offer-categories"],
        queryFn: () => offerCategoryService.list({ status: "active", limit: 100 }),
    });
}
