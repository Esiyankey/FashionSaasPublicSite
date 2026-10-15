import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

interface CategoryCardProps {
  data: Category;
  className?: string;
  titleSize?: string;
  priority?: boolean;
}

export async function CategoryCards() {
  const categoriesData = await getCategories();

  return (
    <section className="bg-white px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Shop by Category</p>
          <h2 className="mt-3 text-3xl text-gray-900 md:text-4xl">
            Discover tailored collections built around how people actually shop.
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:h-[620px] lg:grid-cols-2">
            {Array.from({ length: 3 }, (_, index) => {
              const category = categoriesData[index] ?? {
                id: `empty-${index}`,
                slug: "",
                title: "New Collection",
                image: null,
                imageAlt: "",
                itemCount: 0,
                description: "",
                subCategories: [],
                parentId: null,
              };
              return (
              <CategoryCard key={category.id} data={category}
                className={index === 0 ? "min-h-[420px] lg:row-span-2 lg:min-h-0" : "min-h-[300px]"}
                titleSize={index === 0 ? "text-4xl" : "text-3xl"} priority={index === 0} />
              );
            })}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  data,
  className = "",
  titleSize = "text-3xl",
  priority = false,
}: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${encodeURIComponent(data.slug)}`}
      className={`group relative block overflow-hidden bg-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {data.image && <Image
        src={data.image}
        alt={data.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8">
        <p className="mb-2 text-sm font-medium opacity-90">{data.itemCount} Items</p>

        <h3 className={`${titleSize} mb-2 font-bold tracking-tight`}>{data.title}</h3>

        {data.description && (
          <p className="mb-4 max-w-xs text-sm text-gray-200 line-clamp-2">{data.description}</p>
        )}

        <div className="flex flex-col gap-x-4 gap-y-1">
          {data.subCategories.map((subCategory) => (
            <span
              key={subCategory}
              className="text-xs font-semibold uppercase tracking-wider opacity-70 transition-opacity group-hover:opacity-100"
            >
              {subCategory}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
