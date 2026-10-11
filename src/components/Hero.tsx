import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/bazar-hero.png";

export default function Hero() {
  return (
    <section className="container py-6 sm:py-7">
      <div className="relative grid min-h-[220px] items-center gap-4 overflow-hidden rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] px-5 py-6 sm:min-h-[240px] sm:grid-cols-[1.5fr_0.8fr] sm:px-8 sm:py-8 lg:px-10">
        {/* Left: Text */}
        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-[#E1F4E8] px-3 py-1.5 text-xs font-bold text-[#047F39]">
            সোমবার, ৬ অক্টোবর, ২০২৬
          </span>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#202820] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-lg text-xs leading-6 text-[#68736B] sm:text-sm sm:leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, দ্রুত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-5 inline-flex items-center rounded-lg bg-[#05893E] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#047F39]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right: Hero Illustration */}
        <div className="relative mx-auto w-full max-w-[230px] sm:max-w-[260px]">
          <Image
            src={heroImage}
            alt="বাজারের ফল ও সবজির ঝুড়ি"
            priority
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 70vw, 260px"
          />
        </div>
      </div>
    </section>
  );
}