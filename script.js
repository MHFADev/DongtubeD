// DOM Elements
const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const error = document.getElementById('error');
const errorMsg = document.getElementById('errorMsg');
const retryBtn = document.getElementById('retryBtn');
const downloadVideoBtn = document.getElementById('downloadVideoBtn');
const downloadText = document.getElementById('downloadText');
const downloadProgress = document.getElementById('downloadProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Event Listeners
downloadBtn.addEventListener('click', handleDownload);
urlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleDownload();
});
retryBtn.addEventListener('click', reset);

// Main Handler
async function handleDownload() {
  const url = urlInput.value.trim();
  
  if (!url) {
    showError('Masukkan URL TikTok');
    return;
  }
  
  if (!/^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i.test(url)) {
    showError('URL tidak valid');
    return;
  }
  
  showLoading();
  
  try {
    const data = await fetchVideo(url);
    displayResult(data);
  } catch (err) {
    showError('Gagal mengunduh video');
  }
}

// Fetch Video
async function fetchVideo(url) {
  const res = await fetch(`https://www.dongtube.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  
  if (!data.success || !data.data) {
    throw new Error('Invalid response');
  }
  
  return data.data;
}

// Display Result
function displayResult(data) {
  hideAll();
  
  const thumbnail = document.getElementById('thumbnail');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const stats = document.getElementById('stats');
  
  thumbnail.src = data.cover || data.origin_cover || '';
  title.textContent = data.title || 'TikTok Video';
  author.textContent = '@' + (data.author?.nickname || data.author?.unique_id || 'Unknown');
  
  const views = data.play_count ? `👁️ ${formatNum(data.play_count)}` : '';
  const likes = data.digg_count ? `❤️ ${formatNum(data.digg_count)}` : '';
  stats.innerHTML = (views ? `<span>${views}</span>` : '') + (likes ? `<span>${likes}</span>` : '');
  
  const videoUrl = data.play || data.wmplay || '';
  
  if (!videoUrl) {
    showError('Video tidak tersedia');
    return;
  }
  
  result.classList.remove('hidden');
  downloadBtn.disabled = false;
  urlInput.disabled = false;
  
  // Download handler
  downloadVideoBtn.onclick = () => startDownload(videoUrl, data.author?.unique_id || 'video');
}

// Start Download with Progress
async function startDownload(url, username) {
  downloadVideoBtn.disabled = true;
  downloadText.textContent = '⏳ Memproses...';
  downloadProgress.classList.remove('hidden');
  
  // Simulate progress animation
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    progressFill.style.width = progress + '%';
  }, 200);
  
  try {
    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `tiktok-${username}-${Date.now()}.mp4`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Complete progress
    setTimeout(() => {
      clearInterval(interval);
      progressFill.style.width = '100%';
      progressText.textContent = 'Download dimulai!';
      downloadText.textContent = '✅ Berhasil';
      
      setTimeout(() => {
        downloadProgress.classList.add('hidden');
        downloadText.textContent = '📥 Download Lagi';
        downloadVideoBtn.disabled = false;
        progressFill.style.width = '0%';
        progressText.textContent = 'Downloading...';
      }, 2000);
    }, 1000);
    
  } catch (err) {
    clearInterval(interval);
    downloadProgress.classList.add('hidden');
    downloadText.textContent = '❌ Gagal';
    setTimeout(() => {
      downloadText.textContent = '📥 Download Video';
      downloadVideoBtn.disabled = false;
    }, 2000);
  }
}

// UI States
function showLoading() {
  hideAll();
  downloadBtn.disabled = true;
  urlInput.disabled = true;
  loading.classList.remove('hidden');
}

function showError(msg) {
  hideAll();
  errorMsg.textContent = msg;
  error.classList.remove('hidden');
  downloadBtn.disabled = false;
  urlInput.disabled = false;
}

function hideAll() {
  loading.classList.add('hidden');
  result.classList.add('hidden');
  error.classList.add('hidden');
  downloadProgress.classList.add('hidden');
}

function reset() {
  urlInput.value = '';
  hideAll();
  downloadBtn.disabled = false;
  urlInput.disabled = false;
  urlInput.focus();
}

// Format Numbers
function formatNum(num) {
  const n = parseInt(num);
  if (isNaN(n)) return num;
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

// Init
window.addEventListener('load', () => urlInput.focus());
