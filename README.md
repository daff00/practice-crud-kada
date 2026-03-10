<div align="center">

# 🖥️ PC Build Inventory API

**RESTful API untuk melacak komponen PC rakitan — dari yang sudah dibeli hingga yang masih diincar.**

> Dibuat sebagai bagian dari tugas latihan di **Korea-ASEAN Digital Academy (KADA)**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white)](https://www.passportjs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Google OAuth](https://img.shields.io/badge/Google_OAuth_2.0-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/identity)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-03A9F4?style=for-the-badge&logo=minutemailer&logoColor=white)](https://nodemailer.com/)

</div>

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| 🔐 **JWT Authentication** | Login menggunakan *JSON Web Token* via Passport-JWT |
| 🟢 **Google OAuth 2.0** | Login langsung dengan akun Google via Passport |
| 📧 **Welcome Email** | Email selamat datang otomatis saat register menggunakan Nodemailer |
| 👤 **Data Isolation** | Otorisasi berbasis `_id` — user hanya bisa akses data miliknya |
| 📦 **Full CRUD** | Create, Read, Update, Delete untuk data komponen PC |
| ✅ **Validasi Data** | Kategori & status dibatasi `enum` Mongoose untuk konsistensi |
| 🛠️ **Modular Helpers** | Fungsi reusable terpisah: hashing, token, email, error handler |
| 🛡️ **Middleware Lengkap** | Auth check, logger otomatis, dan penanganan error terpusat |

---

## 🧰 Tech Stack

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white" />
  <img src="https://img.shields.io/badge/passport--jwt-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/passport--google--oauth20-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Nodemailer-03A9F4?style=flat-square&logo=minutemailer&logoColor=white" />
  <img src="https://img.shields.io/badge/bcrypt-FF6B6B?style=flat-square&logo=letsencrypt&logoColor=white" />
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black" />
</p>

---

## 🔑 Alur Autentikasi

API ini mendukung **dua cara login** yang dikelola oleh Passport.js:

```
Cara 1 — Email & Password (Manual)
  POST /user/register  →  Simpan user ke DB  →  📧 Kirim Welcome Email
  POST /user/login     →  Validasi kredensial bcrypt  →  Terima JWT token

Cara 2 — Google OAuth 2.0
  GET /user/auth/google           →  Redirect ke halaman login Google
  GET /user/auth/google/callback  →  Google redirect balik  →  Terima JWT token

Semua endpoint /part  →  Wajib kirim JWT di header Authorization: Bearer <token>
```

---

## 🚀 Instalasi & Menjalankan

**1. Clone & install dependensi**

```bash
git clone https://github.com/your-username/pc-build-inventory-api.git
cd pc-build-inventory-api
npm install
```

**2. Buat file `.env` di root direktori**

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<nama-database>

# JWT
JWT_SECRET=rahasia_super_kuat_123

# Google OAuth — dapatkan dari console.cloud.google.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Nodemailer — gunakan App Password Gmail (bukan password biasa!)
EMAIL_USER=emailkamu@gmail.com
EMAIL_PASS=16karaktertanpaspasi
```

> 💡 **Google credentials:** Buka [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Create OAuth 2.0 Client ID
>
> 💡 **Gmail App Password:** Buka [myaccount.google.com](https://myaccount.google.com) → Security → 2-Step Verification → App Passwords

**3. Jalankan server**

```bash
npm run dev   # development — dengan nodemon (auto-restart)
# atau
npm start     # production
```

**4. Docker compose (opsional)**
Menjalankan aplikasi via docker-compose.
```
docker compose up --build -d
```

Server berjalan di 👉 **http://localhost:3000**

---

## 📡 API Endpoints

Semua request body dikirim dalam format `application/json`.

### 👤 User & Auth

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|:----:|-----------|
| `POST` | `/user/register` | ❌ | Daftar akun baru + kirim welcome email |
| `POST` | `/user/login` | ❌ | Login manual, dapat JWT token |
| `GET` | `/user` | ✅ JWT | Lihat semua pengguna terdaftar |
| `GET` | `/user/auth/google` | ❌ | Login via Google OAuth |
| `GET` | `/user/auth/google/callback` | ❌ | Callback redirect dari Google |

### 🔩 Komponen PC (Part)

> ⚠️ Semua endpoint berikut wajib menyertakan header: `Authorization: Bearer <token>`

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/part` | Ambil semua komponen milik user yang login |
| `GET` | `/part/:id` | Ambil detail satu komponen by ID |
| `POST` | `/part` | Tambah komponen baru |
| `PATCH` | `/part/:id` | Update sebagian atau seluruh field |
| `DELETE` | `/part/:id` | Hapus komponen by ID |

---

## 🧪 Contoh Request & Response

### 1. Register — `POST /user/register`

```json
// Request Body
{
  "email": "daffa@example.com",
  "password": "password123"
}

// Response 201
{
  "success": true,
  "data": {
    "id": "65e0a1b2c3d4e5f607890abc",
    "email": "daffa@example.com"
  }
}
```

> 📧 Email sambutan akan otomatis terkirim ke `daffa@example.com` setelah register berhasil.

### 2. Login — `POST /user/login`

```json
// Request Body
{
  "email": "daffa@example.com",
  "password": "password123"
}

// Response 200
{
  "success": true,
  "data": {
    "id": "65e0a1b2c3d4e5f607890abc",
    "email": "daffa@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

### 3. Tambah Komponen — `POST /part`

```json
// Header: Authorization: Bearer eyJhbGci...

// Request Body
{
  "name": "AMD Ryzen 5 7600X",
  "category": "CPU",
  "price": 3500000,
  "status": "Wishlist",
  "notes": "Tunggu diskon akhir bulan"
}

// Response 201
{
  "success": true,
  "data": {
    "_id": "65e0a1b2c3d4e5f607890def",
    "user_id": "65e0a1b2c3d4e5f607890abc",
    "name": "AMD Ryzen 5 7600X",
    "category": "CPU",
    "price": 3500000,
    "status": "Wishlist",
    "notes": "Tunggu diskon akhir bulan",
    "createdAt": "2026-03-04T10:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
}
```

### 4. Error — Token tidak valid

```json
// Response 401
{
  "success": false,
  "error": "Akses ditolak. Token tidak ditemukan atau sudah kedaluwarsa."
}
```

---

## 📁 Struktur Proyek

```
pc-build-inventory-api/
│
├── configurations/    # 🔌 Koneksi MongoDB & setup strategi Passport.js
├── controllers/       # 🎮 Handler request (userController.js, partController.js)
├── helpers/           # 🛠️ Pure functions yang reusable
│   ├── token.js       #     Generate & verify JWT
│   ├── password.js    #     Bcrypt hash & compare
│   ├── email.js       #     Nodemailer — kirim welcome email
│   └── errorHandler.js#     Format error response
├── middlewares/       # 🛡️ Pengecekan authorization & validasi request
├── models/            # 🗄️ Mongoose schema
│   ├── User.js        #     Schema pengguna
│   └── Part.js        #     Schema komponen PC
├── routes/            # 🗺️ Definisi endpoint
│   ├── userRoute.js   #     /user — auth & Google OAuth
│   └── partRoute.js   #     /part — CRUD komponen (protected)
│
├── .env               # 🔐 Environment variables (Git-ignored!)
├── index.js           # 🚪 Entry point & global middleware setup
└── package.json
```

---

## 💡 Konsep yang Dipelajari

- ✅ Desain REST API dengan arsitektur **MVC** yang dimodifikasi
- ✅ Autentikasi ganda: **Passport-JWT** dan **Passport-Google-OAuth20**
- ✅ Pemisahan concern menggunakan folder `helpers` untuk *pure functions*
- ✅ **Password hashing** aman menggunakan bcrypt
- ✅ **Fire-and-forget** email via Nodemailer — tidak memblokir response utama
- ✅ **Data isolation** — otorisasi ketat berbasis `_id` agar user hanya bisa ubah datanya sendiri
- ✅ **Environment variables** untuk melindungi kredensial DB, secret key, dan SMTP

---

<div align="center">

*Dibuat dengan ☕ dan semangat belajar sebagai bagian dari **KADA**.*

</div>