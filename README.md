# Log Perubahan - 17 April 2026

Hari ini telah dilakukan refaktorisasi besar pada modul **Application Form** untuk meningkatkan pemeliharaan kode (maintainability) dan pengalaman pengguna (UX).

## 🛠️ Perubahan Arsitektur & Kode

### 1. Pemisahan Konstanta Form (`lib/constants.ts`)
Telah dibuat file pusat konstanta untuk memisahkan konten statis dari logika komponen. Hal ini mencakup:
- **Pernyataan Deklarasi:** Teks persetujuan akhir dalam Bahasa Indonesia dan Inggris.
- **Opsi Pilihan:** Opsi dropdown seperti *Availability Notice* (Ketersediaan).
- **Metadata Langkah:** Definisi urutan langkah form (*steps*) dan field terkait.
- **Label Field:** Pemetaan path data ke nama label yang ramah pengguna untuk pesan validasi.

### 2. Peningkatan UI/UX Validasi
- **Field-Level Error:** Pesan kesalahan validasi kini muncul tepat di bawah setiap input yang bermasalah, bukan lagi di kotak ringkasan besar.
- **Pembersihan UI:** Menghapus kotak ringkasan error di bagian bawah form untuk tampilan yang lebih bersih dan profesional.
- **Auto-Scroll:** Memastikan fitur *scroll* otomatis ke field pertama yang error tetap berfungsi saat user menekan tombol "Continue".

### 3. Modularitas Komponen
- Memperbarui komponen di `components/ApplicationForm/sections/` agar menggunakan konstanta pusat.
- Memperbarui `PersonalDataSection` dan `FamilyDataSection` dengan penanganan error per field yang lebih intuitif.

## 📂 Struktur File Terkait
- `lib/constants.ts` (Baru): Pusat data statis form.
- `components/ApplicationForm/ApplicationForm.tsx`: Logika utama dan navigasi langkah.
- `components/ApplicationForm/sections/*.tsx`: Tampilan tiap bagian form.

---
*Perubahan telah di-commit dan di-push ke branch `main`.*
