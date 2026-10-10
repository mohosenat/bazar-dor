"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      const response = await authClient.getSession();

      if (!response.data) {
        router.replace("/signin");
        return;
      }

      setName(response.data.user.name || "");
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const response = await authClient.updateUser({ name });

    setSaving(false);

    if (response.error) {
      toast.error(
        response.error.message || "আপডেট ব্যর্থ হয়েছে"
      );
      return;
    }

    toast.success("তথ্য আপডেট হয়েছে");

    router.push("/profile");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center">
        লোড হচ্ছে...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container py-12">
        <Link
          href="/profile"
          className="text-sm font-bold text-emerald-600"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>

        <form
          onSubmit={save}
          className="mt-6 max-w-xl rounded-[2rem] bg-white p-7 shadow-sm sm:p-9"
        >
          <h1 className="text-2xl font-black">
            Update Information
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            আপনার নাম পরিবর্তন করুন।
          </p>

          <label className="mt-7 block">
            <span className="mb-2 block text-sm font-bold">
              Name
            </span>

            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </main>
  );
}
