export default function Loading() {
  return (
    <main className="container py-10">
      <p className="mb-5 text-center text-sm font-semibold text-slate-600">
        পণ্যের তথ্য লোড হচ্ছে...
      </p>

      <div className="h-72 animate-pulse rounded-[2rem] bg-slate-100" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    </main>
  );
}
