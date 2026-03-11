// =============================
// Aesthetic Studio Filters Engine
// =============================

function resetFilter(){

ctx.filter = "none";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

// =============================
// Basic Filters
// =============================

function filterBright(){

ctx.filter = "brightness(140%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterDark(){

ctx.filter = "brightness(60%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterContrast(){

ctx.filter = "contrast(180%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterGray(){

ctx.filter = "grayscale(100%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterSepia(){

ctx.filter = "sepia(100%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterInvert(){

ctx.filter = "invert(100%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterBlur(){

ctx.filter = "blur(3px)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterSharp(){

ctx.filter = "contrast(120%) saturate(140%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterVintage(){

ctx.filter = "sepia(70%) contrast(120%) brightness(90%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterCool(){

ctx.filter = "hue-rotate(180deg)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterWarm(){

ctx.filter = "hue-rotate(-30deg) saturate(140%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterPop(){

ctx.filter = "saturate(200%) contrast(120%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterSoft(){

ctx.filter = "brightness(110%) blur(1px)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterDream(){

ctx.filter = "brightness(120%) saturate(130%) blur(2px)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}

function filterFilm(){

ctx.filter = "contrast(140%) sepia(30%)";
ctx.drawImage(baseImage,0,0);

saveHistory();

}
