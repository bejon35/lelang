import { useState, useEffect } from "react";

const NextProduct = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // 1. TAMBAHKAN: State untuk kontrol buka/tutup popup
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function APIfetch() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    
    APIfetch();
  }, []);

  const addCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, qty: 1 }];
    });
  };

  // 2. TAMBAHKAN: Function untuk menghapus item (opsional, biar lengkap)
  const removeCart = (idToRemove) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== idToRemove));
  };

  // 3. TAMBAHKAN: Hitung total harga
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);

  const filtered = products;

  return (
    <div className="p-6 relative">
      
      {/* --- BAGIAN HEADER TOMBOL KERANJANG --- */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Produk Kami</h1>
        
        {/* Tombol ini akan membuka popup */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🛒 Keranjang
          {/* Badge jumlah item */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* --- BAGIAN POPUP (MODAL/SIDEBAR) --- */}
      {/* Muncul hanya jika isCartOpen = true */}
      {isCartOpen && (
        <>
          {/* Overlay (Latar belakang gelap) */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)} // Tutup kalau klik area gelap
          ></div>

          {/* Konten Popup (Sidebar dari kanan) */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
            
            {/* Header Popup */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold">Keranjang Belanja</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-red-500 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* List Item di dalam Popup */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">Keranjang masih kosong.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b pb-3">
                    <img 
                      src={item.images?.[0]} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      <p className="text-blue-600 font-bold text-sm mt-1">
                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                      </p>
                    </div>
                    {/* Tombol Hapus */}
                    <button 
                      onClick={() => removeCart(item.id)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Total Harga */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Total Harga:</span>
                <span className="font-bold text-lg text-blue-600">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* --- BAGIAN GRID PRODUK (TETAP SAMA) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:scale-105 transition flex flex-col"
          >
            <img
              src={item.images ? item.images[0] : "https://via.placeholder.com/150"}
              alt={item.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </p>
              <p className="text-lg font-semibold text-blue-600 mb-4">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
              <button 
                onClick={() => addCart(item)}
                className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                + Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextProduct;