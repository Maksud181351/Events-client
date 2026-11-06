"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/PrivateRoute";
import { authFetch } from "@/lib/api";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Health Camp",
  "Education",
  "Blood Donation",
];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

function CreateEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (v) => {
    const e = {};
    if (v.title.trim().length < 5) e.title = "Title komport 5 character er hote hobe";
    if (v.description.trim().length < 20) e.description = "Description komport 20 character er hote hobe";
    if (!v.eventType) e.eventType = "Event type select koro";
    if (!/^https?:\/\/.+/.test(v.thumbnail)) e.thumbnail = "Valid thumbnail URL dao";
    if (v.location.trim().length < 3) e.location = "Location dao";
    if (!v.eventDate) e.eventDate = "Event date dao";
    else if (v.eventDate < tomorrow()) e.eventDate = "Date obossoi future er hote hobe";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const values = Object.fromEntries(f.entries());

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error(Object.values(errs)[0]);
      return;
    }

    try {
      setLoading(true);
      await authFetch("/events", { method: "POST", body: JSON.stringify(values) });
      await Swal.fire({
        icon: "success",
        title: "Event create hoyeche!",
        timer: 1600,
        showConfirmButton: false,
      });
      router.push("/events");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const Err = ({ name }) =>
    errors[name] ? <p className="text-error text-sm mt-1">{errors[name]}</p> : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="section-title">Create a New Event</h2>
      <p className="section-sub">Tomar area-r jonno ekta shomaj seba mulok event toiri koro.</p>

      <form onSubmit={handleSubmit} className="card bg-base-100 border border-base-300 shadow-md">
        <div className="card-body gap-4">
          <div>
            <input name="title" placeholder="Event title" className="input input-bordered w-full" />
            <Err name="title" />
          </div>
          <div>
            <textarea name="description" placeholder="Event description" rows={4} className="textarea textarea-bordered w-full" />
            <Err name="description" />
          </div>
          <div>
            <select name="eventType" defaultValue="" className="select select-bordered w-full">
              <option value="" disabled>Event type select koro</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <Err name="eventType" />
          </div>
          <div>
            <input name="thumbnail" type="url" placeholder="Thumbnail image URL" className="input input-bordered w-full" />
            <Err name="thumbnail" />
          </div>
          <div>
            <input name="location" placeholder="Location (jemon: Mirpur 10, Dhaka)" className="input input-bordered w-full" />
            <Err name="location" />
          </div>
          <div>
            <input name="eventDate" type="date" min={tomorrow()} className="input input-bordered w-full" />
            <Err name="eventDate" />
          </div>
          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner"></span> : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}