"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddNewAddressDialog } from "../Checkout/AddNewAddressDialog";

// ── Types ──────────────────────────────────────────────────────────────────
interface Address {
    id: string;
    title: string;
    subtitle: string;
    isDefault: boolean;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const initialAddresses: Address[] = [
    {
        id: "1",
        title: "Egilsbraut 4, Apt 3C, 3rd Floor, Entrance C, Egilsstaðir",
        subtitle: "Opposite Egilsstaðir Airport",
        isDefault: false,
    },
    {
        id: "2",
        title: "Kópavogskirkja, Hamraborg, Kopavogur",
        subtitle: "Hamraborg 1, 2nd Floor, Entrance A, Near Kópavogskirkja",
        isDefault: false,
    },
    {
        id: "3",
        title: "Austurvegur 9, Ground Floor, Selfoss",
        subtitle: "Near Selfoss Shopping Area",
        isDefault: true,
    },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function MyAddresses() {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    const handleDelete = (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    // const handleSetDefault = (id: string) => {
    //     setAddresses((prev) =>
    //         prev.map((a) => ({ ...a, isDefault: a.id === id }))
    //     );
    // };

    const handleAdd = (data: { deliveryAddress: string; addressInfo: string; isDefault: boolean }) => {
        const newAddress: Address = {
            id: Date.now().toString(),
            title: data.deliveryAddress,
            subtitle: data.addressInfo,
            isDefault: data.isDefault,
        };
        setAddresses((prev) => {
            const updated = data.isDefault
                ? prev.map((a) => ({ ...a, isDefault: false }))
                : prev;
            return [...updated, newAddress];
        });
        setAddDialogOpen(false);
    };

    const handleEdit = (data: { deliveryAddress: string; addressInfo: string; isDefault: boolean }) => {
        if (!editingAddress) return;
        setAddresses((prev) =>
            prev.map((a) => {
                if (a.id !== editingAddress.id) {
                    return data.isDefault ? { ...a, isDefault: false } : a;
                }
                return { ...a, title: data.deliveryAddress, subtitle: data.addressInfo, isDefault: data.isDefault };
            })
        );
        setEditingAddress(null);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white">My Addresses</h1>
                <Button
                    onClick={() => setAddDialogOpen(true)}
                    className="rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold px-4 py-3 sm:px-5 sm:py-5 text-sm sm:text-base"
                >
                    Add New Address
                </Button>
            </div>
            <div className="h-px bg-white/10 my-6" />

            {/* Address list */}
            <div className="flex flex-col gap-3">
                {addresses.length === 0 && (
                    <p className="text-sm text-white/40 py-8 text-center">
                        No saved addresses yet.
                    </p>
                )}

                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-white/20 px-4 sm:px-5 py-3 sm:py-4"
                    >
                        {/* Text */}
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white line-clamp-2">
                                {address.title}
                            </p>
                            <p className="text-xs text-white/50 mt-0.5 line-clamp-1">
                                {address.subtitle}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            {address.isDefault && (
                                <span className="rounded-md bg-secondary px-2 sm:px-3 py-1.5 sm:py-2.5 text-xs font-medium text-white whitespace-nowrap">
                                    Default
                                </span>
                            )}

                            {/* Edit */}
                            <button
                                onClick={() => setEditingAddress(address)}
                                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors"
                                aria-label="Edit address"
                            >
                                <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => handleDelete(address.id)}
                                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 text-red-500 hover:border-red-500/40 hover:bg-red-500/10 transition-colors"
                                aria-label="Delete address"
                            >
                                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add new address dialog */}
            <AddNewAddressDialog
                open={addDialogOpen}
                onOpenChange={setAddDialogOpen}
                onSave={handleAdd}
            />

            {/* Edit address dialog — reuses AddNewAddressDialog */}
            {editingAddress && (
                <AddNewAddressDialog
                    open={!!editingAddress}
                    onOpenChange={(open) => { if (!open) setEditingAddress(null); }}
                    onSave={handleEdit}
                />
            )}
        </div>
    );
}