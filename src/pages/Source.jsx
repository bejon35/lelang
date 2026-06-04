import React, { useState, useEffect } from 'react';

// Perbaikan data: Memperbaiki URL gambar yang rusak

export default function Source() {
  const [modal, setModal] = useState(null);
  const [keranjang, setKeranjang] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [Preoduct,setProduct] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProduct(data.products || []);
    }
    fetchAPI();
  }, []);
  const filteredProduct = Preoduct;

  const tambahKeKeranjang = (item) => {
    setModal(null);
    const itemAdaDiKeranjang = keranjang.find((barang) => barang.id === item.id);
    if (itemAdaDiKeranjang) {
      setKeranjang(
        keranjang.map((barang) =>
          barang.id === item.id ? { ...barang, quantity: barang.quantity + 1 } : barang
        )
      );
    } else {
      setKeranjang([...keranjang, { ...item, quantity: 1 }]);
    }
  };

  const hapusDariKeranjang = (itemId) => {
    setKeranjang(keranjang.filter((item) => item.id !== itemId));
  };

  // Fungsi baru untuk mengubah jumlah item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      hapusDariKeranjang(itemId);
      return;
    }
    
    setKeranjang(
      keranjang.map((item) => 
        item.id === itemId ? {...item, quantity: newQuantity} : item
      )
    );
  };

  const hitungTotalHarga = () => {
    return keranjang.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const hitungTotalItem = () => {
    return keranjang.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Daftar Menu
        </h1>

        {/* Tombol Keranjang */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center space-x-2"
          >
            {/* Ikon keranjang */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Lihat Keranjang</span>
            {/* Badge jumlah item */}
            {hitungTotalItem() > 0 && (
              <span className="bg-white text-green-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {hitungTotalItem()}
              </span>
            )}
          </button>
        </div>

        {/* Grid Kartu Produk */}
        <div className="flex flex-wrap justify-center gap-6">
          {filteredProduct.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setModal(item)}
                className="bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden w-72 transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <img src={item.thumbnail || item.image} alt={item.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-semibold text-blue-600">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>                                  
            );
          })}
        </div>
      </div>

      {/* Modal Detail Barang */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <img src={modal.thumbnail || modal.image} alt={modal.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">{modal.title}</h2>
            <p className="text-gray-600 mb-4">{modal.description || modal.desc}</p>
            <p className="text-xl font-bold text-green-600 mb-6">Rp {modal.price.toLocaleString('id-ID')}</p>
            <button onClick={() => tambahKeKeranjang(modal)} className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      )}

      {/* Modal Keranjang - DIPERBAIKI */}
      {isCartOpen && (   
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999] p-4" onClick={() => setIsCartOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            {/* Tombol Tutup (X) */}
            <button 
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4 pr-8">Keranjang Belanja</h2>
            {keranjang.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Keranjang kamu kosong.</p>
            ) : (
              <>
                {keranjang.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b py-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')} x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            hapusDariKeranjang(item.id);
                        }} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span>Rp {hitungTotalHarga().toLocaleString('id-ID')}</span>
                  </div>
                  <button className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                    Lanjut ke Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}