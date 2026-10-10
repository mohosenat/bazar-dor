import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5">
      <div className="text-center">
        <div className="text-7xl">🛒</div>

        <h1 className="mt-5 text-4xl font-black">
          পাতাটি পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-slate-500">
          আপনি যে পেজটি খুঁজছেন সেটি আর নেই বা ভুল ঠিকানা।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
