import { getCategories, getProduct } from "@/lib/api";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  formatPrice,
  getUnitLabel,
  toBanglaNumber,
} from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?next=/product/${id}`);
  }

  const [product, cats] = await Promise.all([
    getProduct(Number(id)),
    getCategories(),
  ]);

  if (!product) notFound();

  const markets = product.markets ?? [];

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
    : product.today;

  const lowestPrice = Math.min(
    product.today,
    ...markets.map((market) => market.min)
  );

  const highestPrice = Math.max(
    product.today,
    ...markets.map((market) => market.max)
  );

  return (
    <>
      <main className="min-h-[calc(100vh-130px)] bg-[#f0f5f0]">
        <div className="container mx-auto max-w-[1100px] px-4 py-5 sm:px-6 sm:py-6">

          {/* Breadcrumb */}
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#69736a]">
            <Link href="/" className="transition hover:text-emerald-700">
              হোম
            </Link>
            <span>›</span>
            <span>{product.categoryNameBn}</span>
            <span>›</span>
            <span className="text-[#263128]">
              {product.nameBn}
            </span>
          </nav>

          {/* Product Header */}
          <section className="flex flex-col gap-4 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-[72px] sm:w-[72px] sm:text-4xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-extrabold text-[#202a21] sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-xs text-[#7a827a]">
                  {product.categoryNameBn} · {getUnitLabel(product.unit)}
                </p>

                <p className="mt-2 text-xs text-[#566057]">
                  বাজারের সর্বশেষ দর এবং মূল্য পরিবর্তন
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:min-w-[105px]">
              <p className="text-[11px] text-[#7a827a]">
                আজকের দর
              </p>

              <p className="mt-1 text-2xl font-black text-[#253328]">
                {toBanglaNumber(product.today)}
              </p>

              <p className="text-[11px] text-[#69736a]">
                টাকা / {getUnitLabel(product.unit)}
              </p>
            </div>
          </section>

          {/* Price Summary */}
          <section className="mt-4 rounded-xl border border-[#e1e9e1] bg-[#fafcf9] p-3 sm:p-4">
            <h2 className="mb-3 text-sm font-extrabold text-[#263128]">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Stat
                label="সর্বনিম্ন দাম"
                value={formatPrice(lowestPrice)}
                color="text-emerald-600"
                description="বাজারের সর্বনিম্ন দর"
              />

              <Stat
                label="সর্বোচ্চ দাম"
                value={formatPrice(highestPrice)}
                color="text-red-500"
                description="বাজারের সর্বোচ্চ দর"
              />

              <Stat
                label="গড় দাম"
                value={formatPrice(averagePrice)}
                color="text-emerald-600"
                description="বাজারের গড় দর"
              />
            </div>

            {/* Market Price Table */}
            <h2 className="mb-3 mt-5 text-sm font-extrabold text-[#263128]">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[#e5ebe5]">
              <table className="w-full min-w-[650px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e5ebe5] bg-[#fafcf9] text-[#707970]">
                    <th className="px-3 py-3 font-semibold">বাজার</th>
                    <th className="px-3 py-3 font-semibold">বিভাগ</th>
                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-3 py-3 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className={`border-b border-[#e0e7e0] last:border-b-0 ${
                          index % 2 === 1
                            ? "bg-[#f0f5f0]"
                            : "bg-[#fafcf9]"
                        }`}
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-[#354036]">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-[#59635a]">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right text-[#465047]">
                          {toBanglaNumber(market.min)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right text-[#465047]">
                          {toBanglaNumber(market.max)} টাকা
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right font-bold text-[#28342a]">
                          {toBanglaNumber(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}

                  {markets.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-[#7a827a]"
                      >
                        এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  color,
  description,
}: {
  label: string;
  value: string;
  color: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5ebe5] bg-[#fafcf9] px-3 py-3">
      <p className="text-[11px] font-medium text-[#687168]">
        {label}
      </p>

      <p className={`mt-1 text-lg font-extrabold ${color}`}>
        {value}
      </p>

      <p className="mt-1 text-[10px] text-[#7a827a]">
        {description}
      </p>
    </div>
  );
}