// ===========================
// neon.js
// Adds glow/neon effects to text
// ===========================

// Default neon settings
let neonEnabled = false;
let neonColor = "#ff00ff"; // default neon color
let neonBlur = 10;

// Enable/disable neon for selected text
function toggleNeon() {
  if (selectedText) {
    neonEnabled = !neonEnabled;
    drawCanvas();
  }
}

// Set neon color
function setNeonColor(color) {
  neonColor = color;
  if (selectedText && neonEnabled) drawCanvas();
}

// Update drawCanvas in text.js to include neon effect
function drawCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw stickers first if stickers.js included
  if (typeof stickersOnCanvas !== "undefined") {
    stickersOnCanvas.forEach(s => {
      ctx.save();
      ctx.translate(s.x + s.width/2, s.y + s.height/2);
      ctx.rotate(s.rotation * Math.PI / 180);
      ctx.drawImage(s.img, -s.width/2, -s.height/2, s.width, s.height);
      ctx.restore();
    });
  }

  // Draw all texts
  textsOnCanvas.forEach(txt => {
    ctx.save();
    ctx.translate(txt.x, txt.y);
    ctx.rotate(txt.rotation * Math.PI / 180);
    ctx.font = `${txt.size}px ${txt.font}`;
    ctx.fillStyle = txt.color;

    // Shadow
    if (txt.shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    // Neon effect
    if (txt === selectedText && neonEnabled) {
      ctx.shadowColor = neonColor;
      ctx.shadowBlur = neonBlur;
      ctx.fillStyle = neonColor;
    }

    ctx.fillText(txt.content, 0, 0);

    if (txt.border) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeText(txt.content, 0, 0);
    }

    ctx.restore();
  });
}
