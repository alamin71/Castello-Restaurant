export interface SendOtpPayload {
    phone: string;
}

export interface SendOtpResponse {
    phoneToken: string;
}

export interface VerifyOtpPayload {
    otp: number;
    phoneToken: string;
}

export interface VerifyOtpResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ResendOtpResponse {
    phoneToken: string;
}
