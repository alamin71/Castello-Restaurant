export interface ApiEnvelope<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
}

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
