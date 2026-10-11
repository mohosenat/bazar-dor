import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import { Triangle } from "lucide-react";
import { getProducts } from "@/lib/api";

type HomeProps = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const [{ sort }, products] = await Promise.all([
    searchParams,
    getProducts(),
  ]);

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const sortedProducts = [...products];

  if (sort === "asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0] text-[#1F2922]">
      <main>
        <Hero />

        {/* Today's rising prices */}
        <section className="container py-6 sm:py-7">
          <div className="mb-4 flex items-center gap-2">
            <Triangle
              size={11}
              fill="#dc2626"
              stroke="#dc2626"
            />
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="mt-4">
            <ProductGrid products={risers} />
          </div>
        </section>

        {/* Today's falling prices */}
        <section className="container py-6 sm:py-7">
          <div className="mb-4 flex items-center gap-2">
            <Triangle
              size={11}
              fill="#16a34a"
              stroke="#16a34a"
              className="rotate-180"
            />
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="mt-4">
            <ProductGrid products={fallers} />
          </div>
        </section>

        {/* All products */}
        <section
          id="সব-পণ্য"
          className="container scroll-mt-32 py-6 pb-12 sm:py-8 sm:pb-14"
        >
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {products.length}টি পণ্যের আজকের বাজারদর দেখুন
            </p>
          </div>

          <div className="mt-4 sm:mt-5">
            <ProductGrid products={sortedProducts} />
          </div>
        </section>
      </main>
    </div>
  );
}