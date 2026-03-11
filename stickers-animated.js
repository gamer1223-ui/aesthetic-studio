// ===========================
// stickers-animated.js
// Add animated stickers (GIF/PNG sequences)
// ===========================

let animatedStickers = [];
let selectedAnimatedSticker = null;
let draggingAnimatedSticker = false;
let offsetAX = 0;
let offsetAY = 0;

// Add animated sticker
function addAnimatedSticker(imgSrc, width = 100, height = 100) {
  const img = new Image();
  img.src = imgSrc;
  const sticker = { img, x: 50, y: 50, width, height, rotation: 0, loaded: false };
  
  img.onload = () => {
    sticker.loaded = true;
    drawCanvas();
  };
  
  animatedStickers.push(sticker);
}

// Draw all animated stickers
function drawAnimatedStickers() {
  animatedStickers.forEach(s => {
    if (!s.loaded) return;
    ctx.save();
    ctx.translate(s.x + s.width / 2, s.y + s.height / 2);
    ctx.rotate((s.rotation * Math.PI) / 180);
    ctx.drawImage(s.img, -s.width / 2, -s.height / 2, s.width, s.height);
    ctx.restore();
  });
}

// Mouse events for drag
canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  for (let i = animatedStickers.length - 1; i >= 0; i--) {
    const s = animatedStickers[i];
    if (
      mouseX >= s.x && mouseX <= s.x + s.width &&
      mouseY >= s.y && mouseY <= s.y + s.height
    ) {
      selectedAnimatedSticker = s;
      draggingAnimatedSticker = true;
      offsetAX = mouseX - s.x;
      offsetAY = mouseY - s.y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!draggingAnimatedSticker || !selectedAnimatedSticker) return;

  selectedAnimatedSticker.x = e.offsetX - offsetAX;
  selectedAnimatedSticker.y = e.offsetY - offsetAY;
  drawCanvas();
});

canvas.addEventListener("mouseup", () => {
  draggingAnimatedSticker = false;
  selectedAnimatedSticker = null;
});

canvas.addEventListener("mouseleave", () => {
  draggingAnimatedSticker = false;
  selectedAnimatedSticker = null;
});

// Resize animated sticker
function resizeAnimatedSticker(sticker, newWidth, newHeight) {
  sticker.width = newWidth;
  sticker.height = newHeight;
  drawCanvas();
}

// Rotate animated sticker
function rotateAnimatedSticker(sticker, angle) {
  sticker.rotation = angle;
  drawCanvas();
}
