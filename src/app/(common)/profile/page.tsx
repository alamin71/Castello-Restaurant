"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState("/assets/avatar.png");
    const [fullName, setFullName] = useState("Jón Sigurðsson");
    const [phone, setPhone] = useState("+354 661 7392");
    const [email, setEmail] = useState("jon.sigurdsson@gmail.com");

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
    };

    const handleSave = () => {
        // TODO: call your API here
        console.log("Saving:", { fullName, phone, email, avatarUrl });
    };

    return (
        <div>
            {/* Header */}
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">My Account</h1>
            <div className="h-px bg-white/10 mb-6 sm:mb-8" />

            {/* Avatar */}
            <div className="mb-6 sm:mb-7">
                <div className="flex flex-col items-center sm:items-start">
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-2 ring-white/20 mb-3">
                        <AvatarImage src={avatarUrl} alt={fullName} className="object-cover" />
                        <AvatarFallback className="bg-white/10 text-white text-xl sm:text-2xl font-semibold">
                            {fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center sm:text-left">
                        <p className="text-xs text-white/50 mb-1">Must be JPG, JPEG or PNG</p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm font-semibold text-white hover:text-white/70 transition-colors"
                        >
                            Change profile photo
                        </button>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handlePhotoChange}
                />
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4 sm:gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold text-white">Full Name</Label>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full h-10 sm:h-11"
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold text-white">Phone Number</Label>
                    <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 sm:h-11"
                    />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold text-white">Email Address</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 sm:h-11"
                    />
                </div>

                {/* Save */}
                <Button
                    onClick={handleSave}
                    className="mt-2 h-11 sm:h-13 w-full rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm sm:text-base"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}