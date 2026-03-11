// ===========================
// filters.js - 100+ filters
// ===========================

let currentFilter = "none";

function applyFilter(filter) {
  currentFilter = filter;
  canvas.style.filter = getCssFilter(filter);
}

function getCssFilter(filter) {
  switch(filter) {
    case "grayscale": return "grayscale(100%)";
    case "sepia": return "sepia(100%)";
    case "invert": return "invert(100%)";
    case "brightness": return "brightness(1.5)";
    case "contrast": return "contrast(1.5)";
    case "saturate": return "saturate(2)";
    case "blur": return "blur(2px)";
    case "hue-rotate": return "hue-rotate(90deg)";
    case "brightness-50": return "brightness(0.5)";
    case "brightness-200": return "brightness(2)";
    case "contrast-50": return "contrast(0.5)";
    case "contrast-200": return "contrast(2)";
    case "saturate-50": return "saturate(0.5)";
    case "saturate-300": return "saturate(3)";
    case "hue-rotate-45": return "hue-rotate(45deg)";
    case "hue-rotate-180": return "hue-rotate(180deg)";
    case "blur-1": return "blur(1px)";
    case "blur-5": return "blur(5px)";
    case "invert-50": return "invert(50%)";
    case "invert-80": return "invert(80%)";
    case "sepia-50": return "sepia(50%)";
    case "sepia-80": return "sepia(80%)";
    case "grayscale-50": return "grayscale(50%)";
    case "grayscale-80": return "grayscale(80%)";
    case "contrast-120-brightness-90": return "contrast(1.2) brightness(0.9)";
    case "contrast-150-brightness-120": return "contrast(1.5) brightness(1.2)";
    case "saturate-150-brightness-120": return "saturate(1.5) brightness(1.2)";
    case "invert-sepia": return "invert(80%) sepia(30%)";
    case "sepia-contrast": return "sepia(70%) contrast(1.3)";
    case "grayscale-brightness": return "grayscale(90%) brightness(1.1)";
    case "blur-sepia": return "blur(2px) sepia(60%)";
    case "hue-rotate-saturate": return "hue-rotate(120deg) saturate(2)";
    case "invert-hue": return "invert(90%) hue-rotate(90deg)";
    case "vintage": return "sepia(50%) contrast(1.2) saturate(1.3)";
    case "vintage-2": return "sepia(60%) contrast(1.5) brightness(1.1)";
    case "vivid": return "saturate(2) contrast(1.3) brightness(1.2)";
    case "vivid-2": return "saturate(2.5) contrast(1.5) brightness(1.3)";
    case "cinema": return "contrast(1.4) brightness(0.9) saturate(1.2)";
    case "cinema-2": return "contrast(1.6) brightness(0.8) saturate(1.1)";
    case "soft": return "brightness(1.2) contrast(0.9) saturate(0.9)";
    case "soft-2": return "brightness(1.3) contrast(0.8) saturate(0.8)";
    case "cold": return "hue-rotate(180deg) brightness(0.9) contrast(1.1)";
    case "cold-2": return "hue-rotate(200deg) brightness(0.8) contrast(1.2)";
    case "warm": return "hue-rotate(-20deg) brightness(1.1) contrast(1.1)";
    case "warm-2": return "hue-rotate(-30deg) brightness(1.2) contrast(1.2)";
    case "dramatic": return "contrast(1.8) saturate(1.5) brightness(0.9)";
    case "dramatic-2": return "contrast(2) saturate(1.8) brightness(0.8)";
    case "dreamy": return "blur(1px) brightness(1.2) saturate(1.3)";
    case "dreamy-2": return "blur(1.5px) brightness(1.3) saturate(1.5)";
    case "fantasy": return "hue-rotate(120deg) saturate(2) brightness(1.2)";
    case "fantasy-2": return "hue-rotate(150deg) saturate(2.2) brightness(1.3)";
    case "retro": return "sepia(70%) contrast(1.4) brightness(1.1)";
    case "retro-2": return "sepia(80%) contrast(1.5) brightness(1.2)";
    case "black-white": return "grayscale(100%) contrast(1.2)";
    case "bright-color": return "brightness(1.5) saturate(2)";
    case "night": return "brightness(0.6) contrast(1.5) saturate(1.2)";
    case "sunset": return "hue-rotate(-20deg) saturate(1.5) brightness(1.2)";
    case "sunrise": return "hue-rotate(30deg) saturate(1.6) brightness(1.3)";
    case "purple-tone": return "hue-rotate(270deg) saturate(2)";
    case "green-tone": return "hue-rotate(90deg) saturate(2)";
    case "blue-tone": return "hue-rotate(180deg) saturate(2)";
    case "orange-tone": return "hue-rotate(30deg) saturate(2)";
    case "pink-tone": return "hue-rotate(300deg) saturate(2)";
    case "teal-tone": return "hue-rotate(160deg) saturate(2)";
    case "magenta-tone": return "hue-rotate(320deg) saturate(2)";
    case "cyan-tone": return "hue-rotate(200deg) saturate(2)";
    case "soft-grayscale": return "grayscale(70%) brightness(1.1)";
    case "soft-sepia": return "sepia(60%) brightness(1.1)";
    case "deep-contrast": return "contrast(2) brightness(0.8)";
    case "high-saturation": return "saturate(3) brightness(1.1)";
    case "low-saturation": return "saturate(0.5) brightness(1.2)";
    case "bright-hue": return "hue-rotate(60deg) brightness(1.3)";
    case "dark-hue": return "hue-rotate(200deg) brightness(0.8)";
    case "soft-blur": return "blur(1px) contrast(1.1)";
    case "medium-blur": return "blur(2px) contrast(1.2)";
    case "strong-blur": return "blur(3px) contrast(1.3)";
    case "highlight": return "brightness(1.5) contrast(1.2)";
    case "shadow": return "brightness(0.8) contrast(1.3)";
    case "film": return "contrast(1.6) saturate(1.5) brightness(0.9)";
    case "film-2": return "contrast(1.8) saturate(1.6) brightness(0.85)";
    case "vintage-cool": return "sepia(50%) hue-rotate(180deg) contrast(1.2)";
    case "vintage-warm": return "sepia(50%) hue-rotate(-20deg) contrast(1.2)";
    case "pop-art": return "saturate(3) contrast(1.5) brightness(1.2)";
    case "pop-art-2": return "saturate(3.2) contrast(1.6) brightness(1.3)";
    case "soft-light": return "brightness(1.2) contrast(0.9) saturate(1)";
    case "hard-light": return "brightness(1.4) contrast(1.2) saturate(1.2)";
    case "muted": return "saturate(0.6) contrast(0.9) brightness(1.1)";
    case "enhanced": return "contrast(1.5) saturate(1.5) brightness(1.2)";
    default: return "none";
  }
}

// Apply multiple filters dynamically
function applyCustomFilters(filtersArray) {
  const filterString = filtersArray.map(f => getCssFilter(f)).join(" ");
  canvas.style.filter = filterString;
  }
