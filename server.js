// server.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Mock database
const users = [
  {
    id: 1,
    username: "john",
    password: bcrypt.hashSync("password123", 8),
    name: "John Doe",
  },
  {
    id: 2,
    username: "jane",
    password: bcrypt.hashSync("password456", 8),
    name: "Jane Doe",
  },
];

const secretKey = "your_secret_key"; // Replace with a strong key in production

// Login route
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 }); // 24 hours

  res.json({ token });
});

// Get user data route
app.get("/api/auth/user", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });

    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ name: user.name });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
