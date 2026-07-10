# OAT & ASHES — Aplikasi E-Commerce Kopi & Teh Spesialti Berbasis Web

Aplikasi e-commerce single-page yang dikembangkan menggunakan Vue.js 3 dan Firebase, dibuat untuk memenuhi persyaratan proyek mata kuliah pengembangan web. Aplikasi ini memungkinkan pengguna untuk menelusuri, mengelola, dan membeli produk kopi dan teh spesialti melalui antarmuka responsif dengan kemampuan autentikasi dan state management yang lengkap.

---

## Pemenuhan Kriteria

### Kriteria 1: Firebase sebagai Sumber Data

Aplikasi ini menggunakan **Firebase Realtime Database** sebagai sumber data utama. Seluruh informasi produk disimpan dan diambil dari struktur JSON NoSQL yang di-hosting di Firebase. Database diorganisasikan ke dalam dua node utama: `products/` dan `users/`, masing-masing menyimpan data yang diidentifikasi oleh unique key yang dihasilkan oleh Firebase. Contoh struktur data dapat ditemukan di [`sample-data.json`](sample-data.json).

### Kriteria 2: Operasi CRUD (Create, Read, Update, Delete)

Fungsionalitas CRUD lengkap diimplementasikan untuk data produk melalui Vuex actions yang terhubung dengan Firebase Realtime Database SDK:

| Operasi | Implementasi | Metode Firebase |
|-----------|---------------|-----------------|
| **Create** | `AddProductView.vue` + `ProductForm.vue` | `push()` |
| **Read** | `ProductsView.vue`, `ProductDetailView.vue` | `onValue()` (realtime), `get()` |
| **Update** | `EditProductView.vue` + `ProductForm.vue` | `update()` |
| **Delete** | Tombol hapus pada kartu produk dan halaman detail | `remove()` |

Halaman daftar produk menggunakan realtime listener (`onValue`), sehingga setiap perubahan yang terjadi pada database akan langsung tercermin di UI tanpa perlu me-refresh halaman.

### Kriteria 3: Registrasi dan Autentikasi Pengguna

Autentikasi pengguna ditangani melalui **Firebase Authentication** dengan metode sign-in Email/Password. Formulir registrasi mengumpulkan tiga field sesuai ketentuan:
- **Nama** (username / display name)
- **Email**
- **Password** (minimal 6 karakter, dengan field konfirmasi)

Setelah registrasi berhasil, informasi profil pengguna (`name`, `email`, `createdAt`) disimpan ke node `/users/{uid}` di Realtime Database.

### Kriteria 4: Proteksi Halaman

Kontrol akses tingkat halaman diimplementasikan menggunakan **Vue Router navigation guards** (`router.beforeEach`). Tabel rute mendefinisikan dua kategori yang dilindungi:

| Rute | Akses | Perilaku Jika Tidak Sah |
|-------|--------|--------------------------|
| `/products/add` | Hanya terautentikasi | Dialihkan ke `/login?redirect=<path>` |
| `/products/:id/edit` | Hanya terautentikasi | Dialihkan ke `/login?redirect=<path>` |
| `/login`, `/register` | Hanya tamu (guest) | Dialihkan ke `/` jika sudah login |

Navigation guard menunggu `onAuthStateChanged` Firebase selesai sebelum membuat keputusan routing, mencegah flash halaman login saat pertama kali dimuat bagi pengguna yang sudah terautentikasi.

### Kriteria 5: Vuex untuk Mengelola State

Aplikasi ini menggunakan **Vuex 4** untuk mengelola state global melalui empat module namespace:

| Modul | Kegunaan | Penyimpanan |
|--------|---------|-------------|
| `auth` | State sesi pengguna, aksi login/register/logout | Sesi Firebase Auth |
| `products` | Katalog produk, produk saat ini, operasi CRUD | Firebase Realtime DB |
| `cart` | Item keranjang belanja, kuantitas, total | `localStorage` |
| `wishlist` | Item produk yang disimpan/difavoritkan | `localStorage` |

Setiap modul menyediakan `state`, `getters`, `mutations`, dan `actions` mengikuti konvensi Vuex. Modul `products` memanfaatkan sinkronisasi realtime Firebase melalui listener `onValue`, memungkinkan pembaruan UI otomatis saat data berubah.

---

## Arsitektur Sistem

### Technology Stack

| Layer | Teknologi | Versi |
|-------|-----------|---------|
| Frontend Framework | Vue.js (Composition API, `<script setup>`) | 3.4+ |
| State Management | Vuex | 4.1+ |
| Client-Side Routing | Vue Router | 4.3+ |
| CSS Framework | Tailwind CSS | 3.4+ |
| Build Tool | Vite | 5.4+ |
| Backend / Database | Firebase Realtime Database | SDK 10.12+ |
| Autentikasi | Firebase Authentication | SDK 10.12+ |

### Struktur Proyek

```
oat-and-ashes-web-project/
├── index.html                        # Entry point aplikasi
├── package.json                      # Dependensi dan scripts
├── vite.config.js                    # Konfigurasi Vite build
├── tailwind.config.js                # Kustomisasi tema Tailwind
├── firebase.json                     # Konfigurasi Firebase Hosting
├── sample-data.json                  # Contoh struktur data Firebase
├── src/
│   ├── main.js                       # Inisialisasi aplikasi Vue
│   ├── App.vue                       # Root component dengan layout
│   ├── assets/main.css               # Global styles (Tailwind directives)
│   ├── firebase/config.js            # Inisialisasi Firebase SDK
│   ├── router/index.js               # Definisi rute dan navigation guards
│   ├── store/
│   │   ├── index.js                  # Pembuatan Vuex store
│   │   └── modules/
│   │       ├── auth.js               # Modul autentikasi
│   │       ├── products.js           # Modul CRUD produk
│   │       ├── cart.js               # Modul keranjang belanja
│   │       └── wishlist.js           # Modul wishlist
│   ├── views/
│   │   ├── HomeView.vue              # Halaman utama (landing)
│   │   ├── ProductsView.vue          # Katalog produk dengan filter
│   │   ├── ProductDetailView.vue     # Halaman detail produk
│   │   ├── AddProductView.vue        # Form tambah produk (protected)
│   │   ├── EditProductView.vue       # Form edit produk (protected)
│   │   ├── LoginView.vue             # Halaman login
│   │   ├── RegisterView.vue          # Halaman registrasi
│   │   ├── CartView.vue              # Keranjang belanja dengan ringkasan
│   │   ├── OrderConfirmationView.vue # Konfirmasi setelah checkout
│   │   ├── WishlistView.vue          # Item yang disimpan pengguna
│   │   └── NotFoundView.vue          # Halaman 404
│   └── components/
│       ├── Navbar.vue                # Navigasi responsif
│       ├── HeroBanner.vue            # Hero section halaman utama
│       ├── ProductCard.vue           # Kartu produk reusable
│       ├── ProductForm.vue           # Form produk reusable
│       ├── CartItem.vue              # Item baris keranjang
│       └── LoadingSpinner.vue        # Indikator loading
```

### Desain Rute

| Path | View Component | Memerlukan Autentikasi |
|------|---------------|:-----------------------:|
| `/` | `HomeView` | Tidak |
| `/products` | `ProductsView` | Tidak |
| `/products/:id` | `ProductDetailView` | Tidak |
| `/products/add` | `AddProductView` | Ya |
| `/products/:id/edit` | `EditProductView` | Ya |
| `/login` | `LoginView` | Hanya tamu |
| `/register` | `RegisterView` | Hanya tamu |
| `/cart` | `CartView` | Tidak |
| `/order-confirmation` | `OrderConfirmationView` | Tidak |
| `/wishlist` | `WishlistView` | Tidak |

---

## Spesifikasi Desain

Identitas visual OAT & ASHES mengadopsi estetika brutalisme yang diperhalus (softened brutalism) dengan warna-warna hangat. Keputusan desain utama meliputi:

- **Palet Warna**: Tan (`#D2B48C`), Cream (`#FCF9F8`), Espresso (`#2C1810`)
- **Tipografi**: Archivo Narrow untuk judul display (uppercase, bold), Inter untuk teks isi, JetBrains Mono untuk metadata dan label
- **Elemen UI**: Border solid 2px, block shadow (`3px 3px 0px`), tombol persegi dengan animasi press-state
- **Layout**: Grid alignment yang ketat, pembagi bagian yang tebal, padding internal yang longgar
- **Citra**: Fotografi bernuansa hangat yang bersumber dari Unsplash dan Pexels

Design tokens didefinisikan di `tailwind.config.js` pada key `theme.extend`.

---

## Setup dan Instalasi

### Prasyarat

- Node.js (versi 18 atau lebih tinggi)
- npm (versi 9 atau lebih tinggi)
- Proyek Firebase dengan:
  - **Authentication** (Email/Password provider diaktifkan)
  - **Realtime Database** (dibuat dalam test mode)

### Pengembangan Lokal

```bash
# Clone repositori
git clone https://github.com/<your-username>/oat-and-ashes-web-project.git
cd oat-and-ashes-web-project

# Install dependensi
npm install

# Konfigurasi Firebase
# Edit src/firebase/config.js dengan kredensial proyek Firebase Anda

# Jalankan development server
npm run dev
```

Aplikasi akan tersedia di `http://localhost:5173`.

### Konfigurasi Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat proyek baru atau pilih proyek yang sudah ada
3. Di **Build → Authentication → Sign-in method**, aktifkan **Email/Password**
4. Di **Build → Realtime Database**, buat database dalam test mode
5. Dari **Project Settings → General → Your apps**, daftarkan aplikasi web baru
6. Salin objek `firebaseConfig` dan tempelkan ke `src/firebase/config.js`
7. Pastikan field `databaseURL` sesuai dengan region database Anda (contoh: `https://<project-id>-default-rtdb.asia-southeast1.firebasedatabase.app`)

### Deployment

```bash
# Build untuk production
npm run build

# Deploy ke Firebase Hosting
firebase login
firebase deploy --only hosting
```

---

## Model Data

Firebase Realtime Database menggunakan struktur JSON sebagai berikut:

```json
{
  "products": {
    "<unique-id>": {
      "name": "string",
      "category": "Coffee Beans | Loose Leaf Tea | Matcha | Brewing Equipment | Merchandise",
      "origin": "string",
      "roast": "Light | Medium | Dark",
      "type": "string",
      "weight": "string",
      "price": "string (numeric, dalam IDR)",
      "description": "string",
      "image": "string (URL)",
      "createdAt": "string (ISO 8601 datetime)"
    }
  },
  "users": {
    "<firebase-uid>": {
      "name": "string",
      "email": "string",
      "createdAt": "string (ISO 8601 datetime)"
    }
  }
}
```

Contoh lengkap dengan data sampel tersedia di [`sample-data.json`](sample-data.json).

---

## Referensi

- Dokumentasi Firebase: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Dokumentasi Vue.js: [https://vuejs.org/guide](https://vuejs.org/guide)
- Dokumentasi Vuex: [https://vuex.vuejs.org](https://vuex.vuejs.org)
- Dokumentasi Vue Router: [https://router.vuejs.org](https://router.vuejs.org)
- Dokumentasi Tailwind CSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- Sumber Gambar: [Unsplash](https://unsplash.com/), [Pexels](https://www.pexels.com/)

---

*Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah pengembangan web. Dibangun dengan Vue.js 3 dan Firebase.*
