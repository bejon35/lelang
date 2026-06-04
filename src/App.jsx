import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Source2 from "./pages/NextProduct";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Event from "./pages/Event";
import Activity from "./pages/Activity";
import Source from "./pages/Source"
import About from "./pages/About";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/ty2" element={<Source2/>} />
        <Route path="/event" element={<Event />} />
        <Route path="/ty" element={<Source />} />
        <Route path="/about" element={<About />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* PROTECTED */}
        <Route
          path="/activity"
          element={
            <ProtectedRoute user={user}>
              <Activity user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
