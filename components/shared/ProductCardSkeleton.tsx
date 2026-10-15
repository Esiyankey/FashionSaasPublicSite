import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="mb-4 aspect-3/4 w-full rounded-none" />
      <Skeleton className="mb-2 h-3 w-1/3" />
      <Skeleton className="mb-2 h-4 w-2/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}
