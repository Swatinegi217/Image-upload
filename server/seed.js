const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany(); // Clear existing users

    const teams = ["Team1", "Team2", "Team3", "Team4", "Team5"];
    const users = [];

    // Create 25 team members (5 per team)
    for (let i = 1; i <= 25; i++) {
      const teamIndex = Math.floor((i - 1) / 5);
      const team = teams[teamIndex];

      users.push({
        name: `User${i}`,
        email: `user${i}@demo.com`,
        password: await bcrypt.hash(`user${i}pass`, 10),
        team,
        role: "user",
      });
    }

    // Add admin user
    users.push({
      name: "Admin",
      email: "admin@demo.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "admin",
      team: null,
    });

    await User.insertMany(users);
    console.log("✅ Users and Admin Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
    process.exit(1);
  }
};

seedUsers();
