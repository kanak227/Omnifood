require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// Define allowed origins
const allowedOrigins = ["http://example1.com", "http://example2.com"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
})); // Allow frontend requests

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Create Schema & Model
const clickSchema = new mongoose.Schema({
  buttonName: String,
  clickCount: { type: Number, default: 1 },
});

const Click = mongoose.model("Click", clickSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

// API to Track Clicks
app.post("/track-click", async (req, res, next) => {
  const { buttonName } = req.body;
  if (!buttonName) return res.status(400).json({ error: "Button name is required!" });

  try {
    const click = await Click.findOneAndUpdate(
      { buttonName },
      { $inc: { clickCount: 1 } },
      { new: true, upsert: true }
    );
    res.json({ success: true, click });
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
