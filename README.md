<div align="center">

# 🖥️ PC Build Inventory API

**API RESTful untuk melacak komponen PC rakitan — dari yang sudah dibeli hingga yang masih diincar.**

> Dibuat sebagai bagian dari tugas latihan CRUD di **Korea-ASEAN Digital Academy (KADA)**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

</div>

---

## ✨ Fitur

- 🔐 **Autentikasi JWT** — Registrasi & login menggunakan *JSON Web Token*
- 👤 **Personalized Data** — Setiap pengguna hanya bisa mengakses komponen miliknya sendiri
- 📦 **Full CRUD** — Create, Read (All & by ID), Update, dan Delete data komponen PC
- ✅ **Data Validation** — Kategori & status dibatasi dengan `enum` Mongoose untuk konsistensi data
- 🛡️ **Middleware** — Error handling terpusat, logging otomatis, dan validasi token terstruktur

---

## 🚀 Cara Instalasi & Menjalankan

**1. Clone repositori & install dependensi**

```bash
git clone https://github.com/your-username/pc-build-inventory-api.git
cd pc-build-inventory-api
npm install
```

**2. Buat file `.env` di root direktori**

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<nama-database>
JWT_SECRET=rahasia_super_kuat_123
```

**3. Jalankan server**

```bash
npm start
```

Server berjalan di 👉 **http://localhost:3000**

---

## 📡 API Endpoints

Semua request yang menggunakan body harus dikirim dalam format `application/json`.

### 👤 Pengguna (User)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/user` | Mengambil data seluruh pengguna *(wajib login)* |
| `POST` | `/user/register` | Mendaftarkan akun pengguna baru |
| `POST` | `/user/login` | Login dan mendapatkan token akses JWT |

### 🔩 Komponen (Part)

> ⚠️ Semua endpoint berikut memerlukan header: `Authorization: Bearer <token>`

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/part` | Mengambil seluruh komponen PC milik pengguna yang login |
| `GET` | `/part/:id` | Mengambil detail satu komponen berdasarkan ID |
| `POST` | `/part` | Menambahkan komponen baru ke daftar pengguna |
| `PATCH` | `/part/:id` | Memperbarui data komponen (sebagian atau seluruh field) |
| `DELETE` | `/part/:id` | Menghapus komponen berdasarkan ID |

---

## 🧪 Contoh Request & Response

### 1. Login — `POST /user/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Berhasil:**

```json
{
  "success": true,
  "data": {
    "id": "65e0a1b...",
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

---

### 2. Tambah Komponen PC — `POST /part`

**Header:** `Authorization: Bearer eyJhbGci...`

**Request Body:**

```json
{
  "name": "AMD Ryzen 7 5700U",
  "category": "CPU",
  "price": 3500000,
  "status": "Owned",
  "notes": "Dipakai di laptop HP"
}
```

**Response Berhasil:**

```json
{
  "success": true,
  "data": {
    "user_id": "65e0a1b...",
    "name": "AMD Ryzen 7 5700U",
    "category": "CPU",
    "price": 3500000,
    "status": "Owned",
    "notes": "Dipakai di laptop HP",
    "_id": "65e0a1b2c3d4e5f607890abc",
    "createdAt": "2026-03-02T10:00:00.000Z",
    "updatedAt": "2026-03-02T10:00:00.000Z"
  }
}
```

**Response Error — Token tidak valid / belum login:**

```json
{
  "success": false,
  "error": "Akses ditolak. Token tidak ditemukan."
}
```

---

## 📁 Struktur Proyek

```
pc-build-inventory-api/
│
├── config/          # 🔌 Koneksi database
├── controllers/     # 🎮 Handler request
├── middlewares/     # 🛡️ Auth, logger, error handler
├── models/          # 🗄️ Mongoose schema (User & Part)
├── routes/          # 🗺️ Definisi endpoint
│
├── .env             # 🔐 Environment variables (jangan di-commit!)
├── index.js         # 🚪 Entry point
└── package.json
```

---

<div align="center">

*Dibuat dengan ☕ dan semangat belajar sebagai bagian dari KADA.*

</div>
