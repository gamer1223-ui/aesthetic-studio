// ===========================
// crop.js
// Crop functionality with draggable rectangle
// ===========================

let isCropping = false;
let cropStartX = 0;
let cropStartY = 0;
let cropWidth = 0;
let cropHeight = 0;
let draggingCorner = false;
let cornerSize = 10;
let activeCorner = null;

// Start crop mode
function startCrop() {
  isCropping = true;
}

// Stop crop mode
function stopCrop() {
  isCropping = false;
  cropWidth = 0;
  cropHeight = 0;
  drawCanvas();
}

// Draw crop rectangle
function drawCropRect() {
  if (!isCropping) return;

  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.setLineDash([6]);
  ctx.strokeRect(cropStartX, cropStartY, cropWidth, cropHeight);

  // Draw corners
  const corners = getCorners();
  ctx.fillStyle = "white";
  corners.forEach(c => ctx.fillRect(c.x - cornerSize/2, c.y - cornerSize/2, cornerSize, cornerSize));
  ctx.restore();
}

// Get rectangle corners
function getCorners() {
  return [
    {x: cropStartX, y: cropStartY}, // top-left
    {x: cropStartX + cropWidth, y: cropStartY}, // top-right
    {x: cropStartX, y: cropStartY + cropHeight}, // bottom-left
    {x: cropStartX + cropWidth, y: cropStartY + cropHeight} // bottom-right
  ];
}

// Mouse events for crop
canvas.addEventListener("mousedown", (e) => {
  if (!isCropping) return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Check if user clicked on a corner
  const corners = getCorners();
  for (let i=0; i<corners.length; i++) {
    const c = corners[i];
    if (mouseX >= c.x - cornerSize && mouseX <= c.x + cornerSize &&
        mouseY >= c.y - cornerSize && mouseY <= c.y + cornerSize) {
      draggingCorner = true;
      activeCorner = i;
      return;
    }
  }

  // Otherwise start new crop rectangle
  cropStartX = mouseX;
  cropStartY = mouseY;
  cropWidth = 0;
  cropHeight = 0;
  draggingCorner = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isCropping) return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  if (draggingCorner && activeCorner !== null) {
    // Adjust rectangle based on active corner
    switch(activeCorner) {
      case 0: // top-left
        cropWidth += cropStartX - mouseX;
        cropHeight += cropStartY - mouseY;
        cropStartX = mouseX;
        cropStartY = mouseY;
        break;
      case 1: // top-right
        cropWidth = mouseX - cropStartX;
        cropHeight += cropStartY - mouseY;
        cropStartY = mouseY;
        break;
      case 2: // bottom-left
        cropWidth += cropStartX - mouseX;
        cropStartX = mouseX;
        cropHeight = mouseY - cropStartY;
        break;
      case 3: // bottom-right
        cropWidth = mouseX - cropStartX;
        cropHeight = mouseY - cropStartY;
        break;
    }
    drawCanvas();
    drawCropRect();
  } else if (cropWidth === 0 && cropHeight === 0) {
    cropWidth = mouseX - cropStartX;
    cropHeight = mouseY - cropStartY;
    drawCanvas();
    drawCropRect();
  }
});

canvas.addEventListener("mouseup", () => {
  draggingCorner = false;
  activeCorner = null;
});

// Apply crop
function applyCrop() {
  if (cropWidth === 0 || cropHeight === 0) return;

  const imageData = ctx.getImageData(cropStartX, cropStartY, cropWidth, cropHeight);
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  ctx.putImageData(imageData, 0, 0);

  // Reset crop
  cropWidth = 0;
  cropHeight = 0;
  isCropping = false;
  drawCanvas();
}
