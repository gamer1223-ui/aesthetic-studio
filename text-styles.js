// ===========================
// text-styles.js
// Advanced text styles for canvas
// ===========================

const textStyles = {
  "normal": (ctx, t) => {
    ctx.fillStyle = t.color;
    ctx.shadowColor = "transparent";
  },
  "shadow": (ctx, t) => {
    ctx.fillStyle = t.color;
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  },
  "outline": (ctx, t) => {
    ctx.fillStyle = t.color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(t.content, t.x, t.y);
  },
  "neon": (ctx, t) => {
    ctx.fillStyle = t.color;
    ctx.shadowColor = t.color;
    ctx.shadowBlur = 15;
  },
  "gradient-horizontal": (ctx, t) => {
    const gradient = ctx.createLinearGradient(t.x, t.y, t.x + ctx.measureText(t.content).width, t.y);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
  },
  "gradient-vertical": (ctx, t) => {
    const gradient = ctx.createLinearGradient(t.x, t.y, t.x, t.y + t.fontSize);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
  }
};

// Apply a style to a text object
function applyTextStyle(textObj, styleName) {
  if (!textStyles[styleName]) return;
  textObj.style = styleName;
  drawCanvas();
}

// Modify drawTexts function to include style
function drawTextsWithStyle() {
  textsOnCanvas.forEach(t => {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate((t.rotation * Math.PI) / 180);

    // Apply selected style
    const styleFunc = t.style ? textStyles[t.style] : textStyles["normal"];
    styleFunc(ctx, t);

    ctx.font = `${t.fontSize}px ${t.font}`;
    ctx.fillText(t.content, 0, 0);
    ctx.restore();
  });
}
