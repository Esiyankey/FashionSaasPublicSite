import Image from "next/image";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  image: string;
  breadcrumbLabel: string;
}

export function PageHeader({ title, image, breadcrumbLabel }: PageHeaderProps) {
  return (
    <section className="relative flex h-[35vh] flex-col items-center justify-center">
      <Image src={image} alt={title} fill priority className="object-cover brightness-75" />
      <div className="relative z-10 text-center text-white">
        <h1 className="mb-3 text-5xl font-bold">{title}</h1>
        <nav className="text-sm font-medium uppercase tracking-widest">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <span className="mx-2">&bull;</span>
          <span className="opacity-70">{breadcrumbLabel}</span>
        </nav>
      </div>
    </section>
  );
}
