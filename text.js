// ===========================
// text.js
// Handles adding text, moving, resizing, rotating, colors, shadow, border
// ===========================

let textsOnCanvas = []; // Store all text objects
let selectedText = null;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Default text settings
let textColor = "#000000";
let textSize = 40;
let textFont = "Arial";
let textShadow = false;
let textBorder = false;

// Add text to canvas
function addText(content) {
  const textObj = {
    content: content,
    x: canvas.width/2,
    y: canvas.height/2,
    size: textSize,
    font: textFont,
    color: textColor,
    shadow: textShadow,
    border: textBorder,
    rotation: 0
  };
  textsOnCanvas.push(textObj);
  drawCanvas();
}

// Update text settings for selected text
function updateSelectedText() {
  if (selectedText) {
    selectedText.size = textSize;
    selectedText.font = textFont;
    selectedText.color = textColor;
    selectedText.shadow = textShadow;
    selectedText.border = textBorder;
    drawCanvas();
  }
}

// Draw all texts and stickers (combined)
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
    if (txt.shadow) {
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
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

// Mouse events for moving text
let offsetX = 0, offsetY = 0;

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  selectedText = null;

  // Check if clicking on any text (from top to bottom)
  for (let i = textsOnCanvas.length - 1; i >= 0; i--) {
    const txt = textsOnCanvas[i];
    const metrics = ctx.measureText(txt.content);
    const width = metrics.width;
    const height = txt.size;
    if (
      mouseX >= txt.x && mouseX <= txt.x + width &&
      mouseY <= txt.y && mouseY >= txt.y - height
    ) {
      selectedText = txt;
      offsetX = mouseX - txt.x;
      offsetY = mouseY - txt.y;
      // Bring text to top
      textsOnCanvas.push(textsOnCanvas.splice(i,1)[0]);
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (selectedText) {
    selectedText.x = e.offsetX - offsetX;
    selectedText.y = e.offsetY - offsetY;
    drawCanvas();
  }
});

canvas.addEventListener("mouseup", () => {
  selectedText = null;
});

canvas.addEventListener("mouseleave", () => {
  selectedText = null;
});
