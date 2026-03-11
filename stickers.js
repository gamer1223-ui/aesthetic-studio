// ===========================
// stickers.js
// Sticker selection, drag & drop, resizing, rotation
// ===========================

// Global array to store added stickers
let stickersOnCanvas = [];

// Canvas & context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Selected sticker for dragging
let selectedSticker = null;
let offsetX = 0;
let offsetY = 0;

// Load stickers from sticker library (HTML example: <img class="sticker-thumb">)
const stickerThumbs = document.querySelectorAll(".sticker-thumb");
stickerThumbs.forEach(img => {
  img.addEventListener("click", () => {
    const sticker = {
      img: img.cloneNode(true),
      x: canvas.width/2 - img.width/2,
      y: canvas.height/2 - img.height/2,
      width: img.width,
      height: img.height,
      rotation: 0
    };
    stickersOnCanvas.push(sticker);
    drawCanvas();
  });
});

// Draw all stickers on canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw each sticker
  stickersOnCanvas.forEach(sticker => {
    ctx.save();
    ctx.translate(sticker.x + sticker.width/2, sticker.y + sticker.height/2);
    ctx.rotate(sticker.rotation * Math.PI / 180);
    ctx.drawImage(sticker.img, -sticker.width/2, -sticker.height/2, sticker.width, sticker.height);
    ctx.restore();
  });
}

// Mouse events for drag & drop
canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  // Check if clicking on any sticker
  for (let i = stickersOnCanvas.length - 1; i >= 0; i--) {
    const s = stickersOnCanvas[i];
    if (
      mouseX >= s.x && mouseX <= s.x + s.width &&
      mouseY >= s.y && mouseY <= s.y + s.height
    ) {
      selectedSticker = s;
      offsetX = mouseX - s.x;
      offsetY = mouseY - s.y;
      // Bring sticker to top
      stickersOnCanvas.push(stickersOnCanvas.splice(i,1)[0]);
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (selectedSticker) {
    selectedSticker.x = e.offsetX - offsetX;
    selectedSticker.y = e.offsetY - offsetY;
    drawCanvas();
  }
});

canvas.addEventListener("mouseup", () => {
  selectedSticker = null;
});

canvas.addEventListener("mouseleave", () => {
  selectedSticker = null;
});

// Optional: Resize & rotate stickers (example sliders)
function resizeSticker(value) {
  if (selectedSticker) {
    selectedSticker.width = selectedSticker.img.width * (value / 100);
    selectedSticker.height = selectedSticker.img.height * (value / 100);
    drawCanvas();
  }
}

function rotateSticker(value) {
  if (selectedSticker) {
    selectedSticker.rotation = value;
    drawCanvas();
  }
}
