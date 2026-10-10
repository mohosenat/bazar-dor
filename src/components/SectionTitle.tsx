type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="mb-1 text-sm font-bold text-emerald-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
