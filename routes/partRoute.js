import express from "express";
import { getAllParts, getPartById, createPart, updatePart, deletePart } from "../controllers/partController.js";
import { checkBody } from "../middlewares/validator.js";
import { logger } from "../middlewares/logger.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Middleware global untuk rute komponen
router.use(logger); // Mencatat log aktivitas request
router.use(verifyToken); // Memastikan SEMUA rute di bawah ini wajib memiliki token JWT yang valid

// Route GET: Mengambil semua komponen milik user yang login
router.get("/", getAllParts);

// Route GET: Mengambil detail satu komponen berdasarkan ID di URL
router.get("/:id", getPartById);

// Route POST: Menambah komponen baru. Harus melewati pengecekan body (checkBody)
router.post("/", checkBody, createPart);

// Route PATCH: Memperbarui data komponen berdasarkan ID di URL. Harus melewati pengecekan body
router.patch("/:id", checkBody, updatePart);

// Route DELETE: Menghapus data komponen berdasarkan ID di URL
router.delete("/:id", deletePart);

export default router;