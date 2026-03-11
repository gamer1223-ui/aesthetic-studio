// ===============================
// Aesthetic Studio Editor Engine
// ===============================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let baseImage = new Image();
let drawing = false;

let brushSize = 5;
let brushColor = "#000000";

let history = [];
let redoStack = [];

let currentTool = "draw";

// ===============================
// Upload Image
// ===============================

const uploadInput = document.getElementById("upload");

if(uploadInput){
uploadInput.addEventListener("change", function(e){

let file = e.target.files[0];
let reader = new FileReader();

reader.onload = function(event){

baseImage.onload = function(){

canvas.width = baseImage.width;
canvas.height = baseImage.height;

ctx.drawImage(baseImage,0,0);

saveHistory();

}

baseImage.src = event.target.result;

}

reader.readAsDataURL(file);

});
}

// ===============================
// Canvas Drawing
// ===============================

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);

canvas.addEventListener("touchstart", startDrawTouch);
canvas.addEventListener("touchmove", drawTouch);
canvas.addEventListener("touchend", stopDraw);

function startDraw(e){

if(currentTool !== "draw") return;

drawing = true;

ctx.beginPath();
ctx.moveTo(e.offsetX, e.offsetY);

}

function draw(e){

if(!drawing) return;

ctx.lineWidth = brushSize;
ctx.strokeStyle = brushColor;
ctx.lineCap = "round";

ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();

}

function stopDraw(){

if(drawing){
drawing = false;
saveHistory();
}

}

// ===============================
// Touch Support
// ===============================

function startDrawTouch(e){

if(currentTool !== "draw") return;

e.preventDefault();

const rect = canvas.getBoundingClientRect();

let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

drawing = true;

ctx.beginPath();
ctx.moveTo(x,y);

}

function drawTouch(e){

if(!drawing) return;

e.preventDefault();

const rect = canvas.getBoundingClientRect();

let x = e.touches[0].clientX - rect.left;
let y = e.touches[0].clientY - rect.top;

ctx.lineWidth = brushSize;
ctx.strokeStyle = brushColor;
ctx.lineCap = "round";

ctx.lineTo(x,y);
ctx.stroke();

}

// ===============================
// Brush Controls
// ===============================

const brushSlider = document.getElementById("brushSize");

if(brushSlider){
brushSlider.addEventListener("input",function(){

brushSize = this.value;

});
}

const brushColorPicker = document.getElementById("brushColor");

if(brushColorPicker){
brushColorPicker.addEventListener("input",function(){

brushColor = this.value;

});
}

// ===============================
// Eraser
// ===============================

function eraser(){

brushColor = "#ffffff";

}

// ===============================
// Text Tool
// ===============================

function addText(){

let textInput = document.getElementById("textInput");
let textColor = document.getElementById("textColor");
let fontSelect = document.getElementById("fontSelect");

if(!textInput) return;

let text = textInput.value;

if(text === "") return;

ctx.fillStyle = textColor.value;
ctx.font = "40px " + fontSelect.value;

ctx.fillText(text,100,100);

saveHistory();

}

// ===============================
// Stickers
// ===============================

document.querySelectorAll(".sticker-library img").forEach(sticker => {

sticker.addEventListener("click", function(){

let img = new Image();

img.onload = function(){

ctx.drawImage(img,120,120,80,80);
saveHistory();

}

img.src = sticker.src;

});

});

// ===============================
// Filters Engine
// ===============================

function applyFilter(type){

ctx.filter = type;

ctx.drawImage(baseImage,0,0);

ctx.filter = "none";

saveHistory();

}

// ===============================
// Undo / Redo
// ===============================

function saveHistory(){

history.push(canvas.toDataURL());

if(history.length > 50){
history.shift();
}

}

function undo(){

if(history.length > 1){

redoStack.push(history.pop());

let imgData = history[history.length-1];

let img = new Image();

img.onload = function(){

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

}

img.src = imgData;

}

}

function redo(){

if(redoStack.length > 0){

let imgData = redoStack.pop();

history.push(imgData);

let img = new Image();

img.onload = function(){

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

}

img.src = imgData;

}

}

// ===============================
// Download Image
// ===============================

function download(){

let link = document.createElement("a");

link.download = "aesthetic-studio-image.png";
link.href = canvas.toDataURL();

link.click();

}

// ===============================
// Tool Panels
// ===============================

function openPanel(id){

document.querySelectorAll(".panel").forEach(panel => {

panel.style.display = "none";

});

let active = document.getElementById(id);

if(active){
active.style.display = "block";
}

  }
