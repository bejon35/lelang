import { useState } from "react";
import { Link } from "react-router-dom";

// Data event tetap sama
 

const EVENTS = [
  {
    id: 1,
    title: "Tech Meetup 2025",
    subtitle: "Jakarta • 12 Aug 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    detail: "Event networking teknologi dengan pembicara senior dan sesi diskusi eksklusif.",
  },
  {
    id: 2,
    title: "Startup Pitch Day",
    subtitle: "Bandung • 5 Sep 2025",
    image: "https://images.unsplash.com/photo-1740638733796-99124a3b0a4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
    detail: "Acara di mana startup lokal mempresentasikan ide mereka kepada investor potensial.",
  },
  {
    id: 3,
    title: "Digital Marketing Workshop",
    subtitle: "Surabaya • 20 Oct 2025",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    detail: "Workshop intensif tentang strategi pemasaran digital terbaru dan alat-alatnya.",
  },
];

export default function PureReactEventPage() {
  // STATE LOGIKA TETAP SAMA! Ini adalah otaknya.
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Upcoming Events
      </h1>
 
      {/* DAFTAR KARTU EVENT */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            // Pemicu tetap sama, kita ubah state 'selected'
            onClick={() => setSelected(event)}
            // Efek hover pakai CSS biasa
            className="event-card bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden"
          >
            
            <img
              src={event.image}
              alt={event.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP (MODAL) */}
      {/* Perhatikan, kita tidak pakai <AnimatePresence> lagi */}
      {selected && (
        // Latar belakang gelap
        <div
          className="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          // Penutup popup tetap sama
          onClick={() => setSelected(null)}
        >
          {/* Kotak putih di tengah */}
          <div
            className="modal-content bg-white rounded-xl p-6 max-w-md w-full mx-4 mb-2"
            // Perisai agar klik di dalam tidak menutup popup
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <p className="text-gray-600 mb-4">{selected.subtitle}</p>
            <p className="text-gray-800 mb-2">{selected.detail}</p>
            <div className="flex gap-2">
            <div className="bg-black  text-white w-29 rounded-xl text-center justify-center items-center p-2 px-2.3 shadow-7">
            <Link to="/ty">Indonesian Food</Link>
            </div>
            <div className="bg-black p-2 py-3 px-3 text-white w-28 rounded-xl text-center justify-center"> 
                  <Link to="/ty2">Javaese Food</Link>
            </div>
             </div>
          </div>
        </div>
      )}

      {/* Tambahkan style untuk animasi CSS */}
      <style jsx>{`
        .event-card {
          transition: transform 0.2s ease-in-out;
        }
        .event-card:hover { 
          transform: scale(1.05);                                            
        }
        .event-card:active {
          transform: scale(0.95);
        }

        /* Animasi untuk popup */
        .modal-backdrop {
          animation: fadeIn 0.25s ease-in-out;
        }
        .modal-content {
          animation: zoomIn 0.25s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}