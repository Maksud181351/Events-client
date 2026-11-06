"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import PrivateRoute from "@/components/PrivateRoute";
import EventSkeleton from "@/components/EventSkeleton";
import { authFetch } from "@/lib/api";

function JoinedEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch("/joins")
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="section-title">Joined Events</h2>
      <p className="section-sub">Tumi ja ja event e join koreso, date onujayi sajano.</p>

      {loading ? (
        <EventSkeleton count={3} />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : items.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4 opacity-70">Tumi ekhono kono event e join koro ni.</p>
          <Link href="/events" className="btn btn-primary">Event Khuje Dekho</Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((j) => (
            <div key={j._id} className="card bg-base-100 shadow-md border border-base-300 h-full">
              <figure className="h-48">
                <img src={j.eventThumbnail} alt={j.eventTitle} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <span className="badge badge-primary badge-outline">{j.eventType}</span>
                <h3 className="card-title line-clamp-1">{j.eventTitle}</h3>
                <p className="flex items-center gap-2 text-sm opacity-80">
                  <FaMapMarkerAlt className="text-primary" /> {j.eventLocation}
                </p>
                <p className="flex items-center gap-2 text-sm opacity-80">
                  <FaCalendarAlt className="text-primary" /> {j.eventDate}
                </p>
                <div className="card-actions mt-auto pt-3">
                  <Link href={`/events/${j.eventId}`} className="btn btn-primary w-full">View Event</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEvents />
    </PrivateRoute>
  );
}