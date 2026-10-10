export default function Loading() {
  return (
    <main className="container py-10">
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
