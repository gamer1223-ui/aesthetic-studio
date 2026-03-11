// ===========================
// stickers.js
// Sticker management: add, drag, resize, rotate, animated
// ===========================

let stickersOnCanvas = [];
let selectedSticker = null;
let draggingSticker = false;
let offsetX = 0;
let offsetY = 0;
let resizingSticker = false;
let rotationSticker = false;

// Add sticker to canvas
function addSticker(imgSrc, width = 100, height = 100) {
  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    const sticker = { img, x: 50, y: 50, width, height, rotation: 0 };
    stickersOnCanvas.push(sticker);
    drawCanvas();
  };
}

// Draw stickers on canvas
function drawStickers() {
  stickersOnCanvas.forEach(sticker => {
    ctx.save();
    ctx.translate(sticker.x + sticker.width / 2, sticker.y + sticker.height / 2);
    ctx.rotate((sticker.rotation * Math.PI) / 180);
    ctx.drawImage(sticker.img, -sticker.width / 2, -sticker.height / 2, sticker.width, sticker.height);
    ctx.restore();
  });
}

// Mouse events for dragging stickers
canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  for (let i = stickersOnCanvas.length - 1; i >= 0; i--) {
    const s = stickersOnCanvas[i];
    if (
      mouseX >= s.x && mouseX <= s.x + s.width &&
      mouseY >= s.y && mouseY <= s.y + s.height
    ) {
      selectedSticker = s;
      draggingSticker = true;
      offsetX = mouseX - s.x;
      offsetY = mouseY - s.y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!draggingSticker || !selectedSticker) return;

  selectedSticker.x = e.offsetX - offsetX;
  selectedSticker.y = e.offsetY - offsetY;

  drawCanvas();
});

canvas.addEventListener("mouseup", () => {
  draggingSticker = false;
  selectedSticker = null;
});

canvas.addEventListener("mouseleave", () => {
  draggingSticker = false;
  selectedSticker = null;
});

// Optional: function to remove a sticker
function removeSticker(sticker) {
  stickersOnCanvas = stickersOnCanvas.filter(s => s !== sticker);
  drawCanvas();
}
