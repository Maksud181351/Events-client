"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "./EventCard";
import EventSkeleton from "./EventSkeleton";
import { publicFetch } from "@/lib/api";

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicFetch("/events/upcoming?limit=6")
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="section-title">Recent Upcoming Events</h2>
      <p className="section-sub">Tomar kache-r shomaj seba mulok kaj gulo dekho ar join koro.</p>

      {loading ? (
        <EventSkeleton count={6} />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : events.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4 opacity-70">Ekhono kono upcoming event nai.</p>
          <Link href="/create-event" className="btn btn-primary">Prothom event ta tumi banao</Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="btn btn-outline btn-primary">Sob Event Dekho</Link>
          </div>
        </>
      )}
    </section>
  );
}