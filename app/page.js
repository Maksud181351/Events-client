import Link from "next/link";
import { FaHandsHelping, FaMapMarkedAlt, FaUsers, FaShieldAlt } from "react-icons/fa";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";

const features = [
  { icon: FaHandsHelping, title: "Event Create Koro", text: "Cleanup, plantation, donation, jekono seba mulok event nijei toiri koro." },
  { icon: FaMapMarkedAlt, title: "Kache-r Event Khuje Nao", text: "Tomar area-r upcoming event gulo ek jaygay dekho." },
  { icon: FaUsers, title: "Ek Click e Join", text: "Pochhonder event e join koro ar nijer joined list track koro." },
  { icon: FaShieldAlt, title: "Nirapod Platform", text: "JWT diye surokkhito API, shudhu tumi-i tomar event edit ba delete korte paro." },
];

const gallery = [
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
];

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&h=900&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Ekshathe Gore Tuli Ekta Bhalo Shomaj
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Shomaj seba mulok event create koro, join koro, ar tomar area-r manusher pashe daro.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/events" className="btn btn-primary btn-lg">Upcoming Events</Link>
            <Link href="/create-event" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black">
              Event Create Koro
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title">Keno SevaLink?</h2>
        <p className="section-sub">Ekta platform e shomaj seba-r shob kichu.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card bg-base-100 border border-base-300 shadow-sm h-full">
              <div className="card-body items-center text-center">
                <Icon className="text-4xl text-primary mb-2" />
                <h3 className="card-title text-lg">{title}</h3>
                <p className="text-sm opacity-80">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Upcoming Events (dynamic) */}
      <UpcomingEventsSection />

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="section-title">Amader Community Moments</h2>
        <p className="section-sub">Ager event gulo theke kichu shmritir chhobi.</p>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Community event ${i + 1}`}
              className="w-full h-48 md:h-64 object-cover rounded-xl"
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-content py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-2">Newsletter Subscribe Koro</h2>
          <p className="opacity-90 mb-6">Notun event er khobor shorashori tomar inbox e pao.</p>
          <div className="join w-full max-w-md">
            <input type="email" placeholder="Tomar email" className="input join-item w-full text-base-content" />
            <button className="btn join-item btn-neutral">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
}