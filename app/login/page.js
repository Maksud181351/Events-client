"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const email = f.get("email");
    const password = f.get("password");

    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Valid email dao");
    if (!password) return toast.error("Password dao");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "Email ba password vul");

    await Swal.fire({
      icon: "success",
      title: "Login successful!",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push(redirect);
    router.refresh();
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google login fail hoyeche");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" />

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogle} className="btn btn-outline w-full">
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-sm">
            New here?{" "}
            <Link href="/register" className="link link-primary font-semibold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}