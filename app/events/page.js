"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import EventSkeleton from "@/components/EventSkeleton";
import { publicFetch } from "@/lib/api";

const types = ["all", "Cleanup", "Plantation", "Donation", "Food Distribution", "Health Camp", "Education", "Blood Donation"];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const q = new URLSearchParams({ search, type }).toString();
      publicFetch(`/events?${q}`)
        .then((d) => { setEvents(d); setError(""); })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search, type]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="section-title">Upcoming Events</h2>
      <p className="section-sub">Shob upcoming shomaj seba mulok event ek jaygay.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Event title diye khojo..."
          className="input input-bordered w-full"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="select select-bordered sm:w-60">
          {types.map((t) => (
            <option key={t} value={t}>{t === "all" ? "Shob type" : t}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <EventSkeleton count={6} />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center opacity-70 py-10">Kono upcoming event pawa jayni.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
}