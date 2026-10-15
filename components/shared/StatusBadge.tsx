import type { OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_CLASSNAME: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-900 border-amber-200",
  processing: "bg-sky-100 text-sky-900 border-sky-200",
  shipped: "bg-violet-100 text-violet-900 border-violet-200",
  delivered: "bg-emerald-100 text-emerald-900 border-emerald-200",
  cancelled: "bg-red-100 text-red-900 border-red-200",
};

export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <Badge variant="outline" className={cn(STATUS_CLASSNAME[status], className)}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
