# 🎓 Smart Exam

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)
![OpenPyXL](https://img.shields.io/badge/OpenPyXL-Excel-success)
![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Deskripsi

**Smart Exam** adalah aplikasi ujian online berbasis **Flask** yang dirancang untuk memudahkan proses pelaksanaan ujian secara digital. Aplikasi ini memiliki fitur registrasi, login, pelaksanaan ujian, perhitungan nilai otomatis, serta penyimpanan data pengguna ke dalam file Microsoft Excel menggunakan **OpenPyXL**.

---

## ✨ Fitur

- 🔐 Login pengguna
- 📝 Registrasi akun
- 📚 Halaman ujian online
- ✅ Penilaian otomatis
- 📊 Halaman hasil ujian
- 💾 Penyimpanan data ke file Excel
- 🎨 Tampilan antarmuka sederhana dan responsif

---

## 🛠️ Teknologi yang Digunakan

- Python 3.12
- Flask
- HTML5
- CSS3
- JavaScript
- OpenPyXL
- Microsoft Excel

---

## 📂 Struktur Folder

```text
Smart-Exam/
│
├── app.py
├── excel_db.py
├── users.xlsx
├── README.md
│
├── database/
│   └── __pycache__/
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── detector.js
│
└── templates/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── exam.html
    └── result.html
```

---

## 📷 Tampilan Aplikasi

### Halaman Utama

> Tambahkan screenshot pada folder **screenshots/**

```text
screenshots/home.png
```

---

### Halaman Login

```text
screenshots/login.png
```

---

### Halaman Registrasi

```text
screenshots/register.png
```

---

### Halaman Ujian

```text
screenshots/exam.png
```

---

### Halaman Hasil

```text
screenshots/result.png
```

---

## ⚙️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/smart-exam.git
```

### 2. Masuk ke Folder Project

```bash
cd smart-exam
```

### 3. Buat Virtual Environment (Opsional)

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux/MacOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependency

```bash
pip install -r requirements.txt
```

atau

```bash
pip install flask openpyxl pandas
```

---

## ▶️ Menjalankan Program

Jalankan aplikasi menggunakan:

```bash
python app.py
```

Kemudian buka browser:

```
http://127.0.0.1:5000
```

---

## 🚀 Cara Penggunaan

1. Jalankan aplikasi Flask.
2. Buka halaman utama.
3. Registrasi akun baru.
4. Login menggunakan akun yang telah dibuat.
5. Kerjakan soal ujian.
6. Klik tombol **Submit**.
7. Sistem akan menghitung nilai secara otomatis.
8. Hasil ujian akan ditampilkan kepada pengguna.

---

## 💾 Penyimpanan Data

Seluruh data pengguna disimpan pada file:

```
users.xlsx
```

Data yang disimpan meliputi:

- Nama
- Username
- Password
- Nilai ujian

---

## 📈 Diagram Alur Sistem

```text
          Mulai
             │
             ▼
      Halaman Utama
             │
             ▼
        Registrasi/Login
             │
             ▼
        Halaman Ujian
             │
             ▼
      Jawab Seluruh Soal
             │
             ▼
         Submit Jawaban
             │
             ▼
     Hitung Nilai Otomatis
             │
             ▼
      Simpan ke users.xlsx
             │
             ▼
      Tampilkan Hasil Ujian
             │
             ▼
            Selesai
```

---

## 📦 Library yang Digunakan

- Flask
- OpenPyXL
- Pandas

---

## 📌 Requirements

Buat file **requirements.txt** dengan isi berikut:

```text
Flask
openpyxl
pandas
```

Kemudian install menggunakan:

```bash
pip install -r requirements.txt
```

---

## 👨‍💻 Pengembang

**Agung Maulana**

Program Studi : Teknik Informatika

Universitas : *(Isi nama universitas Anda)*

GitHub : https://github.com/username

Email : your.email@example.com

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran, penelitian, dan tugas akademik.

Silakan digunakan, dimodifikasi, dan dikembangkan dengan tetap mencantumkan sumber apabila diperlukan.

---

⭐ **Jika proyek ini bermanfaat, jangan lupa berikan Star pada repository GitHub.**