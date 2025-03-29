// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        // Add active class to clicked tab and button
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        // Stop camera when switching tabs
        if (tabId !== 'camera-tab') {
            stopCamera();
        }
    });
});
// QR Scanner - Camera
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const cameraMessage = document.getElementById('camera-message');
const scanResultText = document.getElementById('scan-result-text');
const copyBtn = document.getElementById('copy-btn');
let scanning = false;
let stream = null;
// Start camera and scanning
startBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            }
        });
        video.srcObject = stream;
        video.play();
        startBtn.classList.add('hidden');
        stopBtn.classList.remove('hidden');
        cameraMessage.classList.add('hidden');
        scanning = true;
        scanQRCode();
    } catch (err) {
        console.error("Camera error: ", err);
        cameraMessage.classList.remove('hidden');
    }
});
// Stop camera
stopBtn.addEventListener('click', stopCamera);

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    video.srcObject = null;
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    scanning = false;
}
// QR Code scanning function
function scanQRCode() {
    if (!scanning) return;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });
        if (code) {
            displayScanResult(code.data);
        }
    }
    requestAnimationFrame(scanQRCode);
}
// QR Scanner - Upload Image
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewImage = document.getElementById('preview-image');
const deleteBtn = document.getElementById('delete-btn');
uploadArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Show preview
            previewImage.src = event.target.result;
            previewContainer.style.display = 'block';
            uploadArea.style.display = 'none';
            // Process the image for QR code
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                if (code) {
                    displayScanResult(code.data);
                } else {
                    displayScanResult("No QR code found in the image.");
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});
// Delete button to remove the preview
deleteBtn.addEventListener('click', () => {
    fileInput.value = '';
    previewContainer.style.display = 'none';
    uploadArea.style.display = 'block';
    scanResultText.textContent = 'No QR code scanned yet.';
    copyBtn.classList.add('hidden');
});
// Display scan result
function displayScanResult(result) {
    scanResultText.textContent = result;
    copyBtn.classList.remove('hidden');
}
// Copy result to clipboard
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(scanResultText.textContent).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});
// QR Generator
const qrText = document.getElementById('qr-text');
const qrCode = document.getElementById('qr-code');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
generateBtn.addEventListener('click', () => {
    const text = qrText.value.trim();
    if (text) {
        QRCode.toDataURL(text, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, (err, url) => {
            if (err) {
                console.error(err);
                return;
            }
            qrCode.innerHTML = `<img src="${url}" alt="QR Code" style="width:100%;">`;
            downloadBtn.classList.remove('hidden');
            downloadBtn.setAttribute('data-url', url);
        });
    } else {
        alert('Please enter some text or URL to generate QR code.');
    }
});
// Download QR Code
downloadBtn.addEventListener('click', () => {
    const url = downloadBtn.getAttribute('data-url');
    if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
// Drag and drop for upload
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary)';
    uploadArea.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#adb5bd';
    uploadArea.style.backgroundColor = 'transparent';
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#adb5bd';
    uploadArea.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
        fileInput.files = e.dataTransfer.files;
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }
});