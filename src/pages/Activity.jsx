import { useState } from "react";

export default function Activity() {
  const user = { name: "Bro Manager", role: "admin" };
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!text) return;

    setTasks([
      ...tasks,
      {
        title: text,
        from: user.name,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setText("");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="font-bold text-xl mb-4">📢 Activity Perusahaan</h2>

      {/* INPUT KHUSUS ADMIN */}
      {user.role === "admin" && (
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan perintah kerja"
            className="border px-2 py-1 w-full"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-3">
            Kirim
          </button>
        </div>
      )}

      {/* LIST PERINTAH */}
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li key={i} className="border p-2 rounded bg-gray-50">
            <p className="font-semibold">{task.title}</p>
            <small>
              Dari {task.from} • {task.time}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
