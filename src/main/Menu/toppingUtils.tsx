import type { ToppingCategory } from "@/types/toppingCategory.types";
import type { ToppingItem } from "@/types/toppingItem.types";
import type { PizzaItem, Topping, ToppingGroup } from "./pizzaData";

// Builds the topping groups a given pizza/product slot should offer, from the real
// topping-categories/topping-items catalog — `toppingCategoryIds` (undefined = every
// category, e.g. "Make Your Own Pizza") picks which groups show, and `defaultToppings`
// (matched by real toppingItemId) marks which items are pre-selected with their real price.
export function buildGroups(
    pizza: Pick<PizzaItem, "toppingCategoryIds" | "defaultToppings">,
    toppingCategories: ToppingCategory[],
    toppingItems: ToppingItem[]
): ToppingGroup[] {
    const relevantCategories =
        pizza.toppingCategoryIds === undefined
            ? toppingCategories
            : toppingCategories.filter((c) => pizza.toppingCategoryIds!.includes(c.toppingCategoryId));

    const defaultMap = new Map((pizza.defaultToppings ?? []).map((d) => [d.toppingItemId, d.price]));

    return relevantCategories
        .map((category) => ({
            label: category.name,
            items: toppingItems
                .filter((item) => item.toppingCategoryId.toppingCategoryId === category.toppingCategoryId)
                .map((item) => {
                    const isDefault = defaultMap.has(item.toppingItemId);
                    const realPrice = defaultMap.get(item.toppingItemId);
                    return {
                        name: item.name,
                        // Prefer the real backend price for this product's default toppings;
                        // fall back to the topping catalog's own price for everything else.
                        price: isDefault && realPrice != null ? realPrice : item.price,
                        qty: isDefault ? 1 : 0,
                        isDefault,
                    };
                }),
        }))
        .filter((group) => group.items.length > 0);
}

// Default toppings are already baked into the product's base price — removing one is
// free (no refund), but asking for extra beyond the default qty of 1 charges for the
// extra units. Non-default (added) toppings always charge their full price per quantity.
export const toppingsTotal = (groups: ToppingGroup[]) =>
    groups.reduce(
        (sum, g) =>
            sum +
            g.items.reduce(
                (s, t) => s + t.price * (t.isDefault ? Math.max(0, t.qty - 1) : t.qty),
                0
            ),
        0
    );

export function ToppingCard({
    topping,
    onInc,
    onDec,
    onRemove,
}: {
    topping: Topping;
    onInc: () => void;
    onDec: () => void;
    onRemove: () => void;
}) {
    const active = topping.qty > 0;
    const isDefaultActive = !!topping.isDefault && active;
    const isAddedActive = !topping.isDefault && active;
    // A default topping the customer explicitly excluded — gets its own red "removed" marker
    // instead of just reverting to the plain unselected look.
    const isDefaultRemoved = !!topping.isDefault && !active;

    return (
        <div
            className={`relative overflow-hidden rounded-lg border p-2 transition-colors ${active
                ? "border-secondary"
                : isDefaultRemoved
                    ? "border-red-500"
                    : "border-white/20"
                }`}
        >
            {isAddedActive && (
                <span className="absolute top-0 right-0 rounded-bl-lg bg-secondary px-2 py-0.5 text-[9px] font-bold text-white leading-tight">
                    New
                </span>
            )}
            {isDefaultRemoved && (
                <span className="absolute top-0 right-0 rounded-bl-lg bg-red-500 px-2 py-0.5 text-[9px] font-bold text-white leading-tight">
                    ×
                </span>
            )}
            <p className="text-sm leading-tight ">{topping.name}</p>
            <div className="mt-1 flex justify-between items-center">
                <p className="text-xs text-white">
                    {topping.price} kr.{topping.qty > 1 ? ` × ${topping.qty}` : ""}
                </p>

                <div className="flex items-center gap-1">
                    {isDefaultActive && (
                        <>
                            <button
                                onClick={onRemove}
                                aria-label={`Remove ${topping.name}`}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center text-2xl font-bold text-red-500 transition-colors hover:opacity-70"
                            >
                                ×
                            </button>
                            {topping.qty > 1 && (
                                <button
                                    onClick={onDec}
                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg text-white transition-colors hover:bg-zinc-600"
                                >
                                    −
                                </button>
                            )}
                        </>
                    )}
                    {isAddedActive && (
                        <button
                            onClick={onDec}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg text-white transition-colors hover:bg-zinc-600"
                        >
                            −
                        </button>
                    )}
                    <button
                        onClick={onInc}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg text-white transition-colors hover:bg-secondary"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

// Renders a group of topping cards with its header (label + "+Qty · +price" summary of
// anything added beyond the defaults) — shared between the pizza dialog and the offer
// bundle's per-slot customize screen.
export function ToppingGroupSection({
    group,
    onInc,
    onDec,
    onRemove,
}: {
    group: ToppingGroup;
    onInc: (ti: number) => void;
    onDec: (ti: number) => void;
    onRemove: (ti: number) => void;
}) {
    const extraQty = (t: Topping) => (t.isDefault ? Math.max(0, t.qty - 1) : t.qty);
    const addedQty = group.items.reduce((sum, t) => sum + extraQty(t), 0);
    const addedPrice = group.items.reduce((sum, t) => sum + t.price * extraQty(t), 0);

    return (
        <div className="rounded-2xl border-2 border-white/10 p-3 sm:p-4">
            <div className="mb-3 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-white">{group.label}</span>
                {addedQty > 0 && (
                    <span className="text-[10px] text-secondary">
                        +{addedQty} Qty · +{addedPrice.toLocaleString()} kr.
                    </span>
                )}
            </div>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-2">
                {group.items.map((topping, ti) => (
                    <ToppingCard
                        key={topping.name}
                        topping={topping}
                        onInc={() => onInc(ti)}
                        onDec={() => onDec(ti)}
                        onRemove={() => onRemove(ti)}
                    />
                ))}
            </div>
        </div>
    );
}
