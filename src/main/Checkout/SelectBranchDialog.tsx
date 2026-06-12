"use client";

import { useState } from "react";
import { Phone, Clock, MapPin } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const branches = [
    {
        id: "hafnarfjordur",
        name: "Hafnarfjordur",
        phone: "+354 551 2345",
        hours: "Everyday, 11:00 AM - 11:00 PM",
        address: "Dalshraun 13, 220 Hafnarfjörður, Iceland",
    },
    {
        id: "kopavogur",
        name: "Kópavogur",
        phone: "+354 551 2345",
        hours: "Everyday, 11:00 AM - 11:00 PM",
        address: "Dalvegur 2, 201 Kópavogur, Iceland",
    },
    {
        id: "reykjavik",
        name: "Reykjavík",
        phone: "+354 551 2345",
        hours: "Everyday, 11:00 AM - 11:00 PM",
        address: "Lagmúli 7, 108 Reykjavík, Iceland",
    },
];

interface SelectBranchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue?: (branchId: string) => void;
}

export function SelectBranchDialog({
    open,
    onOpenChange,
    onContinue,
}: SelectBranchDialogProps) {
    const [selectedId, setSelectedId] = useState("hafnarfjordur");

    const handleContinue = () => {
        onContinue?.(selectedId);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-background border-white/20 text-white sm:max-w-105 p-0 gap-0">
                {/* Header */}
                <DialogHeader className="px-6 pt-8 pb-5 border-b border-white/10 space-y-0">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Select a branch
                    </DialogTitle>
                </DialogHeader>

                {/* Branch list */}
                <div className="flex flex-col gap-3 px-6 py-5">
                    {branches.map((branch) => {
                        const isSelected = selectedId === branch.id;
                        return (
                            <button
                                key={branch.id}
                                onClick={() => setSelectedId(branch.id)}
                                className={cn(
                                    "w-full text-left rounded-2xl border p-4 transition-colors",
                                    isSelected
                                        ? "border-secondary bg-white/5"
                                        : "border-white/20 hover:border-white/40"
                                )}
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <span className="text-sm font-semibold text-white">
                                        {branch.name}
                                    </span>

                                    {/* Radio dot */}
                                    <span
                                        className={cn(
                                            "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                                            isSelected
                                                ? "border-secondary bg-secondary"
                                                : "border-white/40 bg-transparent"
                                        )}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <Phone className="h-3.5 w-3.5 shrink-0" />
                                        {branch.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <Clock className="h-3.5 w-3.5 shrink-0" />
                                        {branch.hours}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/60">
                                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                                        {branch.address}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
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
                        onClick={handleContinue}
                        className="flex-1 h-12 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-semibold"
                    >
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}