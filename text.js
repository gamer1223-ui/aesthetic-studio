// ===============================
// Aesthetic Studio Text Tool
// ===============================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let texts = [];
let activeText = null;
let offsetX = 0;
let offsetY = 0;

// Text Object
class TextObj{
constructor(text, x, y, font="Arial", size=40, color="#000000", shadow=false, border=false){
this.text = text;
this.x = x;
this.y = y;
this.font = font;
this.size = size;
this.color = color;
this.shadow = shadow;
this.border = border;
this.selected = false;
}
draw(){
ctx.font = this.size + "px " + this.font;
ctx.fillStyle = this.color;
if(this.shadow){
ctx.shadowColor = "rgba(0,0,0,0.5)";
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 4;
} else{
ctx.shadowColor = "transparent";
}
ctx.fillText(this.text,this.x,this.y);

if(this.border){
ctx.lineWidth = 2;
ctx.strokeStyle = "#000000";
ctx.strokeText(this.text,this.x,this.y);
}

ctx.shadowColor = "transparent";
}
isInside(px, py){
let metrics = ctx.measureText(this.text);
let width = metrics.width;
let height = this.size;
return px >= this.x && px <= this.x + width &&
       py <= this.y && py >= this.y - height;
}
}

// ===============================
// Add Text
// ===============================

function addText(){

let textInput = document.getElementById("textInput");
let textColor = document.getElementById("textColor");
let fontSelect = document.getElementById("fontSelect");
let shadowCheck = document.getElementById("textShadow");
let borderCheck = document.getElementById("textBorder");

if(!textInput) return;

let text = textInput.value;

if(text === "") return;

let t = new TextObj(
text,
100,
100,
fontSelect.value,
40,
textColor.value,
shadowCheck.checked,
borderCheck.checked
);

texts.push(t);
redrawCanvas();
saveHistory();
}

// ===============================
// Canvas Events for Text
// ===============================

canvas.addEventListener("mousedown", textMouseDown);
canvas.addEventListener("mousemove", textMouseMove);
canvas.addEventListener("mouseup", textMouseUp);

canvas.addEventListener("touchstart", textTouchStart);
canvas.addEventListener("touchmove", textTouchMove);
canvas.addEventListener("touchend", textTouchEnd);

function textMouseDown(e){
let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

activeText = null;
for(let i = texts.length-1; i>=0; i--){
if(texts[i].isInside(x,y)){
activeText = texts[i];
offsetX = x - activeText.x;
offsetY = y - activeText.y;
activeText.selected = true;
break;
}
}
redrawCanvas();
}

function textMouseMove(e){
if(!activeText) return;

let rect = canvas.getBoundingClientRect();
let x = e.clientX - rect.left;
let y = e.clientY - rect.top;

activeText.x = x - offsetX;
activeText.y = y - offsetY;

redrawCanvas();
}

function textMouseUp(e){
if(activeText){
activeText.selected = false;
activeText = null;
saveHistory();
}
}

// ===============================
// Touch Support
// ===============================

function textTouchStart(e){
e.preventDefault();
let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

activeText = null;
for(let i = texts.length-1; i>=0; i--){
if(texts[i].isInside(x,y)){
activeText = texts[i];
offsetX = x - activeText.x;
offsetY = y - activeText.y;
activeText.selected = true;
break;
}
}
redrawCanvas();
}

function textTouchMove(e){
if(!activeText) return;
e.preventDefault();

let rect = canvas.getBoundingClientRect();
let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

activeText.x = x - offsetX;
activeText.y = y - offsetY;

redrawCanvas();
}

function textTouchEnd(e){
if(activeText){
activeText.selected = false;
activeText = null;
saveHistory();
}

// ===============================
// Redraw Canvas
// ===============================

function redrawCanvas(){
ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(baseImage,0,0);

// Draw stickers
if(typeof stickers !== "undefined"){
stickers.forEach(s => s.draw());
}

// Draw all texts
texts.forEach(t => t.draw());
  }
