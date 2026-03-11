// ===========================
// text.js
// Add, drag, resize, rotate text on canvas
// ===========================

let textsOnCanvas = [];
let selectedText = null;
let draggingText = false;
let offsetTextX = 0;
let offsetTextY = 0;

// Add text
function addText(content = "Hello", fontSize = 30, color = "#000000", font = "Arial") {
  const textObj = {
    content,
    x: 50,
    y: 50,
    fontSize,
    color,
    font,
    rotation: 0,
    shadow: null,
    border: null
  };
  textsOnCanvas.push(textObj);
  drawCanvas();
}

// Draw all texts
function drawTexts() {
  textsOnCanvas.forEach(t => {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate((t.rotation * Math.PI) / 180);

    if (t.shadow) {
      ctx.shadowColor = t.shadow.color;
      ctx.shadowBlur = t.shadow.blur;
      ctx.shadowOffsetX = t.shadow.offsetX;
      ctx.shadowOffsetY = t.shadow.offsetY;
    } else {
      ctx.shadowColor = "transparent";
    }

    ctx.font = `${t.fontSize}px ${t.font}`;
    ctx.fillStyle = t.color;

    if (t.border) {
      ctx.strokeStyle = t.border.color;
      ctx.lineWidth = t.border.width;
      ctx.strokeText(t.content, 0, 0);
    }

    ctx.fillText(t.content, 0, 0);
    ctx.restore();
  });
}

// Drag text
canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  for (let i = textsOnCanvas.length - 1; i >= 0; i--) {
    const t = textsOnCanvas[i];
    // Rough bounding box
    const textWidth = ctx.measureText(t.content).width;
    const textHeight = t.fontSize;

    if (
      mouseX >= t.x && mouseX <= t.x + textWidth &&
      mouseY >= t.y - textHeight && mouseY <= t.y
    ) {
      selectedText = t;
      draggingText = true;
      offsetTextX = mouseX - t.x;
      offsetTextY = mouseY - t.y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!draggingText || !selectedText) return;

  selectedText.x = e.offsetX - offsetTextX;
  selectedText.y = e.offsetY - offsetTextY;
  drawCanvas();
});

canvas.addEventListener("mouseup", () => {
  draggingText = false;
  selectedText = null;
});

canvas.addEventListener("mouseleave", () => {
  draggingText = false;
  selectedText = null;
});

// Optional: remove text
function removeText(textObj) {
  textsOnCanvas = textsOnCanvas.filter(t => t !== textObj);
  drawCanvas();
}
