// ===========================
// layer-manager.js
// Layer management for canvas elements
// ===========================

let layers = {
  background: [], // base image
  brush: [],
  text: [],
  stickers: [],
  animatedStickers: []
};

// Add element to a layer
function addToLayer(type, element) {
  if (!layers[type]) layers[type] = [];
  layers[type].push(element);
  drawCanvas();
}

// Bring element to front
function bringToFront(type, element) {
  if (!layers[type]) return;
  layers[type] = layers[type].filter(el => el !== element);
  layers[type].push(element);
  drawCanvas();
}

// Send element to back
function sendToBack(type, element) {
  if (!layers[type]) return;
  layers[type] = layers[type].filter(el => el !== element);
  layers[type].unshift(element);
  drawCanvas();
}

// Draw all layers in order
function drawLayers() {
  // Background
  layers.background.forEach(el => ctx.drawImage(el.img, el.x, el.y, el.width, el.height));

  // Brush strokes
  layers.brush.forEach(stroke => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.beginPath();
    ctx.moveTo(stroke.path[0].x, stroke.path[0].y);
    stroke.path.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  });

  // Stickers
  layers.stickers.forEach(s => ctx.drawImage(s.img, s.x, s.y, s.width, s.height));

  // Animated Stickers
  layers.animatedStickers.forEach(s => ctx.drawImage(s.img, s.x, s.y, s.width, s.height));

  // Text
  textsOnCanvas.forEach(t => drawTextsWithStyle()); // from text-styles.js
}
