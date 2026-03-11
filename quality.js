// ===========================
// quality.js
// High-resolution export (1440p or custom)
// ===========================

function exportHighQuality(resolution = "1440p", format = "png", quality = 1.0) {
  let width = canvas.width;
  let height = canvas.height;

  if (resolution === "1440p") {
    width = 2560;
    height = 1440;
  } else if (typeof resolution === "object") {
    width = resolution.width;
    height = resolution.height;
  }

  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempCtx = tempCanvas.getContext("2d");

  // Draw current canvas content on temp canvas
  tempCtx.drawImage(canvas, 0, 0, width, height);

  let mimeType = "image/png";
  if (format === "jpg") mimeType = "image/jpeg";
  if (format === "webp") mimeType = "image/webp";

  const dataURL = tempCanvas.toDataURL(mimeType, quality);

  // Create download link
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `aesthetic-studio-${resolution}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Example usage:
// exportHighQuality("1440p", "png");
// exportHighQuality({width: 1920, height: 1080}, "jpg", 0.9);
