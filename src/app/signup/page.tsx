import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f0f5f0]">
      <section className="flex flex-1 flex-col items-center px-4 pb-8 pt-10">
        <header className="mb-5 text-center">
          <h1 className="text-[18px] font-bold leading-7 text-[#202820]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-1 max-w-[340px] text-[11px] leading-[18px] text-[#727b73]">
            বিস্তারিত বাজারদর ও অন্যান্য সুবিধা পেতে আজই যোগ দিন।
          </p>
        </header>

        <div className="w-full max-w-[320px] rounded-[12px] border border-[#e1e8e1] bg-[#fafcfa] p-[18px]">
          <AuthForm mode="signup" />
        </div>

        <Link
          href="/"
          className="mt-5 text-[11px] text-[#858d86] transition-colors hover:text-[#008b43]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}

