"use client";

import type { Product } from "@/types/product";
import { formatPercentage, toBanglaNumber } from "@/lib/utils";

function getBanglaUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ml: "মিলিলিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
    pound: "পাউন্ড",
  };

  return units[unit.toLowerCase()] ?? unit;
}

export default function PriceTicker({
  products,
}: {
  products: Product[];
}) {
  const items = products.slice(0, 12);

  if (!items.length) return null;

  return (
    <div className="overflow-hidden border-t border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="ticker-track flex w-max">
        {[...items, ...items].map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex shrink-0 items-center gap-2 border-r border-slate-200 px-5 py-2.5 text-xs"
          >
            <span>{p.image}</span>

            <b className="whitespace-nowrap text-slate-700">
              {p.nameBn}
            </b>

            <span className="whitespace-nowrap font-bold text-slate-900">
              ৳{toBanglaNumber(p.today)}
            </span>

            <span className="whitespace-nowrap font-bold text-slate-700">
              / {getBanglaUnit(p.unit)}
            </span>

            <span
              className={
                p.change.dir === "up"
                  ? "whitespace-nowrap font-bold text-red-600"
                  : "whitespace-nowrap font-bold text-green-700"
              }
            >
              {p.change.dir === "up" ? "▲" : "▼"}{" "}
              {formatPercentage(p.change.pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}