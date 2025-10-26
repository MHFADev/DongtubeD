# Dongtube Downloader

## Overview
A frontend-only TikTok video downloader web application with professional dark-mode UI featuring 3D animated background. Built with pure HTML, CSS, and JavaScript, using Dongtube API for video fetching.

**Current State:** Fully functional and deployed on Replit

**Last Updated:** October 26, 2025

## Recent Changes

### October 26, 2025
1. **Logo Enhancement:**
   - Increased logo size from 80px to 120px for better visibility
   - Added gradient border (yellow-gold) for premium look
   - Implemented multi-layer glow effects and shadow depth
   - Enhanced floating animation with subtle rotation
   - Made fully responsive with breakpoints for tablet (100px), mobile (90px), and small mobile (80px)
   - Added hover blur glow effect behind logo

2. **Download Functionality:**
   - Simplified download method to use direct window.open() for reliability
   - Added popup blocker detection and error handling
   - Maintained smooth progress bar animation and UI feedback
   - Video opens in new tab and browser handles download automatically

## Project Architecture

### File Structure
```
/
├── index.html       # Main HTML structure
├── style.css        # All styling (dark theme with yellow accents)
├── script.js        # Client-side logic and API integration
└── replit.md        # This documentation file
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
   
2. **Responsive Design:** 
   - Mobile-first approach
   - Breakpoints for tablet (768px), mobile (600px), small mobile (400px)
   - Logo scales proportionally on all devices
   
3. **Download Experience:**
   - Direct download via window.open in new tab
   - Real-time progress animation
   - Popup blocker detection
   - Clear success/error feedback
   
4. **Animations:** 
   - Logo floating animation with rotation
   - Card entry animations
   - Smooth transitions and hover effects
   - Progress bar with gradient fill
   
5. **Security:** 
   - XSS protection via HTML escaping
   - Popup blocker handling
   - URL validation

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

## Future Enhancements (Out of Scope)

- Backend proxy to handle CORS and rate limiting
- Video preview player
- Download history
- Multiple quality options
- Batch download support
- QR code scanner for mobile

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
