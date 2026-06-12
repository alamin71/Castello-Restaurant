"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPinPen } from "lucide-react";
import { AddNewAddressDialog } from "./AddNewAddressDialog";

const savedAddresses = [
    {
        id: "1",
        title: "Kópavogskirkja, Hamraborg, Kopavogur, Iceland",
        subtitle: "Unit 302, Hamraborg 1, Near Kópavogskirkja",
    },
    {
        id: "2",
        title: "Kópavogskirkja, Hamraborg, Kopavogur, Iceland",
        subtitle: "Unit 302, Hamraborg 1, Near Kópavogskirkja",
    },
    {
        id: "3",
        title: "Kópavogskirkja, Hamraborg, Kopavogur, Iceland",
        subtitle: "Unit 302, Hamraborg 1, Near Kópavogskirkja",
    },
];

interface SavedAddressesDialogProps {
    onContinue?: (selectedId: string) => void;
}

export function SavedAddressesDialog({ onContinue }: SavedAddressesDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("1");
    const [addNewOpen, setAddNewOpen] = useState(false);

    const handleContinue = () => {
        onContinue?.(selectedId);
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-white">
                        <MapPinPen className="h-4 w-4" /> Change
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-background border-white/20 text-white sm:max-w-130 p-0 gap-0">
                    {/* Header */}
                    <DialogHeader className="flex flex-row items-center justify-between px-6 pt-10 pb-4 border-b border-white/20 space-y-0">
                        <DialogTitle className="text-xl font-semibold text-white">
                            Saved Addresses
                        </DialogTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAddNewOpen(true)}
                            className="rounded-xl border-secondary text-secborder-secondary bg-transparent hover:bg-secondary/900 hover:text-secondary"
                        >
                            Add new address
                        </Button>
                    </DialogHeader>

                    {/* Address list */}
                    <div className="px-6 py-5">
                        <RadioGroup
                            value={selectedId}
                            onValueChange={setSelectedId}
                            className="flex flex-col gap-3"
                        >
                            {savedAddresses.map((address) => {
                                const isSelected = selectedId === address.id;
                                return (
                                    <Label
                                        key={address.id}
                                        htmlFor={`address-${address.id}`}
                                        className={cn(
                                            "flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition-colors",
                                            isSelected
                                                ? "border-secondary bg-white/5"
                                                : "border-white/20 hover:border-white/40"
                                        )}
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {address.title}
                                            </p>
                                            <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                                {address.subtitle}
                                            </p>
                                        </div>

                                        <RadioGroupItem
                                            id={`address-${address.id}`}
                                            value={address.id}
                                            className={cn(
                                                "ml-4 shrink-0 border-zinc-600",
                                                isSelected && "border-secondary text-secborder-secondary"
                                            )}
                                        />
                                    </Label>
                                );
                            })}
                        </RadioGroup>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 px-6 pb-6">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1 h-12 rounded-2xl border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
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

            <AddNewAddressDialog
                open={addNewOpen}
                onOpenChange={setAddNewOpen}
                onBack={() => setAddNewOpen(false)}
                onSave={(data) => {
                    // TODO: persist new address to state/API
                    console.log("New address saved:", data);
                    setAddNewOpen(false);
                }}
            />
        </>
    );
}