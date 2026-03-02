import express from "express";
import models from "../models/models.js";
import bcryptHelper from "../helpers/password.js";
import generateToken from "../helpers/token.js";
import { checkBody } from "../middlewares/validator.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();
const User = models.User;

// Get All Users - Dilindungi oleh middleware auth
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Sembunyikan password
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Register
router.post("/register", checkBody, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email dan password wajib diisi" });
    }

    // Cek apakah email sudah digunakan
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email sudah terdaftar" });
    }

    const user = await User.create({ email, password });
    
    res.status(201).json({ 
      success: true, 
      data: { 
        id: user._id, 
        email: user.email 
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Login
router.post("/login", checkBody, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email dan password wajib diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Email atau password salah" });
    }

    const isMatch = await bcryptHelper.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Email atau password salah" });
    }

    const token = generateToken({ id: user._id, email: user.email });

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        token,
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;