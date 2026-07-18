export interface OfferCategory {
    _id: string;
    offerCategoryId: string;
    name: string;
    image: string;
    status: "active" | "inactive";
    isDeleted: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    assignedOffers: number;
}

export interface ListOfferCategoriesParams {
    page?: number;
    limit?: number;
    status?: "active" | "inactive";
    searchTerm?: string;
}
