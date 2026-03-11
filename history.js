// ===========================
// history.js
// Undo / Redo functionality for canvas
// ===========================

let historyStack = [];
let redoStack = [];

// Save current canvas state
function saveHistory() {
  const imageData = canvas.toDataURL();
  historyStack.push(imageData);
  redoStack = []; // Clear redo on new action
}

// Undo last action
function undo() {
  if (historyStack.length === 0) return;
  const lastState = historyStack.pop();
  redoStack.push(canvas.toDataURL());

  const img = new Image();
  img.src = lastState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

// Redo last undone action
function redo() {
  if (redoStack.length === 0) return;
  const redoState = redoStack.pop();
  historyStack.push(canvas.toDataURL());

  const img = new Image();
  img.src = redoState;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

// Example usage:
// After every action (brush, add text, stickers, crop, filter), call saveHistory()
