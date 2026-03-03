import models from "../models/models.js";
import bcryptHelper from "../helpers/password.js";
import generateToken from "../helpers/token.js";
import { handleErrors } from "../helpers/errorHandler.js";

const User = models.User;

// Mengambil seluruh data pengguna yang terdaftar
export const getAllUsers = async (req, res) => {
  try {
    // .select("-password") memfilter agar data password tidak dikirimkan ke client
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    handleErrors(err, res); // Menangani error menggunakan helper
  }
};

// Mendaftarkan pengguna baru
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi apakah email dan password sudah diisi
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email dan password wajib diisi" });
    }

    // Mengecek apakah email sudah terdaftar di database sebelumnya
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email sudah terdaftar" });
    }

    // Menyimpan data pengguna baru (password akan di-hash secara otomatis oleh Mongoose pre-save hook di User.js)
    const user = await User.create({ email, password });
    
    // Mengembalikan response sukses dengan data ID dan email
    res.status(201).json({ 
      success: true, 
      data: { id: user._id, email: user.email } 
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Proses login pengguna
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi apakah email dan password sudah diisi
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email dan password wajib diisi" });
    }

    // Mencari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Email atau password salah" });
    }

    // Membandingkan password yang diinput dengan hash password di database
    const isMatch = await bcryptHelper.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Email atau password salah" });
    }

    // Jika berhasil, buat JWT token yang berisi ID dan email pengguna
    const token = generateToken({ id: user._id, email: user.email });

    // Mengembalikan response sukses beserta token untuk digunakan pada request selanjutnya
    res.json({
      success: true,
      data: { id: user._id, email: user.email, token }
    });
  } catch (err) {
    handleErrors(err, res);
  }
};