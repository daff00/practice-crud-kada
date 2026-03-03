import express from "express";
import { getAllUsers, register, login } from "../controllers/userController.js";
import { checkBody } from "../middlewares/validator.js";
import { verifyToken } from "../middlewares/auth.js";
import { logger } from "../middlewares/logger.js";

const router = express.Router();

// Middleware logger akan mencatat aktivitas setiap kali ada request ke endpoint /user
router.use(logger);

// Route GET: Mengambil data pengguna. Membutuhkan token JWT (verifyToken)
router.get("/", verifyToken, getAllUsers);

// Route POST: Mendaftarkan akun. Membutuhkan validasi body (checkBody) agar tidak kosong
router.post("/register", checkBody, register);

// Route POST: Login akun. Membutuhkan validasi body (checkBody) agar tidak kosong
router.post("/login", checkBody, login);

export default router;