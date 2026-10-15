"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder = "Search...", className, autoFocus }: SearchBarProps) {
  return (
    <div className={cn("flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2", className)}>
      <Search className="size-4 text-foreground/50" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
      />
      {value.length > 0 && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search">
          <X className="size-4 text-foreground/50 hover:text-foreground" />
        </button>
      )}
    </div>
  );
}
