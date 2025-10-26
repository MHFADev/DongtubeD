/**
 * ============================
 * TIKTOK VIDEO DOWNLOADER
 * ============================
 * 
 * A frontend-only TikTok video downloader using a public API.
 * This script handles user input, API requests, and dynamic UI updates.
 * 
 * API Endpoint: https://www.dongtube.my.id/api/d/tiktok
 * 
 * LIMITATIONS:
 * - CORS: May be blocked by browsers if API doesn't allow cross-origin requests
 * - Rate limiting: Public API may have usage limits
 * - No backend: All logic runs on client-side, API endpoint is exposed
 * 
 * AUTHOR: Replit Agent
 * DATE: 2025
 */

// ============================
// DOM ELEMENT REFERENCES
// ============================

const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// ============================
// EVENT LISTENERS
// ============================

// Main download button click handler
downloadBtn.addEventListener('click', handleDownload);

// Allow Enter key to trigger download
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleDownload();
  }
});

// Try again button to reset the form
tryAgainBtn.addEventListener('click', resetForm);

// ============================
// MAIN DOWNLOAD HANDLER
// ============================

/**
 * Handles the download process when user clicks the download button
 * Validates input, calls API, and displays results
 */
async function handleDownload() {
  const url = urlInput.value.trim();

  // Validate URL input
  if (!url) {
    showError('Silakan masukkan URL TikTok terlebih dahulu.');
    return;
  }

  // Basic TikTok URL validation
  if (!isValidTikTokUrl(url)) {
    showError('URL tidak valid. Pastikan Anda memasukkan URL TikTok yang benar (misalnya: https://www.tiktok.com/@username/video/...)');
    return;
  }

  // Show loading state
  showLoading();

  try {
    // Call the TikTok API
    const videoData = await fetchTikTokVideo(url);
    
    // Display the result
    displayResult(videoData);
    
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
    showError(error.message || 'Terjadi kesalahan saat memproses video. Silakan coba lagi.');
  }
}

// ============================
// API FUNCTIONS
// ============================

/**
 * Fetches TikTok video data from the public API
 * @param {string} url - The TikTok video URL
 * @returns {Promise<Object>} - Video data object
 */
async function fetchTikTokVideo(url) {
  const apiEndpoint = 'https://www.dongtube.my.id/api/d/tiktok';
  const fullUrl = `${apiEndpoint}?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validate API response structure
    if (!data || data.status !== 'success') {
      throw new Error(data?.message || 'API mengembalikan respons yang tidak valid.');
    }

    return data;

  } catch (error) {
    // Handle different error types
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Tidak dapat terhubung ke API. Periksa koneksi internet Anda atau coba lagi nanti. (Mungkin ada masalah CORS atau API sedang down)');
    }
    throw error;
  }
}

// ============================
// VALIDATION FUNCTIONS
// ============================

/**
 * Validates if the provided URL is a valid TikTok URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidTikTokUrl(url) {
  // Basic regex pattern for TikTok URLs
  const tiktokPattern = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i;
  return tiktokPattern.test(url);
}

// ============================
// UI STATE MANAGEMENT
// ============================

/**
 * Shows loading indicator and hides other sections
 */
function showLoading() {
  downloadBtn.disabled = true;
  urlInput.disabled = true;
  loadingIndicator.classList.remove('hidden');
  resultSection.classList.add('hidden');
  errorSection.classList.add('hidden');
}

/**
 * Displays video result in a card format
 * @param {Object} data - Video data from API
 */
function displayResult(data) {
  // Hide loading and error sections
  loadingIndicator.classList.add('hidden');
  errorSection.classList.add('hidden');

  // Extract data from API response
  const result = data.result || data.data || {};
  const title = result.title || result.desc || 'TikTok Video';
  const author = result.author || result.username || 'Unknown';
  const thumbnail = result.cover || result.thumbnail || result.origin_cover || '';
  const downloadUrl = result.video || result.download || result.url || '';
  const playCount = result.play_count || result.play || '';
  const likeCount = result.digg_count || result.like || '';

  // Build the HTML content
  let htmlContent = '';

  // Add thumbnail if available
  if (thumbnail) {
    htmlContent += `
      <img src="${escapeHtml(thumbnail)}" alt="Video Thumbnail" class="video-thumbnail" loading="lazy" />
    `;
  }

  // Add video info
  htmlContent += `
    <div class="video-info">
      <h2 class="video-title">${escapeHtml(title)}</h2>
      <p class="video-author">@${escapeHtml(author)}</p>
  `;

  // Add stats if available
  if (playCount || likeCount) {
    htmlContent += `<div class="video-stats">`;
    if (playCount) htmlContent += `<span>👁️ ${formatNumber(playCount)} views</span>`;
    if (likeCount) htmlContent += `<span>❤️ ${formatNumber(likeCount)} likes</span>`;
    htmlContent += `</div>`;
  }

  htmlContent += `</div>`;

  // Add download button
  if (downloadUrl) {
    htmlContent += `
      <a href="${escapeHtml(downloadUrl)}" 
         class="download-link-btn" 
         download 
         target="_blank"
         rel="noopener noreferrer">
        📥 Download Video MP4
      </a>
    `;
  } else {
    // If no download URL, show error
    showError('Link download tidak ditemukan dalam respons API.');
    return;
  }

  // Inject content and show result section
  resultContent.innerHTML = htmlContent;
  resultSection.classList.remove('hidden');

  // Re-enable input elements
  downloadBtn.disabled = false;
  urlInput.disabled = false;
}

/**
 * Displays error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  loadingIndicator.classList.add('hidden');
  resultSection.classList.add('hidden');
  errorMessage.textContent = message;
  errorSection.classList.remove('hidden');
  
  // Re-enable input elements
  downloadBtn.disabled = false;
  urlInput.disabled = false;
}

/**
 * Resets the form to initial state
 */
function resetForm() {
  urlInput.value = '';
  urlInput.disabled = false;
  downloadBtn.disabled = false;
  loadingIndicator.classList.add('hidden');
  resultSection.classList.add('hidden');
  errorSection.classList.add('hidden');
  urlInput.focus();
}

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Escapes HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Formats large numbers with K/M suffixes
 * @param {number|string} num - Number to format
 * @returns {string} - Formatted number
 */
function formatNumber(num) {
  const number = parseInt(num);
  if (isNaN(number)) return num;
  
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  }
  return number.toString();
}

// ============================
// INITIALIZATION
// ============================

// Focus on input field when page loads
window.addEventListener('load', () => {
  urlInput.focus();
});

// Log app initialization
console.log('🚀 TikTok Video Downloader initialized');
console.log('ℹ️ This app uses a public API and may be subject to CORS restrictions or rate limiting');
