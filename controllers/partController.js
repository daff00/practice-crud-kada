import express from "express";
import models from "../models/models.js";
import { checkBody } from "../middlewares/validator.js";
import { logger } from "../middlewares/logger.js";
import { verifyToken } from "../middlewares/auth.js"; // Opsional: untuk proteksi endpoint
import { handleErrors } from "../helpers/errorHandler.js";

const router = express.Router();

// Middleware global untuk route /part
router.use(logger);

// Uncomment baris di bawah ini jika ingin SELURUH endpoint part (GET, POST, PATCH, DELETE) wajib login
// router.use(verifyToken);

// Get - Read All
router.get("/", verifyToken, async (req, res) => {
  try {
    const parts = await models.Part.find({ user_id: req.user.id });
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get - Read by ID
router.get("/:id", async (req, res) => {
  try {
    const part = await models.Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan" });
    }
    res.json({ success: true, data: part });
  } catch (err) {
    handleErrors(err, res);
  }
});

// Post
// Jika hanya POST, PATCH, DELETE yang butuh login, tambahkan verifyToken seperti ini:
// router.post("/", verifyToken, checkBody, async (req, res) => {
router.post("/", verifyToken, checkBody, async (req, res) => {
  try {
    const partData = { ...req.body, user_id: req.user.id };
    const part = await models.Part.create(partData);
    res.status(201).json({ success: true, data: part });
  } catch (err) {
    handleErrors(err, res);
  }
});

// Update (Wajib Login & Cek Kepemilikan)
router.patch("/:id", verifyToken, checkBody, async (req, res) => {
  try {
    // Gunakan findOneAndUpdate untuk mencari berdasarkan ID komponen DAN ID user
    const updatedPart = await models.Part.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id }, 
      req.body, 
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan atau Anda tidak memiliki hak akses untuk mengubahnya" });
    }

    res.json({ success: true, data: updatedPart });
  } catch (err) {
    handleErrors(err, res);
  }
});

// Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletePart = await models.Part.findOneAndDelete({ 
      _id: req.params.id, 
      user_id: req.user.id 
    });
    
    if (!deletePart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan atau Anda tidak memiliki hak akses" });
    }
    res.json({ success: true, message: `Berhasil menghapus data dengan id ${req.params.id}` });
  } catch (err) {
    handleErrors(err, res);
  }
});

export default router;