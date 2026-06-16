const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      
      <div className="flex flex-col md:flex-wrap justify-center items-center gap-3 text-center">

        <p className="text-sm md:text-base">
          Barang terjamin kualitasnya
        </p>

        <p className="text-sm md:text-base">
          Banyak pilihan, no ribet
        </p>

        {/* 🔗 LINK SECTION */}
        <div className="flex gap-4 mt-2 text-sm">
          <a href="#home" className="text-blue-300 hover:underline">
            Home
          </a>

          <a href="#about" className="text-blue-300 hover:underline">
            About
          </a>

          <a href="#contact" className="text-blue-300 hover:underline">
            Contact
          </a>
        </div>

        {/* 🔗 SOSIAL MEDIA LINK */}
        <div className="flex gap-4 mt-2 text-sm">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-pink-300 hover:underline"
          >
            Instagram
          </a>

          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noreferrer"
            className="text-green-300 hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        © 2025 Bro Store. All rights reserved.
      </p>
      
    </footer>
  );
};

export default Footer;