/**
 * TikTok Video Downloader - Frontend Only
 * API: dongtube.my.id
 */

// DOM Elements
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultSection = document.getElementById('resultSection');
const resultContent = document.getElementById('resultContent');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');
const tryAgainBtn = document.getElementById('tryAgainBtn');

// Event Listeners
downloadBtn.addEventListener('click', handleDownload);
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleDownload();
});
tryAgainBtn.addEventListener('click', resetForm);

// Main Download Handler
async function handleDownload() {
  const url = urlInput.value.trim();

  if (!url) {
    showError('Masukkan URL TikTok terlebih dahulu');
    return;
  }

  if (!isValidTikTokUrl(url)) {
    showError('URL tidak valid. Gunakan link dari TikTok');
    return;
  }

  showLoading();

  try {
    const videoData = await fetchTikTokVideo(url);
    displayResult(videoData);
  } catch (error) {
    console.error('Error:', error);
    showError('Video tidak dapat diunduh. Coba link lain');
  }
}

// Fetch Video from API
async function fetchTikTokVideo(url) {
  const apiEndpoint = 'https://www.dongtube.my.id/api/d/tiktok';
  const fullUrl = `${apiEndpoint}?url=${encodeURIComponent(url)}`;

  const response = await fetch(fullUrl);
  const data = await response.json();

  if (!data.success || !data.data) {
    throw new Error('Invalid response');
  }

  return data.data;
}

// Auto Download Video File
async function autoDownloadVideo(videoUrl, filename) {
  try {
    // Create temporary link and trigger download
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = filename || 'tiktok-video.mp4';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: open in new tab
    window.open(videoUrl, '_blank');
  }
}

// URL Validation
function isValidTikTokUrl(url) {
  return /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i.test(url);
}

// UI State: Loading
function showLoading() {
  downloadBtn.disabled = true;
  urlInput.disabled = true;
  loadingIndicator.classList.remove('hidden');
  resultSection.classList.add('hidden');
  errorSection.classList.add('hidden');
}

// UI State: Display Result
function displayResult(data) {
  loadingIndicator.classList.add('hidden');
  errorSection.classList.add('hidden');

  const title = data.title || 'TikTok Video';
  const author = data.author?.nickname || data.author?.unique_id || 'Unknown';
  const thumbnail = data.cover || data.origin_cover || '';
  const downloadUrl = data.play || data.wmplay || '';
  const playCount = data.play_count || 0;
  const likeCount = data.digg_count || 0;

  if (!downloadUrl) {
    showError('Video tidak tersedia untuk diunduh');
    return;
  }

  // Generate filename
  const filename = `tiktok-${author}-${Date.now()}.mp4`;

  let html = '';

  // Thumbnail
  if (thumbnail) {
    html += `<img src="${escapeHtml(thumbnail)}" alt="Thumbnail" class="video-thumbnail" loading="lazy" />`;
  }

  // Video Info
  html += `
    <div class="video-info">
      <h2 class="video-title">${escapeHtml(title)}</h2>
      <p class="video-author">@${escapeHtml(author)}</p>
  `;

  // Stats
  if (playCount || likeCount) {
    html += `<div class="video-stats">`;
    if (playCount) html += `<span>👁️ ${formatNumber(playCount)}</span>`;
    if (likeCount) html += `<span>❤️ ${formatNumber(likeCount)}</span>`;
    html += `</div>`;
  }

  html += `</div>`;

  // Download Button
  html += `
    <button class="download-link-btn" id="autoDownloadBtn">
      📥 Download Video
    </button>
  `;

  resultContent.innerHTML = html;
  resultSection.classList.remove('hidden');

  // Add click event for auto download
  const autoDownloadButton = document.getElementById('autoDownloadBtn');
  autoDownloadButton.addEventListener('click', () => {
    autoDownloadButton.textContent = '⏳ Mengunduh...';
    autoDownloadButton.disabled = true;
    
    autoDownloadVideo(downloadUrl, filename);
    
    setTimeout(() => {
      autoDownloadButton.textContent = '✅ Download Dimulai!';
      setTimeout(() => {
        autoDownloadButton.textContent = '📥 Download Lagi';
        autoDownloadButton.disabled = false;
      }, 2000);
    }, 500);
  });

  downloadBtn.disabled = false;
  urlInput.disabled = false;
}

// UI State: Show Error
function showError(message) {
  loadingIndicator.classList.add('hidden');
  resultSection.classList.add('hidden');
  errorMessage.textContent = message;
  errorSection.classList.remove('hidden');
  
  downloadBtn.disabled = false;
  urlInput.disabled = false;
}

// Reset Form
function resetForm() {
  urlInput.value = '';
  urlInput.disabled = false;
  downloadBtn.disabled = false;
  loadingIndicator.classList.add('hidden');
  resultSection.classList.add('hidden');
  errorSection.classList.add('hidden');
  urlInput.focus();
}

// Utility: Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Utility: Format Numbers
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

// Init
window.addEventListener('load', () => {
  urlInput.focus();
});
