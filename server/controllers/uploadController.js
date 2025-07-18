const Upload = require("../models/Upload");

exports.uploadImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const team = req.user.team; // Assuming you’ve added req.user via auth middleware

    const newUpload = new Upload({
      prompt,
      imageUrl: file.filename,
      team,
    });

    await newUpload.save();

    res.status(201).json({ message: "Uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
