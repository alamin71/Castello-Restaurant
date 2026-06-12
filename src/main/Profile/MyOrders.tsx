"use client";

import Image from "next/image";
import { Bike, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────
type OrderStatus = "Pending" | "Preparing" | "Ready for pickup";
type DeliveryType = "delivery" | "pickup";

interface Order {
    id: string;
    orderId: string;
    deliveredOn: string;
    items: string;
    itemCount: number;
    total: number;
    image: string;
    extraCount: number;
    status?: OrderStatus;       // active orders only
    deliveryType: DeliveryType;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const activeOrders: Order[] = [
    {
        id: "1",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        status: "Pending",
        deliveryType: "delivery",
    },
    {
        id: "2",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        status: "Preparing",
        deliveryType: "delivery",
    },
    {
        id: "3",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        status: "Ready for pickup",
        deliveryType: "pickup",
    },
];

const pastOrders: Order[] = [
    {
        id: "4",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        deliveryType: "delivery",
    },
    {
        id: "5",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        deliveryType: "pickup",
    },
    {
        id: "6",
        orderId: "10245",
        deliveredOn: "16 Apr 26, 05:32 PM",
        items: "Arugula Pizza × 1   Kebab w/Lamb × 3 more...",
        itemCount: 5,
        total: 10435,
        image: "/assets/pizza.png",
        extraCount: 3,
        deliveryType: "delivery",
    },
];

// ── Status badge ───────────────────────────────────────────────────────────
const statusStyles: Record<OrderStatus, string> = {
    "Pending": "bg-secondary text-white",
    "Preparing": "bg-green-500 text-white",
    "Ready for pickup": "bg-blue-500 text-white",
};

function StatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span
            className={cn(
                "px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap",
                statusStyles[status]
            )}
        >
            {status}
        </span>
    );
}

// ── Delivery icon ──────────────────────────────────────────────────────────
function DeliveryIcon({ type }: { type: DeliveryType }) {
    return (
        <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border border-secondary text-secondary">
            {type === "delivery"
                ? <Bike className="h-5 w-5" />
                : <ShoppingBag className="h-5 w-5" />
            }
        </div>
    );
}

// ── Order card ─────────────────────────────────────────────────────────────
function OrderCard({ order, past = false }: { order: Order; past?: boolean }) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-2xl border border-white/20 bg-primary p-4">
            {/* Thumbnail with item-count badge */}
            <div className="relative shrink-0">
                <Image
                    src={order.image}
                    alt="order"
                    width={64}
                    height={64}
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl object-cover"
                />
                {order.extraCount > 0 && (
                    <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 text-sm font-bold text-white">
                        {order.extraCount}+
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="text-xs text-white/50">Order ID: {order.orderId}</p>
                <p className="text-xs text-white/50">Delivered on: {order.deliveredOn}</p>
                <p className="mt-1 text-xs text-white/70 line-clamp-2 sm:truncate">{order.items}</p>
            </div>

            {/* Right — meta + action */}
            <div className="flex shrink-0 flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3 w-full sm:w-auto">
                <p className="text-xs font-semibold text-white whitespace-nowrap">
                    {order.itemCount} Items • {order.total.toLocaleString()} kr.
                </p>

                <div className="flex items-center gap-2">
                    <DeliveryIcon type={order.deliveryType} />

                    {past ? (
                        <Button
                            className="rounded-lg border-none bg-secondary text-white hover:bg-secondary/90 hover:text-white text-xs font-semibold px-3 sm:px-4"
                        >
                            Re-Order
                        </Button>
                    ) : (
                        order.status && <StatusBadge status={order.status} />
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function MyOrders() {
    return (
        <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">My Order</h1>
            <div className="h-px bg-white/20 my-4" />

            <Tabs defaultValue="active">
                {/* Tab bar styled to match the screenshot */}
                <TabsList className="w-full h-14! rounded-2xl bg-primary border border-white/20 p-1 mb-6">
                    <TabsTrigger
                        value="active"
                        className="flex-1 h-full rounded-xl text-xs sm:text-sm font-semibold text-white/50
                                   data-[state=active]:bg-secondary data-[state=active]:text-white
                                   data-[state=active]:shadow-none transition-all cursor-pointer"
                    >
                        Active Orders
                    </TabsTrigger>
                    <TabsTrigger
                        value="past"
                        className="flex-1 h-full rounded-xl text-xs sm:text-sm font-semibold text-white/50
                                   data-[state=active]:bg-secondary data-[state=active]:text-white
                                   data-[state=active]:shadow-none transition-all cursor-pointer"
                    >
                        Past Orders
                    </TabsTrigger>
                </TabsList>

                {/* Active Orders */}
                <TabsContent value="active" className="space-y-3 mt-0">
                    {activeOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </TabsContent>

                {/* Past Orders */}
                <TabsContent value="past" className="space-y-3 mt-0">
                    {pastOrders.map((order) => (
                        <OrderCard key={order.id} order={order} past />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}