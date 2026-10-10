import Link from "next/link";
import type { Product } from "@/types/product";
import {
  formatPercentage,
  formatPrice,
  getUnitLabel,
} from "@/lib/utils";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const up = product.change.dir === "up";
  const unchanged = Number(product.change.pct) === 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 transition-colors duration-200 hover:border-[#1A9951] sm:p-3"
    >
      {/* Product icon and information */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F0F5F0] text-xl">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-bold leading-5 text-[#202820] group-hover:text-[#047F39]">
            {product.nameBn}
          </h3>

          <p className="text-[10px] leading-4 text-[#747B74]">
            {getUnitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* Price and change badge */}
      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] leading-4 text-[#747B74]">
            আজকের দাম
          </p>

          <p className="text-sm font-extrabold leading-5 text-[#202820]">
            {formatPrice(product.today)}
          </p>
        </div>

        <span
          className={`mb-0.5 shrink-0 rounded-full px-2 py-1 text-[9px] font-bold leading-none ${
            unchanged
              ? "bg-[#F0F5F0] text-[#747B74]"
              : up
                ? "bg-[#FBEFED] text-[#D94040]"
                : "bg-[#EAF5EC] text-[#05893E]"
          }`}
        >
          {unchanged ? "—" : up ? "▲" : "▼"}{" "}
          {formatPercentage(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
}