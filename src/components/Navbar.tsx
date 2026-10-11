"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound, LogOut, ChevronDown } from "lucide-react";

import logoImage from "@/assets/logo-icon.png";
import type { Category, Product } from "@/types/product";
import { authClient } from "@/lib/auth-client";
import PriceTicker from "./PriceTicker";

export default function Navbar({
  categories = [],
  products = [],
}: {
  categories?: Category[];
  products?: Product[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [date, setDate] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );
  }, []);

  const navCategories = [
    { id: "home", name: "হোম", href: "/", icon: "⌂" },
    ...categories.map((category) => ({
      id: category.id,
      name: category.nameBn ?? category.name ?? category.id,
      href: `/category/${category.id}`,
      icon: category.icon ?? "•",
    })),
  ];

  const userInitial = (user?.name || user?.email || "U")
    .trim()
    .charAt(0)
    .toLocaleUpperCase();

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await authClient.signOut();
      setUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  function closeMenus() {
    setUserMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-[#FAFCFA]/95 shadow-sm backdrop-blur-xl">
      <div className="container">
        {/* Logo and Account */}
        <div className="flex min-h-[68px] items-center justify-between gap-3">
          <Link
            href="/"
            onClick={closeMenus}
            className="flex min-w-0 items-center gap-2.5"
          >
            <Image
              src={logoImage}
              alt="বাজার দর লোগো"
              width={42}
              height={42}
              priority
              className="h-10 w-10 shrink-0 rounded-xl object-contain"
            />

            <span>
              <strong className="block text-lg font-black text-slate-900 sm:text-xl">
                বাজার দর
              </strong>
              <small className="block text-[10px] text-slate-500">
                {date || "আজকের বাজার"}
              </small>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {!isPending && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-emerald-50"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                    {userInitial}
                  </span>

                  <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-800 sm:block">
                    {user.name || "আমার অ্যাকাউন্ট"}
                  </span>

                  <ChevronDown size={15} className="hidden text-slate-500 sm:block" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-emerald-100 bg-white p-3 shadow-xl">
                    <div className="flex items-center gap-3 p-2">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 font-extrabold text-emerald-800">
                        {userInitial}
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-800">
                          {user.name || "ব্যবহারকারী"}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-slate-100" />

                    <Link
                      href="/profile"
                      onClick={closeMenus}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition hover:bg-emerald-50"
                    >
                      <UserRound size={16} />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <span className="text-lg leading-none">↪</span>
                      {loggingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
                    </button>
                  </div>
                )}
              </div>
            ) : !isPending ? (
              <>
                <Link
                  href="/signin"
                  className="rounded-xl px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-emerald-50 sm:text-sm"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            ) : (
              <span className="h-9 w-20 animate-pulse rounded-xl bg-emerald-50" />
            )}
          </div>
        </div>

        {/* Category Navigation */}
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex min-h-11 items-center gap-2 overflow-x-auto border-t border-emerald-100 py-1"
        >
          {navCategories.map((category) => {
            const active =
              category.href === "/"
                ? pathname === "/"
                : pathname === category.href ||
                  pathname.startsWith(`${category.href}/`);

            return (
              <Link
                key={category.id}
                href={category.href}
                onClick={closeMenus}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-emerald-100 text-emerald-800"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {category.icon} {category.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Scrolling Price Ticker */}
      <PriceTicker products={products} />
    </header>
  );
}

