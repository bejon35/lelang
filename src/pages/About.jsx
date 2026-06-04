import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const [active, setActive] = useState(null);

  const FEATURES = [
    {
      id: 1,
      title: "Trusted Products",
      subtitle: "Quality guaranteed",
      detail:
        "Kami memastikan semua produk melalui quality control ketat sebelum dijual ke pelanggan.",
    },
    {
      id: 2,
      title: "Fast Delivery",
      subtitle: "On time, every time",
      detail:
        "Pengiriman cepat dengan partner logistik terpercaya ke seluruh Indonesia.",
    },
  ];

  /* ========= INTERACTIVE CARD ========= */
  function InteractiveCard({ data }) {
    return (
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setActive(data)}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
      >
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {data.title}
          </h3>
          <p className="text-sm text-gray-500">
            {data.subtitle}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
        About Our Store
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {FEATURES.map((f) => (
          <InteractiveCard key={f.id} data={f} />
        ))}
      </div>

      {/* ========= MODAL ========= */}
      <AnimatePresence>
        {active && (
          <>
            {/* BACKDROP (CLICK TO CLOSE) */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setActive(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MODAL BOX */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative"
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  {active.title}
                </h2>

                <p className="text-gray-700 leading-relaxed">
                  {active.detail}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
