"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AddNewAddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack?: () => void;
    onSave?: (data: {
        deliveryAddress: string;
        addressInfo: string;
        isDefault: boolean;
    }) => void;
}

export function AddNewAddressDialog({
    open,
    onOpenChange,
    onBack,
    onSave,
}: AddNewAddressDialogProps) {
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [addressInfo, setAddressInfo] = useState("");
    const [isDefault, setIsDefault] = useState(true);

    const handleSave = () => {
        onSave?.({ deliveryAddress, addressInfo, isDefault });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-primary shadow-white/10 shadow-xl  border-white/20 text-white sm:max-w-130 p-0 gap-0">
                {/* Header */}
                <DialogHeader className="flex flex-row items-center gap-3 px-6 pt-6 pb-4 border-b border-white/20 space-y-0">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={onBack ?? (() => onOpenChange(false))}
                        className="h-8 w-8 rounded-full text-white hover:bg-white/10 shrink-0"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <DialogTitle className="text-xl font-semibold text-white">
                        Add New Address
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <div className="flex flex-col gap-5 px-6 py-6">
                    {/* Delivery Address */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold text-white">
                            Delivery Address
                        </Label>
                        <Input
                            placeholder="Enter delivery address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
     
                        />
                    </div>

                    {/* Address Information */}
                    <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold text-white">
                            Address Information
                        </Label>
                        <Input
                            placeholder="Information about the location"
                            value={addressInfo}
                            onChange={(e) => setAddressInfo(e.target.value)}
     
                        />
                    </div>

                    {/* Default checkbox */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="default-address"
                            checked={isDefault}
                            onCheckedChange={(checked) => setIsDefault(!!checked)}
                            className="h-5 w-5 rounded border-white/40 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                        />
                        <Label
                            htmlFor="default-address"
                            className="text-sm text-white cursor-pointer"
                        >
                            Mark as default address
                        </Label>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-6 pb-6 border-t border-white/20 pt-4">
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
                        Save & Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}