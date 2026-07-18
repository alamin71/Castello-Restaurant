import apiClient from "@/lib/axios";
import { API } from "@/config/api.endpoints";
import type { PaginatedEnvelope } from "@/types/api.types";
import type { ListOfferCategoriesParams, OfferCategory } from "@/types/offerCategory.types";

export const offerCategoryService = {
    list: async (params?: ListOfferCategoriesParams) => {
        const res = await apiClient.get<PaginatedEnvelope<OfferCategory>>(
            API.promotions.offerCategories,
            { params }
        );
        return res.data.data;
    },
};
