import apiClient from "@/lib/axios";
import { API } from "@/config/api.endpoints";
import type { PaginatedEnvelope } from "@/types/api.types";
import type { ListOffersParams, Offer } from "@/types/offer.types";

export const offerService = {
    list: async (params?: ListOffersParams) => {
        const res = await apiClient.get<PaginatedEnvelope<Offer>>(API.promotions.offers, {
            params,
        });
        return res.data.data;
    },
};
