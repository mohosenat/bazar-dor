export default function Footer() {
  return (
    <footer className="mt-4 border-t border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-5 text-center text-[11px] leading-relaxed text-slate-500 sm:flex-row sm:justify-between sm:gap-4 sm:py-6 sm:text-left sm:text-sm">
        <p className="font-bold text-slate-700">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}

