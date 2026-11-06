import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function EventCard({ event }) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300 h-full">
      <figure className="h-48">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <span className="badge badge-primary badge-outline">{event.eventType}</span>
        <h3 className="card-title line-clamp-1">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FaMapMarkerAlt className="text-primary" /> {event.location}
        </p>
        <p className="flex items-center gap-2 text-sm opacity-80">
          <FaCalendarAlt className="text-primary" /> {event.eventDate}
        </p>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}