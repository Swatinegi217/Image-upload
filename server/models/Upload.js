const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      enum: ["TEAM A", "TEAM B", "TEAM C", "TEAM D", "TEAM E"],
      required: true,
    },
  },
  { timestamps: true }
);

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
