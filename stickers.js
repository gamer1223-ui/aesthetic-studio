// ===============================
// Aesthetic Studio Stickers Engine
// ===============================

let stickers = []; // Store sticker objects

let activeSticker = null;
let offsetX = 0;
let offsetY = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sticker Class
class Sticker{
constructor(img, x, y, width=80, height=80){
this.img = img;
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.selected = false;
}
draw(){
ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}
isInside(px, py){
return px >= this.x && px <= this.x + this.width &&
       py >= this.y && py <= this.y + this.height;
}
}

// ===============================
// Add Sticker from Library
// ===============================

document.querySelectorAll(".sticker-library img").forEach(sticker => {

sticker.addEventListener("click", function(){

let img = new Image();
img.src = sticker.src;

img.onload = function(){

let s = new Sticker(img, 120, 120);
stickers.push(s);
redrawCanvas();
saveHistory();

}

});

});

// ===============================
// Canvas Events for Stickers
// ===============================

canvas.addEventListener("mousedown", stickerMouseDown);
canvas.addEventListener("mousemove", stickerMouseMove);
canvas.addEventListener("mouseup", stickerMouseUp);

canvas.addEventListener("touchstart", stickerTouchStart);
canvas.addEventListener("touchmove", stickerTouchMove);
canvas.addEventListener("touchend", stickerTouchEnd);

function stickerMouseDown(e){
let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

activeSticker = null;
for(let i = stickers.length-1; i >=0; i--){
if(stickers[i].isInside(x,y)){
activeSticker = stickers[i];
offsetX = x - activeSticker.x;
offsetY = y - activeSticker.y;
activeSticker.selected = true;
break;
}
}

redrawCanvas();
}

function stickerMouseMove(e){
if(!activeSticker) return;

let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

activeSticker.x = x - offsetX;
activeSticker.y = y - offsetY;

redrawCanvas();
}

function stickerMouseUp(e){
if(activeSticker){
activeSticker.selected = false;
activeSticker = null;
saveHistory();
}
}

// ===============================
// Touch Support
// ===============================

function stickerTouchStart(e){
e.preventDefault();

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

activeSticker = null;
for(let i = stickers.length-1; i >=0; i--){
if(stickers[i].isInside(x,y)){
activeSticker = stickers[i];
offsetX = x - activeSticker.x;
offsetY = y - activeSticker.y;
activeSticker.selected = true;
break;
}
}

redrawCanvas();
}

function stickerTouchMove(e){
if(!activeSticker) return;

e.preventDefault();

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

activeSticker.x = x - offsetX;
activeSticker.y = y - offsetY;

redrawCanvas();
}

function stickerTouchEnd(e){
if(activeSticker){
activeSticker.selected = false;
activeSticker = null;
saveHistory();
}
}

// ===============================
// Redraw Canvas
// ===============================

function redrawCanvas(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(baseImage,0,0);

// Draw stickers
stickers.forEach(s => s.draw());
}
