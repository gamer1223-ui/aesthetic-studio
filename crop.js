// ===============================
// Aesthetic Studio Crop Tool
// ===============================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let cropping = false;
let cropRect = {x:50, y:50, width:200, height:200};
let draggingCorner = null;
let startX = 0;
let startY = 0;

const cornerSize = 10;

// ===============================
// Start Crop
// ===============================

function startCrop(){
cropping = true;
redrawCanvas();
drawCropRect();
}

// ===============================
// Mouse Events
// ===============================

canvas.addEventListener("mousedown", cropMouseDown);
canvas.addEventListener("mousemove", cropMouseMove);
canvas.addEventListener("mouseup", cropMouseUp);

// ===============================
// Touch Events
// ===============================

canvas.addEventListener("touchstart", cropTouchStart);
canvas.addEventListener("touchmove", cropTouchMove);
canvas.addEventListener("touchend", cropTouchEnd);

// ===============================
// Draw Crop Rectangle
// ===============================

function drawCropRect(){
ctx.save();
ctx.strokeStyle = "#FF0000";
ctx.lineWidth = 2;
ctx.setLineDash([6]);
ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

// Draw corners
ctx.fillStyle = "#FF0000";
ctx.setLineDash([]);
ctx.fillRect(cropRect.x-cornerSize/2, cropRect.y-cornerSize/2, cornerSize, cornerSize);
ctx.fillRect(cropRect.x+cropRect.width-cornerSize/2, cropRect.y-cornerSize/2, cornerSize, cornerSize);
ctx.fillRect(cropRect.x-cornerSize/2, cropRect.y+cropRect.height-cornerSize/2, cornerSize, cornerSize);
ctx.fillRect(cropRect.x+cropRect.width-cornerSize/2, cropRect.y+cropRect.height-cornerSize/2, cornerSize, cornerSize);
ctx.restore();
}

// ===============================
// Check if click is on corner
// ===============================

function getCorner(x, y){
if(Math.abs(x - cropRect.x) < cornerSize && Math.abs(y - cropRect.y) < cornerSize) return "tl";
if(Math.abs(x - (cropRect.x+cropRect.width)) < cornerSize && Math.abs(y - cropRect.y) < cornerSize) return "tr";
if(Math.abs(x - cropRect.x) < cornerSize && Math.abs(y - (cropRect.y+cropRect.height)) < cornerSize) return "bl";
if(Math.abs(x - (cropRect.x+cropRect.width)) < cornerSize && Math.abs(y - (cropRect.y+cropRect.height)) < cornerSize) return "br";
return null;
}

// ===============================
// Mouse Event Handlers
// ===============================

function cropMouseDown(e){
if(!cropping) return;

let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

draggingCorner = getCorner(x, y);
startX = x;
startY = y;
}

function cropMouseMove(e){
if(!draggingCorner) return;

let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

switch(draggingCorner){
case "tl":
cropRect.width += cropRect.x - x;
cropRect.height += cropRect.y - y;
cropRect.x = x;
cropRect.y = y;
break;
case "tr":
cropRect.width = x - cropRect.x;
cropRect.height += cropRect.y - y;
cropRect.y = y;
break;
case "bl":
cropRect.width += cropRect.x - x;
cropRect.x = x;
cropRect.height = y - cropRect.y;
break;
case "br":
cropRect.width = x - cropRect.x;
cropRect.height = y - cropRect.y;
break;
}

redrawCanvas();
drawCropRect();
}

function cropMouseUp(e){
draggingCorner = null;
saveHistory();
}

// ===============================
// Touch Handlers
// ===============================

function cropTouchStart(e){
e.preventDefault();
if(!cropping) return;

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

draggingCorner = getCorner(x,y);
startX = x;
startY = y;
}

function cropTouchMove(e){
if(!draggingCorner) return;
e.preventDefault();

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

switch(draggingCorner){
case "tl":
cropRect.width += cropRect.x - x;
cropRect.height += cropRect.y - y;
cropRect.x = x;
cropRect.y = y;
break;
case "tr":
cropRect.width = x - cropRect.x;
cropRect.height += cropRect.y - y;
cropRect.y = y;
break;
case "bl":
cropRect.width += cropRect.x - x;
cropRect.x = x;
cropRect.height = y - cropRect.y;
break;
case "br":
cropRect.width = x - cropRect.x;
cropRect.height = y - cropRect.y;
break;
}

redrawCanvas();
drawCropRect();
}

function cropTouchEnd(e){
draggingCorner = null;
saveHistory();
}

// ===============================
// Perform Crop
// ===============================

function applyCrop(){
let imgData = ctx.getImageData(cropRect.x, cropRect.y, cropRect.width, cropRect.height);

canvas.width = cropRect.width;
canvas.height = cropRect.height;

ctx.putImageData(imgData,0,0);

baseImage.src = canvas.toDataURL();
texts = [];
stickers = [];
saveHistory();
cropping = false;
redrawCanvas();
  }
