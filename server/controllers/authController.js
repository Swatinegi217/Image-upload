const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Map team (e.g., "Team1" → "TEAM A")
    const teamMap = {
      Team1: "TEAM A",
      Team2: "TEAM B",
      Team3: "TEAM C",
      Team4: "TEAM D",
      Team5: "TEAM E",
    };
    const mappedTeam = teamMap[user.team] || user.team;

    res.status(200).json({
      token,
      user: {
        email: user.email,
        role: user.role,
        team: mappedTeam, // ✅ send mapped team
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginUser };

// GET /api/auth/me
const getMe = async (req, res) => {
try {
const user = await User.findById(req.user.id).select("-password");
res.json(user);
} catch (err) {
console.error(err);
res.status(500).json({ msg: "Server error" });
}
};

module.exports = {
loginUser,
getMe,
};