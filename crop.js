// ===========================
// crop.js
// Handles cropping functionality with draggable corners
// ===========================

let cropping = false;
let cropRect = { x: 50, y: 50, width: 200, height: 200 };
let draggingCorner = null;

// Corner detection radius
const cornerSize = 12;

// Start cropping
function startCrop() {
  cropping = true;
  drawCanvas();
}

// Stop cropping
function stopCrop() {
  cropping = false;
  draggingCorner = null;
  drawCanvas();
}

// Draw crop rectangle overlay
function drawCropOverlay() {
  if (!cropping) return;

  ctx.save();
  ctx.strokeStyle = "rgba(0,255,0,0.8)";
  ctx.lineWidth = 2;
  ctx.setLineDash([6]);
  ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

  // Draw draggable corners
  ctx.fillStyle = "rgba(0,255,0,0.8)";
  const corners = [
    { x: cropRect.x, y: cropRect.y }, // top-left
    { x: cropRect.x + cropRect.width, y: cropRect.y }, // top-right
    { x: cropRect.x, y: cropRect.y + cropRect.height }, // bottom-left
    { x: cropRect.x + cropRect.width, y: cropRect.y + cropRect.height } // bottom-right
  ];
  corners.forEach(c => {
    ctx.fillRect(c.x - cornerSize/2, c.y - cornerSize/2, cornerSize, cornerSize);
  });
  ctx.restore();
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  if (!cropping) return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Check corners for dragging
  const corners = [
    { x: cropRect.x, y: cropRect.y, name: "tl" },
    { x: cropRect.x + cropRect.width, y: cropRect.y, name: "tr" },
    { x: cropRect.x, y: cropRect.y + cropRect.height, name: "bl" },
    { x: cropRect.x + cropRect.width, y: cropRect.y + cropRect.height, name: "br" }
  ];

  for (const corner of corners) {
    if (
      mouseX >= corner.x - cornerSize &&
      mouseX <= corner.x + cornerSize &&
      mouseY >= corner.y - cornerSize &&
      mouseY <= corner.y + cornerSize
    ) {
      draggingCorner = corner.name;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!cropping || !draggingCorner) return;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  switch(draggingCorner) {
    case "tl":
      cropRect.width += cropRect.x - mouseX;
      cropRect.height += cropRect.y - mouseY;
      cropRect.x = mouseX;
      cropRect.y = mouseY;
      break;
    case "tr":
      cropRect.width = mouseX - cropRect.x;
      cropRect.height += cropRect.y - mouseY;
      cropRect.y = mouseY;
      break;
    case "bl":
      cropRect.width += cropRect.x - mouseX;
      cropRect.x = mouseX;
      cropRect.height = mouseY - cropRect.y;
      break;
    case "br":
      cropRect.width = mouseX - cropRect.x;
      cropRect.height = mouseY - cropRect.y;
      break;
  }
  drawCanvas();
  drawCropOverlay();
});

canvas.addEventListener("mouseup", () => {
  draggingCorner = null;
});

canvas.addEventListener("mouseleave", () => {
  draggingCorner = null;
});

// Apply crop
function applyCrop() {
  const imageData = ctx.getImageData(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
  canvas.width = cropRect.width;
  canvas.height = cropRect.height;
  ctx.putImageData(imageData, 0, 0);
  stopCrop();
        }
