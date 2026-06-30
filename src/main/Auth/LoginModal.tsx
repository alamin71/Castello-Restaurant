"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const COUNTRIES = [
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
];

const MOCK_OTP = "123456";
const RESEND_SECONDS = 60;

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState("+354");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedCountry =
    COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  function startInterval() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    if (step === "otp") startInterval();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  function handleClose() {
    setStep("phone");
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    if (timerRef.current) clearInterval(timerRef.current);
    closeLoginModal();
  }

  function handlePhoneSubmit() {
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }
    setError("");
    setCountdown(RESEND_SECONDS);
    setStep("otp");
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  }

  function handleResend() {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setCountdown(RESEND_SECONDS);
    otpRefs.current[0]?.focus();
    startInterval();
  }

  function handleVerify() {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    if (otpValue !== MOCK_OTP) {
      setError("Invalid code. Use 123456 for demo.");
      return;
    }
    login(phone, countryCode);
    toast.success("otp verified! Login successful", {
      duration: 3000,
      closeButton: false,
    });
    handleClose();
  }

  const timerLabel = `0:${String(countdown).padStart(2, "0")}`;

  return (
    <Dialog
      open={isLoginModalOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogTitle className="sr-only">Login</DialogTitle>

      <DialogContent className="max-w-sm w-11/12 border border-white/10 bg-[#1c1c1e] text-white rounded-2xl p-8">
        {step === "phone" ? (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Login</h2>
              <p className="text-sm text-white/50 mt-1">
                Log in to start ordering
              </p>
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">
                Phone number
              </label>
              <div className="flex items-stretch gap-0 rounded-xl border border-white/20 overflow-hidden bg-white/5">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="h-12 w-32 shrink-0 bg-transparent border-0 border-r border-white/20 rounded-none text-white text-sm px-3 focus-visible:ring-0">
                    <SelectValue>
                      <span className="flex items-center gap-1.5">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1c1c1e] border border-white/20 text-white">
                    {COUNTRIES.map((c) => (
                      <SelectItem
                        key={c.code}
                        value={c.code}
                        className="text-white focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        {c.flag} {c.code} {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handlePhoneSubmit()}
                  className="flex-1 h-12 bg-transparent border-0 text-white placeholder:text-white/30 rounded-none focus-visible:ring-0 px-3"
                />
              </div>
              {error && <p className="text-secondary text-xs mt-1">{error}</p>}
            </div>

            <Button
              onClick={handlePhoneSubmit}
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full text-base"
            >
              Log in
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Back button — aligned with close button */}
            <button
              onClick={() => {
                setStep("phone");
                setError("");
                setOtp(["", "", "", "", "", ""]);
              }}
              className="absolute left-4 top-3.5 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >
              ← Back
            </button>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl pt-4 font-bold text-white">Verify OTP</h2>
              <p className="text-sm text-white/50 mt-1">
                Code sent to {selectedCountry.flag} {countryCode} {phone}
              </p>
            </div>

            {/* OTP boxes */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">
                Verification code
              </label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className="w-11 h-12 text-center text-xl font-bold bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-secondary transition-colors"
                  />
                ))}
              </div>
              {error && <p className="text-secondary text-xs mt-1">{error}</p>}
              <p className="text-white/30 text-xs">Demo: enter 123456</p>
            </div>

            <Button
              onClick={handleVerify}
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-full text-base"
            >
              Verify
            </Button>

            {/* Timer + Resend */}
            <div className="flex items-center justify-center gap-3">
              {countdown > 0 && (
                <span className="text-sm text-white/40">{timerLabel}</span>
              )}
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className={`text-sm transition-colors ${
                  countdown > 0
                    ? "text-white/20 cursor-not-allowed"
                    : "text-secondary hover:text-secondary/70 cursor-pointer"
                }`}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
