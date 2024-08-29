const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process with a failure
  });

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
