// ===========================
// export-advanced.js
// Advanced export options for canvas
// ===========================

function exportCanvas(format = "png", quality = 1.0, width = canvas.width, height = canvas.height) {
  // Create temporary canvas for resizing
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = width;
  exportCanvas.height = height;
  const exportCtx = exportCanvas.getContext("2d");

  // Draw existing canvas content onto export canvas
  exportCtx.drawImage(canvas, 0, 0, width, height);

  let mimeType = "image/png";
  if (format === "jpg") mimeType = "image/jpeg";
  if (format === "webp") mimeType = "image/webp";

  const dataURL = exportCanvas.toDataURL(mimeType, quality);

  // Create download link
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `aesthetic-studio-export.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Example usage:
// exportCanvas("png"); // default
// exportCanvas("jpg", 0.8, 1920, 1080); // JPG with compression and custom resolution
