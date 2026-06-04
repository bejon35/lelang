import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg font-semibold transition
     ${
       isActive
         ? "text-blue-600 bg-blue-50"
         : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
     }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h3 className="text-xl font-extrabold">
          MyApp
        </h3>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/product" className={linkClass}>
            Product
          </NavLink>
          <NavLink to="/event" className={linkClass}>
            Event
          </NavLink>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-2">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/product"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Product
          </NavLink>
          <NavLink
            to="/event"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Event
          </NavLink>
           <NavLink
            to="/Activity"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            acctivity
          </NavLink>
        </div>
      )}
    </nav>
  );
}
