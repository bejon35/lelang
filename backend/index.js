import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// USER DUMMY (SIMULASI DATABASE)
const users = [
  { username: "admin", password: "123", role: "admin" },
  { username: "karyawan", password: "123", role: "employee" },
];

let tasks = [];

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Login gagal" });
  }

  res.json({
    username: user.username,
    role: user.role,
  });
});

// ================= TASK =================
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, from } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    from,
    time: new Date().toLocaleString(),
  };

  tasks.unshift(newTask);
  res.json(newTask);
});

app.listen(5000, () => {
  console.log("🔥 Backend jalan di http://localhost:5000");
});

export default app;
