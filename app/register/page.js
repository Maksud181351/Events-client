"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (v) => {
    const e = {};
    if (!v.name.trim()) e.name = "Naam dao";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Valid email dao";
    if (!/^https?:\/\/.+/.test(v.photoURL)) e.photoURL = "Valid photo URL dao";
    if (!/[A-Z]/.test(v.password)) e.password = "Password e ekta uppercase letter thakte hobe";
    else if (!/[a-z]/.test(v.password)) e.password = "Password e ekta lowercase letter thakte hobe";
    else if (v.password.length < 6) e.password = "Password komport 6 character er hote hobe";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const values = {
      name: f.get("name"),
      email: f.get("email"),
      photoURL: f.get("photoURL"),
      password: f.get("password"),
    };

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error(Object.values(errs)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration fail hoyeche");
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Registration successful!",
      text: "Tomake swagotom jani.",
      timer: 1800,
      showConfirmButton: false,
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>

          <div>
            <input name="name" type="text" placeholder="Full name" className="input input-bordered w-full" />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input name="photoURL" type="url" placeholder="Photo URL" className="input input-bordered w-full" />
            {errors.photoURL && <p className="text-error text-sm mt-1">{errors.photoURL}</p>}
          </div>
          <div>
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
          </div>

          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner"></span> : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}