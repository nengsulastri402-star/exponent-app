# ROADMAP.md — Rencana Development, Implementation, Evaluation (ADDIE)

Status: Analysis ✅ · Design ✅ · Development ⏳ · Implementation ⬜ · Evaluation ⬜

## Fase Development — Urutan Vibe Coding
Kerjakan satu langkah per sesi dengan asisten AI. Simpan tangkapan layar interaksi untuk laporan.

### Sprint 0 — Fondasi
- [x] 0.1 Inisialisasi Vite + React + Tailwind; struktur folder (ARCHITECTURE.md §2)
- [x] 0.2 Konfigurasi PWA (manifest, ikon, service worker)
- [ ] 0.3 Proyek Supabase: jalankan migrasi skema, aktifkan RLS — SQL sudah ditulis (`supabase/migrations/0001_skema.sql`, `supabase/seed.sql`); **tinggal dijalankan di dashboard Supabase oleh mahasiswa**
- [x] 0.4 Halaman Masuk dengan kode siswa; `lib/supabase.js`, `lib/logger.js` (belum diuji dengan database sungguhan)
- [x] 0.5 Token desain (warna, font) dan komponen `Pangkat` (F3); halaman uji di `/tipografi`
- [x] 0.6 Siapkan lingkungan **Python**: `analysis/requirements.txt` dan `analysis/README.md` (venv, cara menjalankan)

### Sprint 1 — Inti Belajar (fitur WAJIB)
- [ ] 1.1 Rangka modul (F2): navigasi langkah, progres, penguncian modul
- [ ] 1.2 `Pembongkar` (F1) + Modul 1 langkah belajar
- [ ] 1.3 Latihan + petunjuk 3 tingkat (F5) untuk Modul 1
- [ ] 1.3b **Python:** `analysis/verifikasi_soal.py` memeriksa semua kunci di `src/data/soal.json` (hitung ulang dengan `fractions.Fraction`, mis. 9⁰ + 3⁻² = 10/9); jalankan setiap kali soal berubah
- [ ] 1.4 Modul 2 (pembagian) memakai komponen yang sama
- [ ] 1.5 `PenemuPola` (F4) + Modul 3

### Sprint 2 — Fitur Penting
- [ ] 2.1 Umpan balik miskonsepsi (F9) + `cekJawaban.js`
- [ ] 2.2 `PanelContoh` berdampingan (F7)
- [ ] 2.3 Diagnostik prasyarat + refresher (F6)
- [ ] 2.4 Penanda soal cerita (F8)

### Sprint 3 — Evaluasi dan Penyelesaian
- [ ] 3.1 Halaman Pretest/Posttest dan halaman skala Leppink
- [ ] 3.2 **Python:** `analysis/ekspor_data.py` (tabel Supabase → CSV) dan `analysis/ringkasan.py` (selisih pretest–posttest, subskala Leppink, tren petunjuk, waktu, miskonsepsi → tabel dan grafik di `analysis/output/`)
- [ ] 3.3 (Opsional) F10 Uji angka kecil
- [ ] 3.4 Uji perangkat: Android Chrome + Windows browser; uji grayscale; uji keterbacaan pangkat
- [ ] 3.5 Perbaikan bug, deploy

## Fase Implementation
| Pertemuan | Kegiatan | Keluaran |
|---|---|---|
| Sebelum sesi | Pretest pada dua siswa percobaan (belum pernah belajar eksponen) | Skor awal |
| Sesi 1 | Modul 1 dan diagnostik | Data jawaban dan petunjuk |
| Sesi 2 | Modul 2 dan 3 | Data jawaban dan petunjuk |
| Sesi 3 (opsional) | Latihan campuran | Data transfer |
| Pertemuan 4 | Pembelajaran difasilitasi mahasiswa | Catatan observasi |
| Pertemuan 5 | Posttest dan skala Leppink | Skor akhir dan subskala |

Prasyarat sebelum Implementation: izin siswa dan orang tua; kode siswa (P01, P02); perangkat siswa siap; aplikasi sudah di-deploy.

## Fase Evaluation
Lihat TESTING.md. Hasil dilaporkan deskriptif (n = 2).

## Definisi Selesai (Definition of Done) tiap fitur
- Kriteria penerimaan di FEATURES.md terpenuhi
- `npm run lint` dan `npm run build` lulus
- Diuji di lebar layar 360 px
- Data yang diminta tercatat di Supabase
- Tidak ada data identitas dalam kode atau repositori

## Urutan Prioritas Bila Waktu Mepet
F1 → F2 → F3 → F5 → F4 → F9 → F6 → F7 → F8 → F10 (terakhir, opsional).
