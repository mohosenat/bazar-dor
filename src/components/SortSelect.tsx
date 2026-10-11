
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();

  const handleSortChange = (value: string) => {
    const query = new URLSearchParams(params.toString());

    if (value === "default") {
      query.delete("sort");
    } else {
      query.set("sort", value);
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-600 sm:text-sm">
        সাজান
      </span>

      <div className="relative">
        <select
          value={params.get("sort") ?? "default"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 bg-[#FAFCFA] py-1.5 pl-2 pr-7 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-500 sm:py-2 sm:pl-3 sm:pr-9 sm:text-sm"
          aria-label="পণ্য সাজান"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </div>
  );
}

