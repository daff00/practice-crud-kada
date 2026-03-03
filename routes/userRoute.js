import express from "express";
import passport from "passport"; // Wajib diimpor
import { getAllUsers, register, login, googleAuthCallback } from "../controllers/userController.js";
import { checkBody } from "../middlewares/validator.js";
import { logger } from "../middlewares/logger.js";

const router = express.Router();

router.use(logger);

// Rute standar
router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);
router.post("/register", checkBody, register);
router.post("/login", checkBody, login);

// === RUTE GOOGLE OAUTH ===

// 1. Rute untuk menginisiasi proses login Google
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

// 2. Rute callback setelah Google memverifikasi akun (URL ini yang mengalami Cannot GET)
// Jika gagal (failureRedirect), arahkan kembali ke halaman login frontend/backend
router.get(
  "/auth/google/callback", 
  passport.authenticate("google", { session: false, failureRedirect: "/user/login" }), 
  googleAuthCallback // Panggil fungsi controller setelah passport berhasil
);

export default router;