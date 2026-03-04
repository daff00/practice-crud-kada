import models from "../models/models.js";
import { handleErrors } from "../helpers/errorHandler.js";

// Mengambil semua data komponen milik pengguna yang sedang login
export const getAllParts = async (req, res) => {
  try {
    // Mencari komponen yang memiliki user_id sesuai dengan ID dari token JWT
    const parts = await models.Part.find({ user_id: req.user._id });
    res.json({ success: true, data: parts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Mengambil detail satu komponen berdasarkan ID
export const getPartById = async (req, res) => {
  try {
    // Mencari komponen berdasarkan ID komponen (dari URL) DAN ID pemilik (dari token)
    const part = await models.Part.findOne({ _id: req.params.id, user_id: req.user._id });
    
    // Jika tidak ditemukan, berarti komponen tidak ada atau bukan milik pengguna ini
    if (!part) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan" });
    }
    res.json({ success: true, data: part });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Menambahkan data komponen baru
export const createPart = async (req, res) => {
  try {
    // Menyisipkan user_id ke dalam data yang akan disimpan berdasarkan ID dari token JWT
    const partData = { ...req.body, user_id: req.user._id };
    
    // Menyimpan data komponen ke database
    const part = await models.Part.create(partData);
    res.status(201).json({ success: true, data: part });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Memperbarui data komponen yang sudah ada
export const updatePart = async (req, res) => {
  try {
    // Memperbarui komponen dengan syarat ID komponen dan user_id harus cocok
    // new: true digunakan untuk mengembalikan data terbaru setelah di-update
    // runValidators: true digunakan untuk memastikan aturan schema (seperti enum) tetap berjalan
    const updatedPart = await models.Part.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user._id }, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedPart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan atau Anda tidak memiliki hak akses" });
    }

    res.json({ success: true, data: updatedPart });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Menghapus data komponen
export const deletePart = async (req, res) => {
  try {
    // Menghapus komponen dengan syarat ID komponen dan user_id harus cocok
    const deletePart = await models.Part.findOneAndDelete({ 
      _id: req.params.id, user_id: req.user._id 
    });
    
    if (!deletePart) {
      return res.status(404).json({ success: false, error: "Komponen tidak ditemukan atau Anda tidak memiliki hak akses" });
    }
    res.json({ success: true, message: `Berhasil menghapus data dengan id ${req.params.id}` });
  } catch (err) {
    handleErrors(err, res);
  }
};