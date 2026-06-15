# 🎓 Context-Aware Smart Exam (Simulasi E-Ujian Pervasif)

Sebuah simulasi platform ujian online (Mini Online Exam Platform) yang dilengkapi dengan pengawasan cerdas berbasis **Pervasive Computing (Komputasi Pervasif)**. Aplikasi ini bersifat *context-aware*, di mana ia mampu mendeteksi keberadaan (*presence*) serta tingkat perhatian (*attention*) pengguna secara *real-time* selama ujian berlangsung.

Proyek ini dikembangkan sebagai tugas Ujian Akhir Semester (UAS) Mata Kuliah Komputasi Pervasif.

---

## ✨ Fitur Utama (Smart Detector)
Aplikasi ini berjalan secara mandiri di browser dan secara aktif memantau dua kondisi berikut:

1. **Tab Visibility Monitor (Anti-Cheating):**
   Memanfaatkan *Page Visibility API* untuk mendeteksi jika mahasiswa berpindah ke tab atau aplikasi lain (indikasi menyontek/Googling). 
   - **Aksi Pervasif:** Sistem akan mencatat pelanggaran secara *real-time*, memunculkan *alert* peringatan, dan membunyikan alarm audio.

2. **User Inactivity / Idle Detector (Presence Tracker):**
   Sistem memantau *event* DOM (`mousemove`, `keypress`, `scroll`, `click`) untuk mendeteksi apakah perangkat ditinggalkan oleh penggunanya.
   - **Aksi Pervasif:** Jika tidak ada aktivitas selama **15 detik**, status pengguna dianggap AFK (*Away From Keyboard*). Layar peringatan merah akan muncul, alarm audio akan berbunyi *looping*, dan *timer* ujian akan otomatis dijeda.

3. **Log Perilaku & Diskualifikasi Otomatis:**
   Pada akhir ujian, sistem akan menampilkan laporan lengkap berisi jumlah perpindahan tab dan total durasi AFK dalam hitungan detik. Terdapat logika diskualifikasi otomatis jika pengguna terlalu banyak melakukan pelanggaran.

---

## 🚀 Teknologi yang Digunakan
Proyek ini dikembangkan menggunakan pendekatan *Vanilla Web Technologies* tanpa ketergantungan pada pustaka eksternal yang rumit, sehingga performa sensor deteksinya sangat cepat:
- **HTML5** (Semantik struktur & Web Audio API)
- **CSS3** (Desain UI *Modern Glassmorphism* & *Animated Gradient Background*)
- **Vanilla JavaScript** (Logika komputasi pervasif, Event Listeners, & manipulasi DOM)

---

## 🛠️ Cara Menjalankan & Mengakses Aplikasi
Karena aplikasi ini dibangun murni dengan HTML/CSS/JS dasar, aplikasi dapat langsung dijalankan langsung dari perangkat mana saja tanpa perlu mengonfigurasi *server* lokal atau melakukan instalasi *framework*.

1. **Unduh (Clone/Download) Repositori ini:**
   ```bash
   git clone [https://github.com/username-github-kamu/nama-repo-kamu.git](https://github.com/username-github-kamu/nama-repo-kamu.git)