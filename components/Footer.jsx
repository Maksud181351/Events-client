import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-3">SevaLink</h3>
          <p className="text-sm opacity-80">
            Ekti community-driven platform jekhane tumi samajik seba mulok event create, join ar track korte paro.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/events" className="hover:text-primary">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:text-primary">Create Event</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm opacity-80">Dhaka, Bangladesh</p>
          <p className="text-sm opacity-80 mb-4">support@sevalink.com</p>
          <div className="flex gap-3 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-primary"><FaFacebookF /></a>
            <a href="#" aria-label="X" className="hover:text-primary"><FaXTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary"><FaLinkedinIn /></a>
            <a href="#" aria-label="GitHub" className="hover:text-primary"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-sm py-4 opacity-70">
        © 2026 SevaLink. All rights reserved.
      </div>
    </footer>
  );
}