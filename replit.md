# Dongtube Downloader

## Overview
A frontend-only TikTok video downloader web application with professional dark-mode UI featuring 3D animated background. Built with pure HTML, CSS, and JavaScript, using Dongtube API for video fetching.

**Current State:** Fully functional and deployed on Replit

**Last Updated:** October 26, 2025

## Recent Changes

### October 26, 2025 - Major Feature Update
1. **Advanced Download System:**
   - Download using anchor tag with download attribute
   - Custom filename using video title (sanitized for filesystem)
   - Real-time progress animation and user feedback
   - Automatic file download (browser-dependent for cross-origin)
   - Graceful fallback to new tab if automatic download not supported
   - Note: Custom filenames for cross-origin downloads depend on server CORS headers

2. **Download History System:**
   - LocalStorage-based download history tracking
   - Displays last 50 downloads with timestamps
   - Redownload capability from history
   - Clear history functionality
   - Relative time display (e.g., "2 hours ago")
   - Smooth animations and hover effects

3. **Video Preview Player:**
   - Full-screen modal video preview
   - HTML5 video player with controls
   - Auto-play on preview open
   - Responsive design for all devices
   - Quality switching support in preview mode

4. **Quality Selection:**
   - HD/SD quality options (when available from API)
   - Toggle between qualities before download
   - Active quality indicator
   - Quality persists in preview mode
   - Smooth quality switching

5. **Notification System:**
   - Modern toast notifications
   - Success/Error notification types
   - Auto-dismiss after 5 seconds
   - Manual close option
   - Slide-in animation from right
   - Multiple notification support

6. **Statistics Dashboard:**
   - Download counter badge
   - Persistent statistics
   - Real-time updates
   - Clean, modern design

7. **Share & Copy Features:**
   - Native share API integration
   - Clipboard copy functionality
   - Fallback for unsupported browsers
   - Success notifications

8. **Enhanced UI/UX:**
   - Statistics bar at top of page
   - Quality selector with toggle buttons
   - Action buttons (Preview, Share, Copy)
   - Improved responsive design
   - Enhanced mobile experience
   - More video stats (comments, shares)

## Project Architecture

### File Structure
```
/
├── index.html       # Main HTML structure
├── style.css        # All styling (dark theme with yellow accents)
├── script.js        # Client-side logic and API integration
├── logo.jpg         # Application logo (120px)
├── screenshot.png   # Website screenshot for README (16:9)
├── README.md        # GitHub documentation (public-facing)
└── replit.md        # Technical documentation (this file)
```

### Technology Stack
- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics:** Three.js for animated background (with CSS fallback)
- **API:** https://www.dongtube.my.id/api/d/tiktok (public endpoint)
- **Server:** Python HTTP server (port 5000)
- **Fonts:** Google Fonts (Poppins)

### Key Features
1. **Professional UI:** 
   - Dark mode with gradient border cards
   - 120px professional logo with gradient border and glow effects
   - 3D animated background using Three.js (geometric wireframe shapes)
   - CSS fallback for browsers without WebGL support
   - Statistics dashboard at top
   - Modern notification system
   
2. **Responsive Design:** 
   - Mobile-first approach
   - Breakpoints for tablet (768px), mobile (600px), small mobile (400px)
   - Logo scales proportionally on all devices
   - Adaptive layouts for history and quality selector
   
3. **Download Experience:**
   - Automatic download with custom filename
   - Real-time progress tracking with percentage
   - Quality selection (HD/SD)
   - Download history with redownload option
   - Success/Error notifications
   - Filename sanitization for compatibility
   
4. **Video Preview:**
   - Full-screen modal player
   - HTML5 video controls
   - Auto-play functionality
   - Quality switching in preview
   - Close on overlay click
   
5. **Animations:** 
   - Logo floating animation with rotation
   - Card entry animations
   - Smooth transitions and hover effects
   - Progress bar with gradient fill
   - Notification slide-in animations
   - History item hover effects
   
6. **Data Persistence:**
   - LocalStorage for download history
   - Statistics tracking
   - Quality preference
   - Up to 50 download records
   
7. **Share & Social:**
   - Native share API support
   - Clipboard copy functionality
   - Share button with fallback
   - Copy link feature
   
8. **Security:** 
   - XSS protection via HTML escaping
   - Filename sanitization
   - URL validation
   - Safe blob handling

## API Integration

### Endpoint
```
GET https://www.dongtube.my.id/api/d/tiktok?url={TIKTOK_URL}
```

### Response Structure
The API returns JSON with video metadata including:
- Video download URL
- Thumbnail/cover image
- Title/description
- Author username
- Play count and like count

### Error Handling
- CORS restrictions (documented in code)
- Network errors
- Invalid URLs
- API failures or rate limiting

## Design Specifications

### Color Palette
- **Background:** #0d0d0d to #1a1a1a (gradient)
- **Primary Accent:** #ffcc00 (yellow)
- **Text:** #e0e0e0 (light gray)
- **Error:** #ff6b6b (red)
- **Borders:** #333 (dark gray)

### Typography
- **Font Family:** Poppins (Google Fonts)
- **Headings:** 2.5rem (700 weight)
- **Body:** 0.95-1rem (400 weight)

### Responsive Breakpoints
- Tablet: ≤ 768px (logo 100px, title 2rem)
- Mobile: ≤ 600px (logo 90px, title 1.8rem)
- Small Mobile: ≤ 400px (logo 80px, title 1.6rem)

## Known Limitations

1. **CORS Restrictions:** May be blocked by browsers if the API doesn't support cross-origin requests
2. **Rate Limiting:** Public API may have usage limits or downtime
3. **Client-Side Only:** API endpoint is exposed on client-side
4. **No Backend:** Cannot implement server-side rate limiting or caching

## Deployment

### Replit Setup
The app is configured to run on Replit with a Python HTTP server:
- **Port:** 5000
- **Command:** `python3 -m http.server 5000`
- **Access:** Available via Replit's webview

### Local Deployment
Simply open `index.html` in any modern web browser. No build process required.

## User Flow

1. User visits the page
2. Enters TikTok video URL in input field
3. Clicks "Download" button (or presses Enter)
4. Loading indicator appears
5. API fetches video data
6. Result card displays with:
   - Video thumbnail
   - Title and author
   - View/like statistics
   - Download button
7. User clicks download to save video

## Security Considerations

- HTML escaping prevents XSS attacks
- No sensitive data storage
- No authentication required
- Public API endpoint (no keys needed)

## Implemented Features (Previously Out of Scope)

✅ **Video preview player** - Full-screen modal with HTML5 player
✅ **Download history** - LocalStorage-based with redownload capability
✅ **Multiple quality options** - HD/SD selection when available
✅ **Notification system** - Modern toast notifications
✅ **Statistics tracking** - Download counter and history

## Future Enhancements

- Backend proxy to handle CORS and rate limiting
- Batch download support (multiple videos)
- QR code scanner for mobile
- Video editing/trimming before download
- Playlist download support
- Custom download folder selection

## Browser Compatibility

Tested and compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Credits

- **API Provider:** dongtube.my.id
- **Font:** Poppins by Google Fonts
- **Development:** Replit Agent (2025)
