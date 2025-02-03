const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://bhagyashree4496:fA1vbQCGNsPxoCzR@cluster-heavenly.dixq2.mongodb.net/heavenly?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the Basic API!");
});
app.use("/api/products", require("./routes/products"));
app.use("/api/user", require("./routes/users"));
app.use("/api/payment", require("./routes/payment"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
