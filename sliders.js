// ===========================
// sliders.js
// Handles all slidebars: brush size, text size, zoom, rotation
// ===========================

const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {
  const valueDisplay = slider.nextElementSibling; // show value next to slider

  // Initialize value display
  valueDisplay.textContent = slider.value;

  // Update on input
  slider.addEventListener("input", (e) => {
    const val = e.target.value;
    valueDisplay.textContent = val;

    // Identify slider type by data attribute
    const type = slider.dataset.type;

    switch(type) {
      case "brush":
        brushSize = val; // global brush size variable
        break;
      case "text":
        textSize = val; // global text size variable
        updateSelectedText(); // function in text.js to update text size
        break;
      case "zoom":
        canvas.style.transform = `scale(${val/100})`;
        break;
      case "rotation":
        canvas.style.transform = `rotate(${val}deg)`;
        break;
      default:
        console.warn("Unknown slider type:", type);
    }
  });

  // Optional: smooth sliding animation
  slider.addEventListener("mousedown", () => {
    slider.classList.add("active-slider");
  });
  slider.addEventListener("mouseup", () => {
    slider.classList.remove("active-slider");
  });
});
