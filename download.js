// ===========================
// download.js
// Download the edited canvas image
// ===========================

function downloadImage(filename = "aesthetic-studio.png") {
  // Convert canvas to data URL
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Optional: button click event
const downloadBtn = document.getElementById("download-btn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    downloadImage();
  });
} 
