export const API = {
    auth: {
        sendOtp: "/auth/phone/send-otp",
        verifyOtp: "/auth/phone/verify-otp",
        resendOtp: "/auth/phone/resend-otp",
    },
    menu: {
        categories: "/admin/menu/categories",
        products: "/admin/menu/products",
    },
    promotions: {
        offerCategories: "/admin/promotions/offer-categories",
        offers: "/admin/promotions/offers",
    },
    toppings: {
        categories: "/admin/menu/toppings/categories",
        items: "/admin/menu/toppings/items",
    },
};
