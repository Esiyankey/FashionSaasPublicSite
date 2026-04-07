"use client";

import Image from "next/image";
import categoriesData from "../lib/categoriesData";

interface CategoryCardProps {
  data: {
    image: string;
    imageAlt: string;
    itemCount: string | number;
    title: string;
    description?: string;
    subCategories: string[];
  };
  className?: string;
  titleSize?: string;
  priority?: boolean;
}

export function CategoryCards() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px] lg:h-[600px]">
          {/* Large Card (Women) */}
          <CategoryCard
            data={categoriesData[0]}
            className="lg:row-span-2"
            titleSize="text-4xl"
            priority
          />

          {/* Top Right (Men) */}
          <CategoryCard data={categoriesData[1]} titleSize="text-3xl" />

          {/* Bottom Right (Accessories) */}
          <CategoryCard data={categoriesData[2]} titleSize="text-3xl" />
        </div>
      </div>
    </section>
  );
}

// Sub-component to keep the code clean and DRY
function CategoryCard({
  data,
  className = "",
  titleSize = "text-3xl",
  priority = false,
}: CategoryCardProps) {
  return (
    <div
      className={`group relative  overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}
    >
      {/* Background Image */}
      <Image
        src={data.image}
        alt={data.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Overlay Gradient (Crucial for Text Contrast) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <p className="text-sm font-medium mb-2 opacity-90">
          {data.itemCount} Items
        </p>

        <h3 className={`${titleSize} font-bold mb-2 tracking-tight`}>
          {data.title}
        </h3>

        {data.description && (
          <p className="text-sm text-gray-200 max-w-xs mb-4 line-clamp-2">
            {data.description}
          </p>
        )}

        <div className="flex flex-col gap-x-4 gap-y-1">
          {data.subCategories.map((subCat, i) => (
            <span
              key={i}
              className="text-xs font-semibold uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity"
            >
              {subCat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
