# Portfolio CV

WELCOME TO MY Online CV & Portofolio

Starter website CV/portfolio dengan 4 halaman:
- `index.html` — beranda
- `about.html` — profil, skill, dan perjalanan belajar
- `blog.html` — proyek dan catatan belajar (dengan filter kategori)
- `kontak.html` — detail kontak dan demo formulir kontak

## Cara menjalankan
1. Ekstrak folder project.
2. Buka folder `cv-portfolio-starter` di VS Code.
3. Buka `index.html` di browser, atau gunakan extension Live Server.
4. Internet diperlukan untuk mengambil Bootstrap 5.3.8 dari CDN dan Google Fonts.

Untuk hosting statis seperti GitHub Pages atau Vercel, file HTML/CSS/JS ini bisa dipublikasikan tanpa PHP. Form kontak pada starter ini membuka aplikasi email (`mailto:`), bukan mengirim data ke server.

## Yang perlu kamu ganti
Cari placeholder berikut di semua file:
- `Nama Kamu` / `NAMA KAMU` — ganti nama kamu.
- `nama@email.com` — ganti dengan email aktif.
- `USERNAME` dan `REPO` — ganti URL GitHub/LinkedIn dan repository asli.
- `assets/img/profile-placeholder.svg` — ganti dengan foto kamu; sesuaikan `src` di HTML.
- Isi profil, skill, pendidikan, dan proyek — ubah supaya sesuai pengalaman asli.
- Tombol download CV belum diaktifkan karena file CV kamu belum disediakan.

## Interaksi yang sudah ada
- Navbar responsif Bootstrap.
- Tombol dark/light mode; pilihan disimpan di `localStorage` browser.
- Animasi teks singkat di halaman beranda.
- Filter kategori proyek di `blog.html`.
- Tombol salin email di halaman kontak.
- Form kontak dengan validasi browser yang menyiapkan draft email.
- Progress bar saat halaman di-scroll.

## Catatan
Portfolio ini adalah front-end statis. Form tidak terhubung ke backend/database. Jika nanti ingin mengirim pesan tanpa membuka aplikasi email, kamu perlu menghubungkan form ke backend atau layanan formulir.
