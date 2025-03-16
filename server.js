require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests
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
app.post("/track-click", async (req, res) => {
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
    res.status(500).json({ error: "Database error!" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
