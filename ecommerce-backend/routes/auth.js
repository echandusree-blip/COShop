const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create new user (Storing password directly as plain text for simplicity)
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully", 
      token: "mock-jwt-token-" + newUser._id,
      user: { email: newUser.email } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password (matching plain text)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ 
      message: "Logged in successfully", 
      token: "mock-jwt-token-" + user._id,
      user: { email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

module.exports = router;