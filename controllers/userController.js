import models from "../models/models.js";
import bcryptHelper from "../helpers/password.js";
import generateToken from "../helpers/token.js";
import { handleErrors } from "../helpers/errorHandler.js";
import { sendEmail } from "../helpers/email.js";

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
      return res
        .status(400)
        .json({ success: false, error: "Email dan password wajib diisi" });
    }

    // Mengecek apakah email sudah terdaftar di database sebelumnya
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email sudah terdaftar" });
    }

    // Menyimpan data pengguna baru (password akan di-hash secara otomatis oleh Mongoose pre-save hook di User.js)
    const user = await User.create({ email, password });

    // Mengirim email
    const emailSubject = "Selamat Datang di PC Builder App";
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #4CAF50;">Registrasi Berhasil!</h2>
        <p>Halo,</p>
        <p>Akun dengan email <strong>${email}</strong> telah berhasil didaftarkan di sistem kami.</p>
        <p>Silakan login untuk mulai menyusun daftar komponen PC (CPU, GPU, RAM, dll) impian Anda.</p>
      </div>
    `;

    sendEmail(user.email, emailSubject, emailHTML);

    // Mengembalikan response sukses dengan data ID dan email
    res.status(201).json({
      success: true,
      data: { id: user._id, email: user.email },
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
      return res
        .status(400)
        .json({ success: false, error: "Email dan password wajib diisi" });
    }

    // Mencari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Email atau password salah" });
    }

    // Membandingkan password yang diinput dengan hash password di database
    const isMatch = await bcryptHelper.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Email atau password salah" });
    }

    // Jika berhasil, buat JWT token yang berisi ID dan email pengguna
    const token = generateToken({ id: user._id, email: user.email });

    // Mengembalikan response sukses beserta token untuk digunakan pada request selanjutnya
    res.json({
      success: true,
      data: { id: user._id, email: user.email, token },
    });
  } catch (err) {
    handleErrors(err, res);
  }
};

// Menangani callback sukses dari Google OAuth
export const googleAuthCallback = (req, res) => {
  // req.user otomatis diisi oleh Passport berdasarkan return dari GoogleStrategy
  const token = generateToken({ id: req.user._id, email: req.user.email });

  // Mengarahkan pengguna (redirect) kembali ke aplikasi frontend (misal: React/Vite di port 5173)
  // Sambil menyisipkan token di URL agar bisa dibaca dan disimpan oleh frontend
  // res.redirect(`http://localhost:5000/auth/success?token=${token}`);
  res.send(`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h2 style="color: #4CAF50;">Login Google Berhasil!</h2>
      <p>Silakan salin token JWT di bawah ini untuk digunakan pada Header Authorization (Postman / Thunder Client):</p>
      <textarea readonly style="width: 100%; height: 150px; padding: 10px; font-family: monospace; font-size: 14px; border-radius: 4px;">${token}</textarea>
      <p style="color: #666; font-size: 14px;">Format: <strong>Bearer &lt;token&gt;</strong></p>
    </div>
  `);
};
