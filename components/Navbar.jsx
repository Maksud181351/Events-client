"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logout hoyeche");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-10">
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold text-primary">
          SevaLink
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Upcoming Events</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.name}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.name || "User"}
                    src={user.image || "https://i.ibb.co/2kR5zq0/avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-base-300"
              >
                <li><Link href="/create-event">Create Event</Link></li>
                <li><Link href="/manage-events">Manage Events</Link></li>
                <li><Link href="/joined-events">Joined Events</Link></li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-primary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}