import express from "express";
import users from "../models/userModel.js";
const router = express.Router();
import bcryptHelper from "../helpers/password.js";
import generateToken from "../helpers/token.js";

router.get("/", async (req, res, next) => {
  try {
    const user = await users.find();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // cek user exist
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // cek password
    const isMatch = await bcryptHelper.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = generateToken({ id: user._id, email: user.email });

    return res.json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    return next(err);
  }
});

router.post("/register", async (req, res, next) => {
  let { email, password } = req.body || {}; //||{} kalau ga ada name and email, maka akan diisi dengan object kosong, jadi ga error

  //hash password sebelum disimpan ke database, supaya lebih aman, karena kalau ada yang berhasil masuk ke database, maka dia ga akan bisa melihat password asli dari usernya

  users
    .create({ email, password })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      next(err); //panggil next dengan err, supaya error handling middleware bisa menangani errornya
    });
});

export default router;
