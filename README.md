# PC Build Inventory API

API RESTful sederhana untuk melacak daftar komponen PC rakitan, baik yang sudah dibeli (*Owned*) maupun yang masih dalam daftar incaran (*Wishlist*). Project ini dibuat sebagai bagian dari tugas latihan CRUD di Korea-ASEAN Digital Academy (KADA).

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Fitur

* **CRUD Operations:** Create, Read (All & by ID), Update, dan Delete data komponen PC.
* **Data Validation:** Kategori komponen dan status dibatasi menggunakan enumerasi (*enum*) skema Mongoose untuk menjaga konsistensi data.
* **Error Handling:** Penanganan *error* terpusat untuk validasi input yang kosong, format ID MongoDB yang tidak sesuai, dan kesalahan server.

## Cara Instalasi & Menjalankan

1. Pastikan Node.js sudah terinstal. Clone atau unduh repositori ini.
2. Buka terminal di direktori proyek dan jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   npm install
   ```
3. Buat file .env di root direktori proyek dan tambahkan konfigurasi berikut (sesuaikan URI MongoDB dengan milikmu):

   ```bash
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<nama-database>
   ```
4. Jalankan server pengembangan menggunakan Nodemon:
   ```bash
   npm start
   ```
## API Endpoints
Semua *request* yang menggunakan *body* harus dikirim dalam format application/json.
| Method | Endpoint | Deskripsi                                                                 |
|--------|----------|--------------------------------------------------------------------------|
| GET    | /        | Mengambil seluruh data daftar komponen PC                               |
| GET    | /:id     | Mengambil detail satu komponen berdasarkan parameter ID                 |
| POST   | /        | Menambahkan data komponen baru ke dalam database                        |
| PATCH  | /:id     | Memperbarui data komponen (sebagian atau seluruh field)                 |
| DELETE | /:id     | Menghapus data komponen berdasarkan parameter ID                        |

**Contoh Payload Data (POST/PATCH)**
```json
{
  "name": "AMD Ryzen 7 5700U",
  "category": "CPU",
  "price": 3500000,
  "status": "Owned",
  "notes": "Dipakai di laptop HP"
}
```

**Contoh Response Berhasil**
```json
{
  "success": true,
  "data": {
    "name": "AMD Ryzen 7 5700U",
    "category": "CPU",
    "price": 3500000,
    "status": "Owned",
    "notes": "Dipakai di laptop HP",
    "_id": "65e0a1b2c3d4e5f607890abc",
    "createdAt": "2026-02-28T10:00:00.000Z",
    "updatedAt": "2026-02-28T10:00:00.000Z"
  }
}
```

**Contoh Response Error (Validasi Gagal)**
```json
{
  "success": false,
  "error": [
    "Kategori wajib diisi",
    "Harga tidak boleh negatif"
  ]
}
```
