import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 text-center ${className ?? ""}`}>
      {icon && (
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-secondary">
          {icon}
        </div>
      )}
      <h2 className="text-2xl font-light">{title}</h2>
      {description && <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/65">{description}</p>}
      {action &&
        (action.href ? (
          <Button asChild className="mt-8 rounded-full">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button className="mt-8 rounded-full" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
    </div>
  );
}
