"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({
  mode,
}: {
  mode: "signin" | "signup";
}) {
  const signup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (signup && password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const r = signup
        ? await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: "/",
          })
        : await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
          });

      if (r.error) {
        toast.error(r.error.message || "অনুরোধটি সম্পন্ন করা যায়নি");
        return;
      }

      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে!"
          : "সফলভাবে সাইন ইন হয়েছে!"
      );

      router.push("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function social(provider: "google" | "github") {
    try {
      const r = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (r.error) {
        toast.error(r.error.message || "Social login ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("Social login ব্যর্থ হয়েছে");
    }
  }

  const inputClass =
    "h-[31px] w-full rounded-[7px] border border-[#e2e9e2] bg-transparent px-[10px] text-[11px] font-normal text-[#252d27] outline-none transition focus:border-[#008b43] focus:ring-1 focus:ring-[#008b43]/15 placeholder:text-[#737b74]";

  const labelClass =
    "mb-[4px] block text-[11px] font-medium text-[#303a32]";

  return (
    <form onSubmit={submit} className="space-y-[12px]">
      {signup && (
        <label className="block">
          <span className={labelClass}>নাম</span>
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="যেমন: রহিম উদ্দিন"
          />
        </label>
      )}

      <label className="block">
        <span className={labelClass}>ইমেইল</span>
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </label>

      <label className="block">
        <span className={labelClass}>পাসওয়ার্ড</span>
        <input
          required
          minLength={8}
          type="password"
          autoComplete={signup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="কমপক্ষে ৮ অক্ষর"
        />
      </label>

      {signup && (
        <label className="block">
          <span className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</span>
          <input
            required
            minLength={8}
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            placeholder="আবার লিখুন"
          />
        </label>
      )}

      <button
        disabled={loading}
        className="h-[32px] w-full rounded-[7px] bg-[#008b43] px-3 text-[11px] font-bold text-white shadow-[0_2px_3px_rgba(0,100,45,0.25)] transition hover:bg-[#007a3a] disabled:opacity-60"
      >
        {loading
          ? "অপেক্ষা করুন..."
          : signup
            ? "অ্যাকাউন্ট তৈরি করুন"
            : "সাইন ইন"}
      </button>

      <div className="relative py-[2px] text-center text-[10px] text-[#626b63]">
        <span className="relative z-10 bg-[#fbfdfb] px-3">
          অথবা
        </span>
        <span className="absolute left-0 right-0 top-1/2 border-t border-[#e0e6e0]" />
      </div>

      <div className="grid grid-cols-2 gap-[6px]">
        <button
          type="button"
          onClick={() => social("google")}
          className="flex h-[31px] items-center justify-center gap-[5px] whitespace-nowrap rounded-[6px] border border-[#e2e9e2] px-1 text-[10px] font-semibold text-[#263129] transition hover:bg-[#f1f6f1]"
        >
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px]" aria-hidden="true">
            <path fill="#4285F4" d="M23 12.24c0-.74-.07-1.45-.19-2.14H12v4.05h6.17a5.28 5.28 0 0 1-2.29 3.46v2.83h3.71C21.76 18.43 23 15.57 23 12.24Z"/>
            <path fill="#34A853" d="M12 23c3.1 0 5.7-1.03 7.59-2.79l-3.71-2.83c-1.03.69-2.34 1.1-3.88 1.1-2.99 0-5.52-2.02-6.43-4.74H1.74v2.91A11.47 11.47 0 0 0 12 23Z"/>
            <path fill="#FBBC05" d="M5.57 13.74a6.9 6.9 0 0 1 0-3.48V7.35H1.74a11.02 11.02 0 0 0 0 9.3l3.83-2.91Z"/>
            <path fill="#EA4335" d="M12 4.52c1.69 0 3.2.58 4.39 1.73l3.29-3.29C17.7 1.13 15.1 0 12 0A11.47 11.47 0 0 0 1.74 7.35l3.83 2.91C6.48 6.54 9.01 4.52 12 4.52Z"/>
          </svg>
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          onClick={() => social("github")}
          className="flex h-[31px] items-center justify-center gap-[5px] whitespace-nowrap rounded-[6px] border border-[#e2e9e2] px-1 text-[10px] font-semibold text-[#263129] transition hover:bg-[#f1f6f1]"
        >
          <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] fill-current" aria-hidden="true">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>
          </svg>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="pt-[1px] text-center text-[10px] text-[#555f57]">
        {signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link
          className="font-semibold text-[#008b43] hover:underline"
          href={signup ? "/signin" : "/signup"}
        >
          {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </form>
  );
}
