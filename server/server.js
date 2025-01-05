const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Middleware
// app.use(
//   cors({
//     origin: [
//       "https://shopsphere-x6t84b8cx-bhagyashree4496s-projects.vercel.app",
//     ],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose
  .connect(
    "mongodb+srv://bhagyashree4496:fA1vbQCGNsPxoCzR@cluster-heavenly.dixq2.mongodb.net/heavenly?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

//app.use(express.static(path.join(__dirname, "../client/build")));

// All other routes serve the React app
//app.get("*", (req, res) => {
// res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//});
// Routes
// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Basic API!");
});
app.use("/api/products", require("./routes/products"));
app.use("/api/user", require("./routes/users"));
app.use("/api/payment", require("./routes/payment"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
