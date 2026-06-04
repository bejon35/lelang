import { useState } from "react";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Login gagal 😭");
      return;
    }

    const data = await res.json();
    setUser(data);
  };

  return (
    <div style={{ maxWidth: 300, margin: "auto" }}>
      <h3>🔐 Login</h3>
      <input
        placeholder="username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
