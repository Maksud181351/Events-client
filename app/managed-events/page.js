"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/PrivateRoute";
import { authFetch } from "@/lib/api";

const eventTypes = ["Cleanup", "Plantation", "Donation", "Food Distribution", "Health Camp", "Education", "Blood Donation"];

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const modalRef = useRef(null);

  const load = () =>
    authFetch("/my-events")
      .then(setEvents)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const openEdit = (ev) => {
    setEditing(ev);
    setErrors({});
    modalRef.current?.showModal();
  };

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

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    const values = Object.fromEntries(new FormData(ev.currentTarget).entries());
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return toast.error(Object.values(errs)[0]);

    try {
      setSaving(true);
      await authFetch(`/events/${editing._id}`, { method: "PUT", body: JSON.stringify(values) });
      modalRef.current?.close();
      toast.success("Event update hoyeche");
      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ev) => {
    const res = await Swal.fire({
      title: "Event ta delete korbe?",
      text: "Eta ar fire ana jabe na.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ha, delete koro",
      cancelButtonText: "Na",
      confirmButtonColor: "#d33",
    });
    if (!res.isConfirmed) return;
    try {
      await authFetch(`/events/${ev._id}`, { method: "DELETE" });
      setEvents((prev) => prev.filter((x) => x._id !== ev._id));
      toast.success("Event delete hoyeche");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const Err = ({ name }) =>
    errors[name] ? <p className="text-error text-sm mt-1">{errors[name]}</p> : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="section-title">Manage Events</h2>
      <p className="section-sub">Tomar banano event gulo ekhane update ba delete korte paro.</p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-16 w-full"></div>)}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4 opacity-70">Tumi ekhono kono event banao ni.</p>
          <Link href="/create-event" className="btn btn-primary">Event Create Koro</Link>
        </div>
      ) : (
        <div className="overflow-x-auto border border-base-300 rounded-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={ev.thumbnail} alt={ev.title} className="w-14 h-14 rounded-lg object-cover" />
                      <Link href={`/events/${ev._id}`} className="font-semibold hover:text-primary">{ev.title}</Link>
                    </div>
                  </td>
                  <td>{ev.eventType}</td>
                  <td>{ev.location}</td>
                  <td>{ev.eventDate}</td>
                  <td className="text-right whitespace-nowrap">
                    <button onClick={() => openEdit(ev)} className="btn btn-sm btn-outline btn-primary mr-2">Update</button>
                    <button onClick={() => handleDelete(ev)} className="btn btn-sm btn-outline btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-xl mb-4">Event Update Koro</h3>
          {editing && (
            <form key={editing._id} onSubmit={handleUpdate} className="space-y-3">
              <div>
                <input name="title" defaultValue={editing.title} placeholder="Title" className="input input-bordered w-full" />
                <Err name="title" />
              </div>
              <div>
                <textarea name="description" defaultValue={editing.description} rows={4} className="textarea textarea-bordered w-full" />
                <Err name="description" />
              </div>
              <div>
                <select name="eventType" defaultValue={editing.eventType} className="select select-bordered w-full">
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <Err name="eventType" />
              </div>
              <div>
                <input name="thumbnail" defaultValue={editing.thumbnail} placeholder="Thumbnail URL" className="input input-bordered w-full" />
                <Err name="thumbnail" />
              </div>
              <div>
                <input name="location" defaultValue={editing.location} placeholder="Location" className="input input-bordered w-full" />
                <Err name="location" />
              </div>
              <div>
                <input name="eventDate" type="date" min={tomorrow()} defaultValue={editing.eventDate} className="input input-bordered w-full" />
                <Err name="eventDate" />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => modalRef.current?.close()}>Cancel</button>
                <button disabled={saving} className="btn btn-primary">
                  {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
        <form method="dialog" className="modal-backdrop"><button>close</button></form>
      </dialog>
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEvents />
    </PrivateRoute>
  );
}