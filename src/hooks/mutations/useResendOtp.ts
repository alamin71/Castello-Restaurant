import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export function useResendOtp() {
    return useMutation({
        mutationFn: authService.resendOtp,
    });
}
