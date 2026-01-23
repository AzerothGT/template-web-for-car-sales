# Template Website Sales Mobil 🚗

Template website modern yang dirancang khusus untuk tenaga penjual mobil (sales marketing) untuk menampilkan katalog mobil, harga, promo, video review, dan profil sales secara profesional. ✨

Konten website dikelola dengan mudah menggunakan **TinaCMS**, memungkinkan Anda mengedit teks dan gambar langsung tanpa koding.

## ✨ Fitur Unggulan

-   **🏗 CMS Terintegrasi (TinaCMS)**: Kelola daftar mobil, harga promo, artikel blog, dan profil sales dengan mudah.
-   **⚡ Performa Tinggi**: Dibangun dengan [Next.js](https://nextjs.org) untuk kecepatan loading yang maksimal dan SEO yang baik.
-   **🎨 Desain Responsif & Modern**: Tampilan premium yang terlihat bagus di HP dan Desktop, dibangun dengan [Tailwind CSS](https://tailwindcss.com).
-   **📝 Mode Visual Editing**: Edit konten secara visual (seperti Canva/Wix) di halaman `/admin`.
-   **📱 Mobile Friendly**: Navigasi dan layout yang dioptimalkan untuk pengguna smartphone.

## 🛠️ Persyaratan Sistem

Sebelum memulai, pastikan komputer Anda sudah terinstall:

-   [Git](https://git-scm.com/downloads)
-   [Node.js](https://nodejs.org/) (Versi LTS terbaru)
-   [Pnpm](https://pnpm.io/) atau [Bun](https://bun.sh/) (Disarankan untuk manajemen paket yang lebih cepat)

## 🚀 Cara Menjalankan di Lokal (Local Development)

1.  **Install Dependensi**
    Jalankan perintah berikut di terminal:

    ```bash
    pnpm install
    # atau
    bun install
    ```

2.  **Jalankan Server Development**
    Mulai server lokal untuk melihat website:

    ```bash
    pnpm dev
    # atau
    bun dev
    ```

3.  **Akses Website**
    Buka link berikut di browser:

    -   **http://localhost:3000** : Halaman utama website.
    -   **http://localhost:3000/admin** : Masuk ke mode edit (CMS).
    -   **http://localhost:3000/exit-admin** : Keluar dari mode edit.

## 📦 Deployment (Online)

Template ini paling mudah di-online-kan menggunakan **Vercel** atau **Netlify**.

1.  Push kode ke GitHub/GitLab.
2.  Hubungkan repositori ke Vercel/Netlify.
3.  Konfigurasi Environment Variables (jika menggunakan Tina Cloud):
    -   `NEXT_PUBLIC_TINA_CLIENT_ID`
    -   `TINA_TOKEN`
    -   `NEXT_PUBLIC_TINA_BRANCH`

## 🤝 Bantuan & Dukungan

Jika Anda mengalami kendala atau ingin kustomisasi lebih lanjut, silakan hubungi pengembang atau buat issue di repositori ini.

---

*Dibuat dengan ❤️ untuk membantu Sales Mobil Indonesia berjualan lebih laris.*
