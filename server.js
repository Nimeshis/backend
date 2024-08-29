// server.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

mongoose.connect;
try {
  "mongodb://localhost:27017/testing",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
  console.log("MongoDB connected");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
