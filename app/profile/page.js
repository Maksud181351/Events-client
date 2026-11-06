"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";

function Profile() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const user = session?.user;

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const name = f.get("name").trim();
    const image = f.get("image").trim();

    if (name.length < 2) return toast.error("Naam komport 2 character er hote hobe");
    if (!/^https?:\/\/.+/.test(image)) return toast.error("Valid photo URL dao");

    setSaving(true);
    const { error } = await authClient.updateUser({ name, image });
    setSaving(false);

    if (error) return toast.error(error.message || "Update kora jayni");
    toast.success("Profile update hoyeche");
    router.refresh();
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="section-title">My Profile</h2>
      <div className="card bg-base-100 border border-base-300 shadow-md mt-6">
        <form key={user.id} onSubmit={handleSubmit} className="card-body gap-4 items-center">
          <img
            src={user.image || "https://i.ibb.co/2kR5zq0/avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />
          <p className="text-sm opacity-70">{user.email}</p>
          <input name="name" defaultValue={user.name} placeholder="Naam" className="input input-bordered w-full" />
          <input name="image" defaultValue={user.image || ""} placeholder="Photo URL" className="input input-bordered w-full" />
          <button disabled={saving} className="btn btn-primary w-full">
            {saving ? <span className="loading loading-spinner"></span> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}