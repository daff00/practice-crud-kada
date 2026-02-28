import express from "express";
import Part from "../models/models.js";

const router = express.Router();

// Error Handler function
const handleErrors = (err, res) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ success: false, error: messages });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: "Format ID tidak valid" });
  }
  res.status(500).json({ success: false, error: "Server Error" });
};

// Get - Read All
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find({});
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get - Read by ID
router.get("/:id", async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan" });
    }
    res.json({ success: true, data: part });
  } catch (err) {
    handleErrors(err, res);
  }
})

// Post
router.post("/", async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json({ success: true, data: part});
  } catch (err) {
    handleErrors(err, res);
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id, 
      req.body, {
        new: true,
        returnValidators: true,
        returnDocument: "after",
    });

    if (!updatedPart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan" });
    }

    res.json({ success: true, data: updatedPart });
  } catch (err) {
    handleErrors(err, res);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const deletePart = await Part.findByIdAndDelete(req.params.id);
    if (!deletePart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan" });
    }
    res.json({ success: true, message: `Berhasil menghapus data dengan id ${req.params.id}` });
  } catch (err) {
    handleErrors(err, res);
  }
});

export default router;
