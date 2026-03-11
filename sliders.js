/* sliders.js – upgraded for stylish sliders */

document.addEventListener("DOMContentLoaded", () => {

  const sliders = document.querySelectorAll('input[type="range"]');

  sliders.forEach(slider => {
    // Set initial style
    slider.style.width = "200px";
    slider.style.height = "10px";
    slider.style.borderRadius = "5px";
    slider.style.background = "#ff77ff";
    slider.style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)";
    slider.style.transition = "all 0.3s ease";

    // Create handle animation
    slider.addEventListener("mouseover", () => {
      slider.style.boxShadow = "0 5px 15px rgba(255,119,255,0.6)";
    });

    slider.addEventListener("mouseout", () => {
      slider.style.boxShadow = "0 3px 10px rgba(0,0,0,0.3)";
    });

    slider.addEventListener("input", () => {
      const valuePercent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
      slider.style.background = `linear-gradient(90deg, #ff77ff ${valuePercent}%, #555 ${valuePercent}%)`;
    });
  });

});
