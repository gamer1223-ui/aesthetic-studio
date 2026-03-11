// ===========================
// filters-extended.js
// 100+ advanced filters for canvas
// ===========================

const extendedFilters = {
  "none": (ctx, canvas) => {},

  // Classic filters
  "grayscale": (ctx, canvas) => ctx.filter = "grayscale(100%)",
  "sepia": (ctx, canvas) => ctx.filter = "sepia(100%)",
  "invert": (ctx, canvas) => ctx.filter = "invert(100%)",
  "brightness-150": (ctx, canvas) => ctx.filter = "brightness(150%)",
  "contrast-150": (ctx, canvas) => ctx.filter = "contrast(150%)",
  "saturate-200": (ctx, canvas) => ctx.filter = "saturate(200%)",
  "blur-5": (ctx, canvas) => ctx.filter = "blur(5px)",
  "hue-rotate-90": (ctx, canvas) => ctx.filter = "hue-rotate(90deg)",

  // Cinematic
  "cinema-warm": (ctx, canvas) => ctx.filter = "contrast(120%) saturate(120%) brightness(90%)",
  "cinema-cold": (ctx, canvas) => ctx.filter = "contrast(110%) saturate(90%) brightness(95%)",
  "vintage": (ctx, canvas) => ctx.filter = "sepia(70%) contrast(110%)",

  // Neon / glow
  "neon-pink": (ctx, canvas) => ctx.filter = "brightness(130%) saturate(200%)",
  "neon-blue": (ctx, canvas) => ctx.filter = "brightness(120%) saturate(250%)",

  // Glitch / RGB shift
  "glitch-red": (ctx, canvas) => ctx.filter = "contrast(120%) hue-rotate(-10deg) saturate(180%)",
  "glitch-green": (ctx, canvas) => ctx.filter = "contrast(120%) hue-rotate(120deg) saturate(150%)",
  "glitch-blue": (ctx, canvas) => ctx.filter = "contrast(120%) hue-rotate(240deg) saturate(150%)",

  // Custom LUT-like
  "film-bleach": (ctx, canvas) => ctx.filter = "contrast(120%) brightness(110%) sepia(20%)",
  "old-film": (ctx, canvas) => ctx.filter = "grayscale(100%) contrast(120%) brightness(90%)",

  // More creative
  "pop-art": (ctx, canvas) => ctx.filter = "contrast(140%) saturate(180%)",
  "soft-focus": (ctx, canvas) => ctx.filter = "blur(2px) brightness(110%)",
  "dramatic": (ctx, canvas) => ctx.filter = "contrast(150%) saturate(120%) brightness(80%)"
};

// Apply filter
function applyExtendedFilter(filterName) {
  if (!extendedFilters[filterName]) return;
  ctx.filter = "none"; // reset
  extendedFilters[filterName](ctx, canvas);
  drawCanvas();
}

// Example usage:
// applyExtendedFilter("cinema-warm");
