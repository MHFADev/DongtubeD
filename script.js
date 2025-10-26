// ============================
// THREE.JS 3D BACKGROUND ANIMATION
// ============================

let scene, camera, renderer, particles;

function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  
  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Create floating 3D objects
  particles = [];
  const geometries = [
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.TetrahedronGeometry(1.5),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TorusGeometry(1, 0.4, 8, 16)
  ];
  
  const material = new THREE.MeshBasicMaterial({
    color: 0xffcc00,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  // Create 20 random floating objects
  for (let i = 0; i < 20; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geometry, material);
    
    // Random position
    mesh.position.x = (Math.random() - 0.5) * 100;
    mesh.position.y = (Math.random() - 0.5) * 100;
    mesh.position.z = (Math.random() - 0.5) * 100;
    
    // Random rotation speed
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    
    // Random velocity
    mesh.userData.velocity = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    };
    
    mesh.userData.rotationSpeed = {
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02
    };
    
    scene.add(mesh);
    particles.push(mesh);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Start animation
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animate each particle
  particles.forEach(particle => {
    // Move particle
    particle.position.x += particle.userData.velocity.x;
    particle.position.y += particle.userData.velocity.y;
    particle.position.z += particle.userData.velocity.z;
    
    // Rotate particle
    particle.rotation.x += particle.userData.rotationSpeed.x;
    particle.rotation.y += particle.userData.rotationSpeed.y;
    particle.rotation.z += particle.userData.rotationSpeed.z;
    
    // Bounce particles at boundaries
    if (Math.abs(particle.position.x) > 50) particle.userData.velocity.x *= -1;
    if (Math.abs(particle.position.y) > 50) particle.userData.velocity.y *= -1;
    if (Math.abs(particle.position.z) > 50) particle.userData.velocity.z *= -1;
  });
  
  // Slowly rotate camera
  camera.position.x = Math.sin(Date.now() * 0.0001) * 5;
  camera.position.y = Math.cos(Date.now() * 0.0001) * 5;
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

// Initialize Three.js when page loads
window.addEventListener('load', () => {
  if (typeof THREE !== 'undefined') {
    try {
      initThreeJS();
    } catch (error) {
      console.log('WebGL not supported, using CSS fallback');
      // Fallback: Add CSS animation if WebGL fails
      document.getElementById('bg-canvas').style.display = 'none';
      addCSSFallback();
    }
  }
});

// CSS Fallback Animation
function addCSSFallback() {
  const style = document.createElement('style');
  style.textContent = `
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 20% 50%, rgba(255, 204, 0, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(255, 204, 0, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 40% 20%, rgba(255, 204, 0, 0.06) 0%, transparent 50%);
      animation: bgPulse 15s ease-in-out infinite;
      z-index: 0;
      pointer-events: none;
    }
    @keyframes bgPulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ============================
// TIKTOK DOWNLOADER LOGIC
// ============================

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

// Focus input on load
setTimeout(() => urlInput.focus(), 100);
