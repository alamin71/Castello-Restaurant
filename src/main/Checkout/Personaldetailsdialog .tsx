"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave?: (data: {
        fullName: string;
        email: string;
        phone: string;
    }) => void;
    defaultValues?: {
        fullName?: string;
        email?: string;
        phone?: string;
    };
}

export function PersonalDetailsDialog({
    open,
    onOpenChange,
    onSave,
    defaultValues,
}: PersonalDetailsDialogProps) {
    const [fullName, setFullName] = useState(defaultValues?.fullName ?? "Jón Sigurðsson");
    const [email, setEmail] = useState(defaultValues?.email ?? "jon.sigurdsson@gmail.com");
    const [phone, setPhone] = useState(defaultValues?.phone ?? "+354 661 4821");

    const handleSave = () => {
        onSave?.({ fullName, email, phone });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background border-white/20 text-white sm:max-w-105 p-0 gap-0">
                {/* Header */}
                <DialogHeader className="px-6 pt-8 pb-5 border-b border-white/10 space-y-0">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Personal Details
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="flex flex-col gap-5 px-6 py-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-white">
                            Full Name
                        </Label>
                        <Input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-12 rounded-2xl border-white/20 bg-white/5 text-white placeholder:text-white/40 "
                        />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-white">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 rounded-2xl border-white/20 bg-white/5 text-white placeholder:text-white/40 "
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-white">
                            Phone Number
                        </Label>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-12 rounded-2xl border-white/20 bg-white/5 text-white placeholder:text-white/40 "
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-6 pb-6">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 h-12 rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="flex-1 h-12 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-semibold"
                    >
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}