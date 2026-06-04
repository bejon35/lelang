import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/footer"

export default function Home() {
  /* ================= STATE ================= */
  const navigate = useNavigate();

  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );

  const [heroIndex, setHeroIndex] = useState(0);
  const [seconds, setSeconds] = useState(300);
  const [searchQuick, setSearchQuick] = useState("");
  const [scrollY, setScrollY] = useState(0);

  const [categoryClick, setCategoryClick] = useState({
    electronics: 0,
    men: 0,
    women: 0,
    jewelery: 0,
  });

  /* ================= HERO DATA ================= */
  const heroSlides = [
    {
      title: "Belanja Pintar",
      desc: "Produk modern dengan UI clean",
    },
    {
      title: "Harga Bersahabat",
      desc: "Checkout cepat tanpa ribet",
    },
    {
      title: "UX Nyaman",
      desc: "Dark mode & responsive",
    },
  ];

  /* ================= EFFECT ================= */
  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= LOGIC ================= */
  function goCategory(cat) {
    setCategoryClick((prev) => ({
      ...prev,
      [cat]: prev[cat] + 1,
    }));
    navigate(`/product?category=${cat}`);
  }

  function quickSearch() {
    if (!searchQuick.trim()) return;
    navigate(`/product?search=${searchQuick}`);
  }

  const popularCategory = useMemo(() => {
    return Object.entries(categoryClick).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  }, [categoryClick]);

  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  /* ================= UI ================= */
  return (
    <>
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow flex justify-between items-center p-6">
          <h1 className="text-2xl font-extrabold">🛒 Advanced Store</h1>

          <div className="flex gap-4 items-center">
            <Link to="/product" className="font-semibold hover:underline">
              Product
            </Link>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </header>

        {/* ===== HERO ===== */}
        <section className="text-center py-24 px-6">
          <h2 className="text-4xl font-extrabold mb-4">
            {heroSlides[heroIndex].title}
          </h2>
          <p className="opacity-70 mb-6">
            {heroSlides[heroIndex].desc}
          </p>

          <Link
            to="/product"
            className="px-6 py-3 rounded bg-black text-white dark:bg-white dark:text-black"
          >
            Shop Now
          </Link>
        </section>

        {/* ===== QUICK SEARCH ===== */}
        <section className="px-6 mb-16 max-w-xl mx-auto">
          <div className="flex gap-2">
            <input
              value={searchQuick}
              onChange={(e) => setSearchQuick(e.target.value)}
              placeholder="Cari cepat..."
              className="flex-1 p-2 rounded text-black"
            />
            <button
              onClick={quickSearch}
              className="px-4 bg-black text-white rounded"
            >
              Go
            </button>
          </div>
        </section>

        {/* ===== PROMO ===== */}
        <section className="text-center mb-20">
          <h3 className="text-xl font-bold mb-2">🔥 Flash Sale</h3>
          <p className="opacity-70">
            Berakhir dalam {minutes}:{remainSeconds.toString().padStart(2, "0")}
          </p>
        </section>

        {/* ===== CATEGORY ===== */}
        <section className="px-6 pb-20">
          <h3 className="text-2xl font-bold text-center mb-6">
            Kategori Populer
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard title="Electronics" onClick={() => goCategory("electronics")} />
            <CategoryCard title="Men Fashion" onClick={() => goCategory("men's clothing")} />
            <CategoryCard title="Women Fashion" onClick={() => goCategory("women's clothing")} />
            <CategoryCard title="Jewelery" onClick={() => goCategory("jewelery")} />
          </div>

          <p className="text-center mt-8 opacity-60">
            🔥 Paling sering diklik: <b>{popularCategory}</b>
          </p>
        </section>

        {/* ===== SCROLL INFO ===== */}
        <div className="fixed bottom-4 right-4 bg-black text-white px-3 py-1 rounded text-sm opacity-70">
          Scroll: {scrollY}px
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="text-center p-6 opacity-60">
          © 2025 Advanced Store
        </footer>
      </div>
    </div>
    <Footer/>
    </>
  );
}

/* ================= COMPONENT ================= */
function CategoryCard({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:scale-105 transition text-center"
    >
      <h4 className="font-bold mb-2">{title}</h4>
      <p className="opacity-70 text-sm">Explore now</p>
    </button>
  );
}
