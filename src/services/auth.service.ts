import apiClient from "@/lib/axios";
import { API } from "@/config/api.endpoints";
import type { ApiEnvelope } from "@/types/api.types";
import type {
    ResendOtpResponse,
    SendOtpPayload,
    SendOtpResponse,
    VerifyOtpPayload,
    VerifyOtpResponse,
} from "@/types/auth.types";

export const authService = {
    sendOtp: async (payload: SendOtpPayload) => {
        const res = await apiClient.post<ApiEnvelope<SendOtpResponse>>(API.auth.sendOtp, payload);
        return res.data.data;
    },

    verifyOtp: async ({ otp, phoneToken }: VerifyOtpPayload) => {
        const res = await apiClient.post<ApiEnvelope<VerifyOtpResponse>>(
            API.auth.verifyOtp,
            { otp },
            { headers: { "phone-token": phoneToken } }
        );
        return res.data.data;
    },

    resendOtp: async (phoneToken: string) => {
        const res = await apiClient.post<ApiEnvelope<ResendOtpResponse>>(
            API.auth.resendOtp,
            {},
            { headers: { "phone-token": phoneToken } }
        );
        return res.data.data;
    },
};
