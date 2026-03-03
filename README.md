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

</div>

---

## ✨ Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| 🔐 **JWT Authentication** | Registrasi & login menggunakan *JSON Web Token* |
| 🟢 **Google OAuth 2.0** | Login langsung dengan akun Google via Passport |
| 🛂 **Passport.js** | Strategi autentikasi fleksibel (Local + JWT + Google) |
| 👤 **Data Personal** | Setiap user hanya bisa akses komponen miliknya sendiri |
| 📦 **Full CRUD** | Create, Read, Update, Delete untuk data komponen PC |
| ✅ **Validasi Data** | Kategori & status dibatasi `enum` Mongoose |
| 🛡️ **Middleware Lengkap** | Error handling terpusat, logger otomatis, validasi token |

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
  <img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat-square&logo=dotenv&logoColor=black" />
</p>

---

## 🔑 Alur Autentikasi

API ini mendukung **dua cara login** yang dikelola oleh Passport.js:

```
Cara 1 — Email & Password
  POST /user/register  →  Simpan user ke DB
  POST /user/login     →  Validasi kredensial  →  Terima JWT token

Cara 2 — Google OAuth 2.0
  GET /auth/google     →  Redirect ke halaman login Google
  GET /auth/google/callback  →  Google redirect balik  →  Terima JWT token

Semua endpoint /part  →  Wajib kirim JWT di header Authorization
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
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

> 💡 **Cara dapat Google credentials:** Buka [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Create OAuth 2.0 Client ID

**3. Jalankan server**

```bash
npm start
```

Server berjalan di 👉 **http://localhost:3000**

---

## 📡 API Endpoints

Semua request body dikirim dalam format `application/json`.

### 👤 User & Auth

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/user/register` | ❌ | Daftar akun baru |
| `POST` | `/user/login` | ❌ | Login, dapat JWT token |
| `GET` | `/user` | ✅ JWT | Lihat semua pengguna |
| `GET` | `/auth/google` | ❌ | Login via Google OAuth |
| `GET` | `/auth/google/callback` | ❌ | Callback redirect dari Google |

### 🔩 Komponen PC (Part)

> ⚠️ Semua endpoint di bawah wajib menyertakan header: `Authorization: Bearer <token>`

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

// Response
{
  "success": true,
  "message": "Registrasi berhasil."
}
```

### 2. Login — `POST /user/login`

```json
// Request Body
{
  "email": "daffa@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "id": "65e0a1b...",
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
  "name": "AMD Ryzen 7 5700U",
  "category": "CPU",
  "price": 3500000,
  "status": "Owned",
  "notes": "Dipakai di laptop HP"
}

// Response
{
  "success": true,
  "data": {
    "_id": "65e0a1b2c3d4e5f607890abc",
    "user_id": "65e0a1b...",
    "name": "AMD Ryzen 7 5700U",
    "category": "CPU",
    "price": 3500000,
    "status": "Owned",
    "notes": "Dipakai di laptop HP",
    "createdAt": "2026-03-02T10:00:00.000Z"
  }
}
```

### 4. Error — Token tidak valid

```json
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
├── config/          # 🔌 Koneksi database & konfigurasi Passport
├── controllers/     # 🎮 Handler request (user, auth, part)
├── middlewares/     # 🛡️ Auth JWT, logger, error handler
├── models/          # 🗄️ Mongoose schema — User & Part
├── routes/          # 🗺️ Definisi endpoint
│   ├── user.js      # /user routes
│   ├── auth.js      # /auth/google routes
│   └── part.js      # /part routes (protected)
│
├── .env             # 🔐 Environment variables (jangan di-commit!)
├── index.js         # 🚪 Entry point
└── package.json
```

---

## 💡 Konsep yang Dipelajari

- ✅ Desain REST API dengan struktur **MVC**
- ✅ Autentikasi menggunakan **JWT** dan **Google OAuth 2.0**
- ✅ Strategi autentikasi modular dengan **Passport.js**
- ✅ Data isolation — user hanya bisa akses data miliknya
- ✅ Penggunaan **environment variables** untuk menyimpan rahasia
- ✅ **Centralized error handling** dengan middleware Express

---

<div align="center">

*Dibuat dengan ☕ dan semangat belajar sebagai bagian dari **KADA**.*

</div>