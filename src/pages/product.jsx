import { useEffect, useMemo, useState } from "react";

export default function ProductApp() {
  /* ================= STATE ================= */
  const [products, setProducts] = useState([]);
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) || false
  );
  const [loading, setLoading] = useState(true);

  // PRODUCT MODAL
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // CART MODAL
  const [openCart, setOpenCart] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();    
      setProducts(data);
      setLoading(false); //Fetch API 
    }
    fetchProducts();
  }, []);

  /* ================= LOCAL STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [cart, dark]);

  /* ================= LOGIC ================= */
  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    const copy = [...cart];
    copy.splice(index, 1);
    setCart(copy);
  }

  function buyAll() {
    alert(`Checkout ${cart.length} item berhasil 🚀`);
    setCart([]);
    setOpenCart(false);
  }

  function openDetail(product) {
    setSelectedProduct(product);
    setOpenModal(true);
  }

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) =>
      category === "all" ? true : p.category === category
    );

  /* ================= UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading dulu bro... ☕
      </div>
    );
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-6">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold">🛒 Advanced Store</h1>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => setOpenCart(true)}
              className="font-semibold underline"
            >
              Cart ({cart.length})
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded bg-black text-white dark:bg-white dark:text-black"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        {/* ===== FILTER ===== */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded border w-full text-black"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded border text-black"
          >
            <option value="all">All</option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        {/* ===== PRODUCT LIST ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 object-contain mb-4 cursor-pointer"
                onClick={() => openDetail(item)}
              />

              <h2 className="font-semibold text-sm mb-2 line-clamp-2">
                {item.title}
              </h2>

              <div className="mt-auto flex justify-between items-center">
                <span className="font-bold text-green-600">
                  ${item.price}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CART MODAL ================= */}
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">🛍 Keranjang</h2>

            {cart.length === 0 ? (
              <p className="opacity-70">Keranjang kosong 😴</p>
            ) : (
              <>
                <div className="space-y-4 max-h-60 overflow-auto">
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm line-clamp-1">
                        {item.title}
                      </span>

                      <div className="flex gap-3 items-center">
                        <span className="font-bold text-green-600">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(i)}
                          className="text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </span>

                  <button
                    onClick={buyAll}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Buy All
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= PRODUCT MODAL ================= */}
      {openModal && selectedProduct && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="font-bold mb-2">
              {selectedProduct.title}
            </h2>

            <img
              src={selectedProduct.image}
              className="h-40 mx-auto object-contain mb-4"
            />

            <p className="text-sm opacity-70 mb-4">
              {selectedProduct.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="font-bold text-green-600">
                ${selectedProduct.price}
              </span>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setOpenModal(false);
                }}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
