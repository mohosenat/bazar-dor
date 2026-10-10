"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  if (isPending) {
    return <main className="p-8">লোড হচ্ছে...</main>;
  }

  if (!session) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#f0f5f0] px-4">
        <div className="rounded-xl border border-[#e1e8e1] bg-white p-6">
          <p>প্রোফাইল দেখতে সাইন ইন করুন।</p>
          <Link
            href="/signin"
            className="mt-3 inline-block text-green-700 underline"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("আপনার নাম লিখুন।");
      return;
    }

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        setMessage("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      setMessage("নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }

  return (
    <main className="min-h-[60vh] bg-[#f0f5f0] px-4 py-6 sm:py-8">
      <div className="mx-auto max-w-[582px]">
        <header className="mb-5">
          <h1 className="text-xl font-bold text-[#202820] sm:text-2xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-xs text-[#758078] sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <img
                src={user.image}
                alt="প্রোফাইল ছবি"
                className="h-14 w-14 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e8eee8] text-xl font-bold text-green-800">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-xs text-[#68716a] sm:text-sm">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await authClient.signOut();
              window.location.href = "/signin";
            }}
            className="self-start rounded-lg border border-red-400 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50 sm:self-center"
          >
            ↪ সাইন আউট
          </button>
        </section>

        <section className="mt-5 rounded-xl border border-[#e1e8e1] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-base font-bold">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-7">
            <label
              htmlFor="profile-name"
              className="mb-1 block text-xs"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name || ""}
              className="h-9 w-full rounded-lg border border-[#e1e8e1] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {message && (
              <p role="status" className="mt-3 text-sm text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="mt-3 h-9 w-full rounded-lg bg-[#07883f] text-sm font-semibold text-white shadow-[0_3px_2px_rgba(0,0,0,0.2)] transition hover:bg-[#067536]"
            >
              আপডেট
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

