const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loginUser } = require("../controllers/authController");

router.post("/login", loginUser);

module.exports = router;