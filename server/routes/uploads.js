// server/routes/upload.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Upload = require("../models/Upload");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const teamMap = {
  Team1: "TEAM A",
  Team2: "TEAM B",
  Team3: "TEAM C",
  Team4: "TEAM D",
  Team5: "TEAM E",
};

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { prompt, team } = req.body;

    const mappedTeam = teamMap[team] || team; // ✅ converts "Team1" → "TEAM A"

    // Save file to local uploads folder
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const filePath = path.join(__dirname, "../uploads", fileName);
    fs.writeFileSync(filePath, req.file.buffer);

    // Save entry to DB
    const newUpload = new Upload({
      imageUrl: `/uploads/${fileName}`,
      prompt,
      team: mappedTeam, // ✅ Use mapped team
    });

    await newUpload.save();

    res.status(201).json({ message: "Upload successful", upload: newUpload });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// GET all uploads for admin
router.get('/all', async (req, res) => {
  try {
    const upload = await Upload.find();
    res.status(200).json(upload);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk delete uploads by IDs
router.post("/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: "Invalid payload format" });
    }

    await Upload.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
