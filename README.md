# 🎬 Dongtube Downloader

<div align="center">

**TikTok Video Downloader dengan UI Modern dan 3D Background**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://replit.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)](https://threejs.org/)

</div>

---

## 📋 Deskripsi

**Dongtube Downloader** adalah aplikasi web modern untuk mengunduh video TikTok dengan mudah. Aplikasi ini menggunakan **pure HTML, CSS, dan JavaScript** tanpa framework, dilengkapi dengan 3D animated background menggunakan Three.js dan desain UI dark-mode yang profesional.

### ✨ Fitur Unggulan

- 🎯 **Download Otomatis** - Video langsung terunduh dengan nama file custom sesuai judul
- 📜 **Download History** - Menyimpan 50 riwayat download terakhir dengan timestamp
- ▶️ **Video Preview** - Preview video dalam modal full-screen sebelum download
- 🎬 **Quality Selection** - Pilih kualitas HD atau SD (jika tersedia)
- 🔔 **Toast Notifications** - Notifikasi modern untuk feedback download
- 📊 **Statistics Dashboard** - Counter total downloads dengan persistent storage
- 🔗 **Share & Copy** - Share video atau copy link dengan Web Share API
- 🎨 **3D Background** - Animated geometric shapes dengan Three.js (+ CSS fallback)
- 📱 **Fully Responsive** - Optimal di desktop, tablet, dan mobile
- 🌙 **Dark Theme** - Desain modern dengan aksen yellow-gold

---

## 🚀 Demo

![Dongtube Downloader Preview](https://via.placeholder.com/800x450/0a0a0a/ffcc00?text=Dongtube+Downloader)

**Live Demo:** [Klik di sini untuk mencoba](https://your-replit-url.repl.co)

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur semantic dan modern
- **CSS3** - Styling dengan flexbox, grid, animations, dan transitions
- **JavaScript (ES6+)** - Logic aplikasi tanpa framework
- **Three.js** - 3D animated background dengan geometric shapes

### API
- **Dongtube API** - Public endpoint untuk fetching video TikTok
  - Endpoint: `https://www.dongtube.my.id/api/d/tiktok`

### Storage
- **LocalStorage** - Menyimpan download history dan statistics

### Server (Development)
- **Python HTTP Server** - Simple server untuk development di port 5000

### Font
- **Google Fonts (Poppins)** - Typography modern dan clean

---

## 📦 Instalasi

### Method 1: Langsung di Browser (Recommended)

1. Clone repository ini:
```bash
git clone https://github.com/username/dongtube-downloader.git
cd dongtube-downloader
```

2. Buka `index.html` langsung di browser modern (Chrome, Firefox, Safari, Edge)

### Method 2: Dengan Local Server

1. Clone repository:
```bash
git clone https://github.com/username/dongtube-downloader.git
cd dongtube-downloader
```

2. Jalankan local server (pilih salah satu):

**Python 3:**
```bash
python3 -m http.server 5000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 5000
```

**Node.js:**
```bash
npx http-server -p 5000
```

3. Buka browser dan akses: `http://localhost:5000`

### Method 3: Deploy di Replit

1. Fork project ini di Replit
2. Run otomatis akan menjalankan server di port 5000
3. Akses melalui Replit webview

---

## 💻 Cara Penggunaan

1. **Paste URL TikTok**
   - Copy link video TikTok yang ingin didownload
   - Paste di input field yang tersedia

2. **Klik Download**
   - Klik tombol "Download" atau tekan Enter
   - Tunggu beberapa saat hingga video info muncul

3. **Pilih Kualitas (Optional)**
   - Pilih HD atau SD jika tersedia
   - Default: HD

4. **Preview Video (Optional)**
   - Klik tombol "Preview" untuk melihat video sebelum download
   - Video akan diputar di modal full-screen

5. **Download Video**
   - Klik tombol "Download Video"
   - Video akan terunduh otomatis dengan nama file sesuai judul

6. **Fitur Tambahan**
   - **Share**: Bagikan video menggunakan Web Share API
   - **Copy Link**: Copy URL video ke clipboard
   - **History**: Lihat riwayat download dan download ulang
   - **Stats**: Lihat total downloads di statistics bar

---

## 🎨 Struktur File

```
dongtube-downloader/
├── index.html          # Struktur HTML utama
├── style.css           # Styling lengkap (dark theme + animations)
├── script.js           # Logic aplikasi & API integration
├── logo.jpg            # Logo aplikasi (120px)
├── replit.md           # Dokumentasi teknis & architecture
└── README.md           # Dokumentasi GitHub (file ini)
```

---

## 🔧 Fitur Detail

### 1. Download System
- Menggunakan anchor tag dengan download attribute
- Custom filename dari video title (disanitasi)
- Progress animation real-time
- Fallback ke new tab untuk browser yang tidak support
- Error handling yang comprehensive

### 2. Download History
- Menyimpan max 50 downloads di localStorage
- Format waktu relatif ("2 jam yang lalu")
- Redownload dari history dengan 1 klik
- Clear all history functionality
- Smooth animations & hover effects

### 3. Video Preview
- Modal full-screen dengan backdrop blur
- HTML5 video player dengan native controls
- Auto-play on open
- Quality switching dalam preview mode
- Close dengan klik overlay atau tombol close

### 4. Quality Selection
- Toggle antara HD dan SD
- Active state indicator yang jelas
- Persists di preview mode
- Hanya muncul jika API return multiple qualities

### 5. Notification System
- Toast notifications modern dari kanan
- Auto-dismiss setelah 5 detik
- Manual close option
- Support multiple notifications
- Success & error states

### 6. Statistics Dashboard
- Total downloads counter
- Persistent di localStorage
- Update real-time
- Badge design yang modern

### 7. Share & Copy Features
- Web Share API integration
- Clipboard API untuk copy link
- Graceful fallback untuk browser lama
- Success notifications

### 8. 3D Background
- Three.js animated geometric shapes
- Wireframe dodecahedron yang berputar
- CSS gradient fallback jika WebGL tidak support
- Performance optimized

---

## 🎯 Browser Compatibility

Tested dan kompatibel dengan:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | Latest  | ✅ Full Support |
| Firefox | Latest  | ✅ Full Support |
| Safari  | Latest  | ✅ Full Support |
| Edge    | Latest  | ✅ Full Support |
| Mobile Browsers | Latest | ✅ Full Support |

---

## ⚠️ Limitasi & Catatan

1. **CORS Restrictions**: Custom filename mungkin tidak bekerja untuk cross-origin downloads tergantung server CDN
2. **API Rate Limiting**: Public API mungkin memiliki limit penggunaan
3. **Client-Side Only**: Tidak ada backend, semua logic di client-side
4. **Browser Dependency**: Automatic download bergantung pada browser support untuk download attribute

---

## 🎨 Design Specifications

### Color Palette
- Background: `#0d0d0d` to `#1a1a1a` (gradient)
- Primary Accent: `#ffcc00` (yellow-gold)
- Text: `#e0e0e0` (light gray)
- Error: `#ff6b6b` (red)
- Borders: `#333` (dark gray)

### Typography
- Font Family: **Poppins** (Google Fonts)
- Headings: 2.5rem (700 weight)
- Body: 0.95-1rem (400 weight)

### Responsive Breakpoints
- Tablet: ≤ 768px
- Mobile: ≤ 600px
- Small Mobile: ≤ 400px

---

## 🔐 Security

- ✅ XSS protection via HTML escaping
- ✅ Filename sanitization
- ✅ URL validation
- ✅ Safe blob handling
- ✅ No sensitive data storage
- ✅ No authentication required

---

## 🚀 Future Enhancements

- [ ] Backend proxy untuk handle CORS
- [ ] Batch download support
- [ ] QR code scanner untuk mobile
- [ ] Video editing/trimming
- [ ] Playlist download support
- [ ] Custom download folder selection
- [ ] Dark/Light theme toggle

---

## 🤝 Contributing

Contributions are welcome! Silakan:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Credits

- **API Provider**: [dongtube.my.id](https://www.dongtube.my.id)
- **Font**: Poppins by [Google Fonts](https://fonts.google.com/specimen/Poppins)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Development**: Built with ❤️ using Replit Agent (2025)

---

## 📧 Contact

Jika ada pertanyaan atau saran, silakan buka issue di repository ini atau hubungi melalui:

- GitHub Issues: [Create Issue](https://github.com/username/dongtube-downloader/issues)
- Email: your-email@example.com

---

<div align="center">

**⭐ Star repository ini jika Anda merasa berguna! ⭐**

Made with ❤️ and ☕

</div>
