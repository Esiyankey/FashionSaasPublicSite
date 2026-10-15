import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  className?: string;
  priceClassName?: string;
  originalPriceClassName?: string;
  currency?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  className,
  priceClassName,
  originalPriceClassName,
  currency = "USD",
}: PriceDisplayProps) {
  const hasDiscount = typeof originalPrice === "number" && originalPrice > price;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold", priceClassName)}>{formatCurrency(price, currency)}</span>
      {hasDiscount && (
        <span className={cn("text-sm text-foreground/40 line-through", originalPriceClassName)}>
          {formatCurrency(originalPrice!, currency)}
        </span>
      )}
    </div>
  );
}
