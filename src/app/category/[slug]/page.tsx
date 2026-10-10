import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";

import { getCategories, getCategoryProducts } from "@/lib/api";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const [cats, products] = await Promise.all([
    getCategories(),
    getCategoryProducts(slug),
  ]);

  const category = cats.find((c) => c.id === slug);

  if (!category || !products.length) {
    notFound();
  }

  const sorted = [...products];

  if (sp.sort === "asc") {
    sorted.sort((a, b) => a.today - b.today);
  }

  if (sp.sort === "desc") {
    sorted.sort((a, b) => b.today - a.today);
  }

  return (
    <main className="min-h-[530px] bg-[#f0f5f0]">
      <div className="mx-auto max-w-[1060px] px-4 py-5 sm:px-6 sm:py-6">

        {/* Category Header */}
        <section className="flex min-h-[75px] items-center gap-3 rounded-[14px] border border-[#e0e8e0] bg-[#fafcf9] px-4 py-4 sm:px-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0f4ef] text-[27px]">
            {category.icon ?? "🛒"}
          </span>

          <div>
            <h1 className="text-[22px] font-extrabold leading-tight text-[#202820]">
              {category.nameBn ?? category.name ?? slug}
            </h1>

            <p className="mt-1 text-[12px] text-[#737b73]">
              {products.length}টি পণ্যের আজকের দর ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="mt-5 flex min-h-[53px] items-center justify-end gap-2 rounded-[14px] border border-[#e0e8e0] bg-[#fafcf9] px-4 py-2">

          <SortSelect />
          
        </section>

        {/* Product Count */}
        <p className="mb-3 mt-4 text-[12px] text-[#687168]">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Grid */}
        <section
          aria-label={`${category.nameBn ?? category.name ?? slug} পণ্যের তালিকা`}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sorted.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
