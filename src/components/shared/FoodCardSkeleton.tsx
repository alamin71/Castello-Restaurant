import { Skeleton } from "@/components/ui/skeleton";

export default function FoodCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-[#2e2e2e] bg-[#1a1a1a] overflow-hidden min-w-0">
      {/* Image */}
      <div className="relative w-full h-44 flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>

      <div className="border-t border-[#2e2e2e]" />

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 py-4 gap-3">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <div className="flex justify-center gap-4 my-2">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-1/3" />
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
