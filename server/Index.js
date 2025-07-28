const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploads");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
