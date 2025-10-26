# TikTok Video Downloader

## Overview
A frontend-only TikTok video downloader web application built with pure HTML, CSS, and JavaScript. The app uses a public API to fetch TikTok video data and provides download links to users in an elegant dark-mode interface.

**Current State:** Fully functional and deployed on Replit

**Last Updated:** October 26, 2025

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
- **API:** https://www.dongtube.my.id/api/d/tiktok (public endpoint)
- **Server:** Python HTTP server (port 5000)
- **Fonts:** Google Fonts (Poppins)

### Key Features
1. **Dark Mode UI:** Gradient background (#0d0d0d → #1a1a1a) with yellow (#ffcc00) accents
2. **Responsive Design:** Mobile-first approach, works on all screen sizes
3. **State Management:** Loading, success, and error states
4. **Accessibility:** Keyboard navigation, ARIA labels, semantic HTML
5. **Animations:** Smooth transitions and fade-in effects
6. **Security:** XSS protection via HTML escaping

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
- Mobile: < 600px
- Small Mobile: < 400px

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
