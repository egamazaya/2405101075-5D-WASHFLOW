# 2405101075-5D-WASHFLOW

## Identitas Mahasiswa

- Nama: Ega Mazaya Putra

- NIM: 2405101075

- Kelas: 5D

- Program Studi: Teknik informatika

- Mata Kuliah: Pemrograman Web Dasar

- Tahun Akademik:2026/2027


Sekarang sudah jelas: aplikasi memakai **`localStorage`** (kunci `wf_data`) dengan data awal (seed) di `app.js`. Berikut README yang sudah saya sesuaikan:


## 1. Deskripsi Pengerjaan UTS

WashFlow adalah aplikasi web berbasis frontend untuk membantu operasional usaha cuci mobil dan motor. Aplikasi mencakup alur kerja harian: kendaraan didaftarkan, masuk antrean, dicuci, dibayar di kasir, lalu pelanggan memperoleh poin member. Pelanggan juga dapat memantau progres kendaraannya lewat halaman publik tanpa login.

**Tujuan pengerjaan**
- Membangun antarmuka multi-halaman yang konsisten dan responsif.
- Menerapkan validasi form, manipulasi DOM, dan pengelolaan data di sisi klien.
- Mensimulasikan alur bisnis nyata (antrean, status, pembayaran, loyalitas pelanggan) tanpa backend.

**Pendekatan pengerjaan**
- **Multi-halaman:** setiap fitur berada di file HTML tersendiri. Sidebar, topbar, dan footer dirender oleh `Layout.mount()` dari `app.js`, sehingga tampilan seragam di semua halaman.
- **Tanpa database server:** seluruh data disimpan di `localStorage` browser dengan kunci `wf_data`. Pada pembukaan pertama, data awal (dummy) diisi otomatis dari objek `SEED` di `app.js`: 7 paket layanan, 4 pelanggan, dan 3 antrean contoh.
- **Kode bersama:** `app.js` menyediakan `DB` (get/set/reset), `rp()` (format rupiah), `STATUS` dan `badge()` (label status), `layananOf()` (cari layanan), dan `Layout`. `main.js` menangani interaksi umum (sidebar, jam, pencarian tabel, dialog konfirmasi, format plat nomor).
- **UI:** Bootstrap 5 dan Bootstrap Icons, gaya kustom di `style.css` (tema biru navy), gaya cetak di `print.css`, grafik dashboard memakai Chart.js.

**Teknologi:** HTML5, CSS3, JavaScript (vanilla), Bootstrap 5.3.3, Bootstrap Icons 1.11.3, Chart.js 4.4.1, font Inter (Google Fonts).

---

## 2. Ringkasan Fitur yang Diimplementasikan

### Fitur per halaman

| No | Halaman | Fitur |
|----|---------|-------|
| 1 | `login.html` | Login peran Admin dan Kasir, pesan error bila kredensial salah, tombol isi otomatis akun demo, tautan ke cek status |
| 2 | `dashboard.html` | Kartu ringkasan (total kendaraan, menunggu, sedang dicuci, pendapatan) dan grafik batang layanan paling sering dipesan |
| 3 | `registrasi.html` | Input kendaraan baru dengan validasi wajib isi, paket layanan menyesuaikan jenis kendaraan, info harga dan estimasi durasi, kode antrean otomatis (`WF-001`, dst.), pelanggan baru otomatis tercatat |
| 4 | `antrean.html` | Daftar antrean, pencarian plat/nama, filter status, tombol memajukan status (Mulai Cuci → Selesaikan) |
| 5 | `kasir.html` | Daftar tagihan, metode Tunai/QRIS/Transfer, validasi uang diterima, hitung kembalian, nota yang dapat dicetak, penambahan poin dan kunjungan pelanggan |
| 6 | `layanan.html` | CRUD paket layanan (tambah, ubah, hapus dengan konfirmasi), pencarian, form modal |
| 7 | `pelanggan.html` | Daftar pelanggan dengan kunjungan dan poin member, pencarian |
| 8 | `cek-status.html` | Halaman publik pelacakan kendaraan lewat kode antrean atau plat nomor, ditampilkan sebagai progres bertahap |
| 9 | `index.html` | Pengalihan otomatis ke halaman login |

### Fitur umum (layout dan interaksi)

- Sidebar dengan menu aktif, dapat diciutkan di desktop (preferensi tersimpan di `localStorage`) dan berupa panel geser di mobile.
- Topbar dengan tanggal, jam digital real-time, dan tombol pintas Input Kendaraan.
- Nama dan peran pengguna yang sedang login ditampilkan di sidebar, dengan tombol keluar (disertai konfirmasi).
- Pencarian tabel langsung (live search), plat nomor otomatis huruf kapital, dan dialog konfirmasi global.
- Tampilan responsif untuk desktop dan mobile.

### Alur status dan aturan bisnis

```
menunggu  →  dicuci  →  selesai  →  dibayar
```

- Kode antrean dibuat otomatis dari ID (`WF-001`, `WF-002`, ...).
- Poin member: 1 poin untuk setiap Rp10.000 dari total transaksi, dan kunjungan bertambah 1 setiap pembayaran dikonfirmasi.
- Pelanggan baru otomatis ditambahkan saat kendaraan didaftarkan bila namanya belum ada.

---

## 3. Struktur Folder Hasil UTS

```
washflow/
├── index.html          # Redirect otomatis ke login.html
├── login.html          # Halaman login
├── dashboard.html      # Ringkasan dan grafik
├── registrasi.html     # Input kendaraan baru
├── antrean.html        # Antrean dan perubahan status
├── kasir.html          # Pembayaran dan cetak nota
├── layanan.html        # Kelola paket layanan
├── pelanggan.html      # Data pelanggan dan poin
├── cek-status.html     # Cek status kendaraan (publik)
├── README.md           # Dokumen panduan ini
└── assets/
    ├── css/
    │   ├── style.css   # Tema dan komponen (sidebar, card, tabel, stepper, nota)
    │   └── print.css   # Gaya khusus saat mencetak nota/laporan
    └── js/
        ├── app.js      # Data awal (SEED), DB (localStorage), helper, dan Layout
        └── main.js     # Interaksi umum: sidebar, jam, live search, konfirmasi, plat
```

---

## 4. Petunjuk Menjalankan Aplikasi

**Prasyarat**
- Browser modern (Chrome, Edge, Firefox, atau Safari).
- Koneksi internet, karena Bootstrap, Bootstrap Icons, Chart.js, dan font dimuat lewat CDN.
- Tidak perlu instalasi database, PHP, atau Node.js untuk menjalankan aplikasi.

**Langkah-langkah**

1. Ekstrak atau salin seluruh proyek ke satu folder. Pastikan semua file HTML dan folder `assets/` berada dalam folder yang sama.
2. Jalankan web server lokal (disarankan), misalnya dari dalam folder proyek:
   ```bash
   # Python
   python -m http.server 8000

   # atau Node.js
   npx serve .
   ```
   Alternatif: gunakan ekstensi **Live Server** di VS Code (klik kanan `index.html` → *Open with Live Server*).
3. Buka `http://localhost:8000` di browser. Anda akan diarahkan otomatis ke halaman login.
4. Masuk dengan akun demo berikut (atau klik tombol **Demo Admin** / **Demo Kasir**):

   | Peran | Username | Password   |
   |-------|----------|------------|
   | Admin | `admin`  | `admin123` |
   | Kasir | `kasir`  | `kasir123` |

**Skenario uji singkat**

1. Login, lalu buka **Input Kendaraan** dan daftarkan satu kendaraan. Kendaraan masuk antrean berstatus *Menunggu*.
2. Di **Antrean**, klik *Mulai Cuci*, lalu *Selesaikan*.
3. Di **Kasir**, klik *Bayar*, pilih metode, isi uang diterima, lalu konfirmasi dan cetak nota.
4. Buka **Pelanggan** untuk melihat poin dan kunjungan bertambah, dan **Dashboard** untuk melihat ringkasan terbaru.
5. Buka **Cek Status** (dari halaman login atau sidebar) dan cari dengan kode antrean (mis. `WF-001`) atau plat nomor (mis. `B 1234 ABC`).

**Mengembalikan data ke awal**

Data tersimpan di browser. Untuk mengembalikan ke data contoh, buka Console browser (F12) lalu jalankan:

```js
DB.reset(); location.reload();
```

Atau hapus data situs (site data) lewat pengaturan browser.

**Catatan dan keterbatasan**
- Autentikasi hanya simulasi di sisi klien: kredensial ditulis di `login.html`, dan halaman lain belum memeriksa status login sebelum ditampilkan.
- Data tersimpan di browser perangkat yang dipakai, tidak tersinkron antar perangkat, dan hilang bila data browser dibersihkan.
- Pelanggan dikenali berdasarkan kesamaan nama, dan nomor telepon pelanggan baru diisi `-`.
- Label "Pendapatan Hari Ini" di dashboard menjumlahkan semua transaksi berstatus dibayar, belum difilter tanggal.
- File `print.css` sudah tersedia, tetapi belum ditautkan di halaman HTML mana pun. Tambahkan `<link rel="stylesheet" href="assets/css/print.css">` setelah `style.css` jika ingin gaya cetaknya aktif.
````
