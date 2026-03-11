// ===========================
// text-arrangement.js
// Auto-arrange text in a readable box
// ===========================

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, font = "20px Arial") {
  ctx.font = font;
  const words = text.split(" ");
  let line = "";
  let yPos = y;

  words.forEach((word, index) => {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && line !== "") {
      ctx.fillText(line, x, yPos);
      line = word + " ";
      yPos += lineHeight;
    } else {
      line = testLine;
    }

    // Last line
    if (index === words.length - 1) {
      ctx.fillText(line, x, yPos);
    }
  });
}

// Example usage:
// drawWrappedText(ctx, "This is a long text that will wrap automatically without breaking words.", 50, 50, 300, 30, "24px Arial");
