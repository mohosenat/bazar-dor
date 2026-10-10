
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
      <span className="text-sm font-semibold text-slate-600">
        সাজান
      </span>

      <div className="relative">
        <select
          value={params.get("sort") ?? "default"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500"
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

