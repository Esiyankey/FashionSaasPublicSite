"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  const showPrevious = () => {
    setSelectedImage((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const showNext = () => {
    setSelectedImage((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-secondary">
        <Image
          src={images[selectedImage]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 transition-colors hover:bg-white"
          aria-label="Previous product image"
        >
          <ChevronLeft className="size-5 text-primary" />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-2 transition-colors hover:bg-white"
          aria-label="Next product image"
        >
          <ChevronRight className="size-5 text-primary" />
        </button>
      </div>

      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all",
              index === selectedImage
                ? "border-accent"
                : "border-border hover:border-accent/50",
            )}
            aria-label={`View ${name} image ${index + 1}`}
          >
            <Image src={image} alt={`${name} thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
