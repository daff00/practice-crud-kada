import express from "express";
import passport from "passport"; // Impor passport
import { getAllParts, getPartById, createPart, updatePart, deletePart } from "../controllers/partController.js";
import { checkBody } from "../middlewares/validator.js";
import { logger } from "../middlewares/logger.js";

const router = express.Router();

// Middleware global untuk mencatat log
router.use(logger);

// Menggantikan verifyToken manual dengan passport-jwt
// session: false wajib digunakan karena REST API bersifat stateless (tidak pakai session cookies)
router.use(passport.authenticate("jwt", { session: false }));

// Rute di bawah ini otomatis terlindungi dan dapat mengakses req.user dari Passport
router.get("/", getAllParts);
router.get("/:id", getPartById);
router.post("/", checkBody, createPart);
router.patch("/:id", checkBody, updatePart);
router.delete("/:id", deletePart);

export default router;