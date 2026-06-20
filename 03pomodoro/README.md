# Pomodoro Focus

A modern Pomodoro timer built with React + Vite. This project helps you focus using customizable study and work sessions, with automatic switching between focus and break periods, dark mode, daily statistics, browser notifications, and keyboard shortcuts.

## Fitur Utama

- Focus timer dengan durasi yang dapat dikustomisasi
- Break timer dengan durasi yang dapat dikustomisasi
- Session cycle yang otomatis melanjutkan sesi berikutnya
- Statistik harian disimpan di Local Storage
- Dark mode / Light mode
- Progress bar dan circular progress SVG
- Alarm suara ketika sesi selesai
- Browser Notification API untuk peringatan sesi
- Auto switch antara Focus dan Break
- Keyboard shortcut:
  - `Space` = Start / Pause / Resume
  - `R` = Reset
  - `S` = Start

## Struktur Folder

```
pomodoro/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── style.css
    ├── components/
    │   ├── Controls.jsx
    │   ├── ProgressBar.jsx
    │   ├── Settings.jsx
    │   ├── Statistics.jsx
    │   ├── ThemeToggle.jsx
    │   └── Timer.jsx
    ├── hooks/
    │   └── usePomodoro.js
    └── utils/
        ├── notifications.js
        ├── storage.js
        └── time.js
```

## Instalasi

Buka terminal pada folder proyek `pomodoro` lalu jalankan:

```bash
npm install
```

## Menjalankan di Development

```bash
npm run dev
```

Lalu buka URL yang ditampilkan oleh Vite.

## Build untuk Produksi

```bash
npm run build
```

Build akan menghasilkan folder `dist` yang siap dideploy.

## Deploy ke Vercel

1. Pastikan kamu memiliki akun Vercel.
2. Hubungkan repository atau folder `pomodoro` ke Vercel.
3. Atur build command:

```bash
npm run build
```

4. Atur output directory:

```bash
dist
```

5. Deploy.

## Catatan

- Data pengaturan dan statistik siswa tersimpan di Local Storage browser.
- Browser notification meminta izin saat pertama kali digunakan.
- Audio alarm dapat dibatasi oleh kebijakan autoplay browser.

## Lisensi

This project is open source and can be used or modified freely.
