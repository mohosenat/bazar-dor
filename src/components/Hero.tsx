import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/bazar-hero.png";

export default function Hero() {
  return (
    <section className="container py-8 sm:py-10 lg:py-12">
      <div className="relative grid items-center gap-6 overflow-hidden rounded-3xl border border-[#E1E8E1] bg-[#FAFCFA] px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-2 lg:px-14 lg:py-12">
        {/* Left: Text */}
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-[#F3FBFA] px-3 py-1.5 text-xs font-bold text-[#047F39]">
            আজকের বাজারের সর্বশেষ তথ্য
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#202820] sm:text-4xl lg:text-5xl">
            বাজারের দাম,
            <br />
            <span className="text-[#05893E]">এক নজরে।</span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, সবজি, মাছ, মাংসসহ প্রয়োজনীয় পণ্যের আজকের দাম ও
            বাজারভেদে মূল্য তুলনা করুন।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-flex items-center rounded-xl bg-[#05893E] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#047F39]"
          >
            সব পণ্য দেখুন
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right: Your Hero Image */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src={heroImage}
            alt="বাজারের পণ্য"
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
