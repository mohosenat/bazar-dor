import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import { getCategories, getProducts } from "@/lib/api";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F0F5F0] text-[#1F2922]">

      <main>
        <Hero />

        {/* Today's rising prices */}
        <section className="container py-6 sm:py-7">
          <SectionTitle title="🔺 আজ দাম বেড়েছে" />

          <div className="mt-4">
            <ProductGrid products={risers} />
          </div>
        </section>

        {/* Today's falling prices */}
        <section className="container py-6 sm:py-7">
          <SectionTitle title="🟢 আজ দাম কমেছে" />

          <div className="mt-4">
            <ProductGrid products={fallers} />
          </div>
        </section>

        {/* All products */}
        <section
          id="সব-পণ্য"
          className="container scroll-mt-32 py-6 pb-12 sm:py-8 sm:pb-14"
        >
          <SectionTitle
            title="সব পণ্য"
            description={`${products.length}টি পণ্যের আজকের বাজারদর দেখুন`}
          />

          <div className="mt-4 sm:mt-5">
            <ProductGrid products={products} />
          </div>
        </section>
      </main>

    </div>
  );
}