// ===========================
// brush.js
// Brush drawing and eraser functionality
// ===========================

let drawing = false;
let brushColor = "#ff0000";
let brushSize = 5;
let eraserMode = false;

// Start drawing
function startBrush(color = "#ff0000", size = 5) {
  brushColor = color;
  brushSize = size;
  drawing = true;
}

// Stop drawing
function stopBrush() {
  drawing = false;
}

// Toggle eraser
function toggleEraser() {
  eraserMode = !eraserMode;
}

// Mouse events for brush
canvas.addEventListener("mousedown", (e) => {
  if (!drawing) return;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.strokeStyle = eraserMode ? "#ffffff" : brushColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  if (!drawing) return;
  ctx.closePath();
});

canvas.addEventListener("mouseleave", () => {
  if (!drawing) return;
  ctx.closePath();
});
