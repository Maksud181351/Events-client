"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { authFetch, publicFetch } from "@/lib/api";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    publicFetch(`/events/${id}`)
      .then(setEvent)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!session) return;
    authFetch(`/joins/check/${id}`)
      .then((d) => setJoined(d.joined))
      .catch(() => {});
  }, [session, id]);

  const handleJoin = async () => {
    if (!session) {
      toast.error("Join korte age login koro");
      router.push(`/login?redirect=/events/${id}`);
      return;
    }
    try {
      setJoining(true);
      await authFetch("/joins", { method: "POST", body: JSON.stringify({ eventId: id }) });
      setJoined(true);
      Swal.fire({ icon: "success", title: "Event e join hoyeche!", timer: 1600, showConfirmButton: false });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="skeleton h-72 w-full"></div>
        <div className="skeleton h-8 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-20">
        <p className="text-error mb-4">{error || "Event pawa jayni"}</p>
        <Link href="/events" className="btn btn-primary">Shob Event e Fire Jao</Link>
      </div>
    );
  }

  const isPast = event.eventDate < new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <img src={event.thumbnail} alt={event.title} className="w-full h-72 md:h-96 object-cover rounded-2xl mb-6" />
      <span className="badge badge-primary badge-outline mb-3">{event.eventType}</span>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{event.title}</h1>

      <div className="flex flex-wrap gap-5 text-sm opacity-80 mb-6">
        <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {event.location}</span>
        <span className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> {event.eventDate}</span>
        <span className="flex items-center gap-2"><FaUser className="text-primary" /> {event.creatorName}</span>
      </div>

      <p className="leading-relaxed mb-8 whitespace-pre-line">{event.description}</p>

      {isPast ? (
        <button disabled className="btn btn-disabled">Event shesh hoye gese</button>
      ) : joined ? (
        <button disabled className="btn btn-success">Tumi already join koreso ✓</button>
      ) : (
        <button onClick={handleJoin} disabled={joining || isPending} className="btn btn-primary btn-lg">
          {joining ? <span className="loading loading-spinner"></span> : "Join Event"}
        </button>
      )}
    </div>
  );
}