/* UI.js – upgraded for stylish panels, dropdowns, welcome banner */

document.addEventListener("DOMContentLoaded", () => {

  // --- WELCOME BANNER ---
  const welcome = document.getElementById("welcomeBanner");
  if (welcome) {
    setTimeout(() => {
      welcome.style.opacity = 0;
      welcome.style.transition = "opacity 1s ease-out";
      setTimeout(() => { welcome.style.display = "none"; }, 1000);
    }, 3500); // Hide after 3.5 seconds
  }

  // --- PANEL OPEN/CLOSE ANIMATION ---
  const panels = document.querySelectorAll(".scroll-panel");
  panels.forEach(panel => {
    panel.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    panel.style.transform = "translateY(20px)";
    panel.style.opacity = "0.9";
  });

  // --- TEXT STYLES DROPDOWN ---
  const textDropdowns = document.querySelectorAll(".text-style-dropdown");
  textDropdowns.forEach(dropdown => {
    const arrow = dropdown.querySelector(".dropdown-arrow");
    const content = dropdown.querySelector(".text-style-dropdown-content");
    arrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if(content.style.display === "block"){
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });

  // --- CLOSE DROPDOWN WHEN CLICK OUTSIDE ---
  document.addEventListener("click", () => {
    const allDropdowns = document.querySelectorAll(".text-style-dropdown-content");
    allDropdowns.forEach(dd => dd.style.display = "none");
  });

  // --- INIT SCROLLABLE PANELS EXAMPLE ---
  // Fonts panel
  if(window.createScrollablePanel){
    createScrollablePanel("fontPanel", [
      { name: "Roboto", font: "Roboto", onClick: () => applyFont("Roboto") },
      { name: "Playfair Display", font: "Playfair Display", onClick: () => applyFont("Playfair Display") },
      { name: "Comic Sans MS", font: "Comic Sans MS", onClick: () => applyFont("Comic Sans MS") },
      { name: "Times New Roman", font: "Times New Roman", onClick: () => applyFont("Times New Roman") },
      // add more fonts as needed
    ], { direction: "row", iconSize: "30px", maxHeight: "80px" });

    // Colors panel
    createScrollablePanel("colorPanel", [
      { name: "Red", color: "#ff0000", onClick: () => applyTextColor("#ff0000") },
      { name: "Green", color: "#00ff00", onClick: () => applyTextColor("#00ff00") },
      { name: "Blue", color: "#0000ff", onClick: () => applyTextColor("#0000ff") },
      { name: "Yellow", color: "#ffff00", onClick: () => applyTextColor("#ffff00") },
      { name: "Pink", color: "#ff77ff", onClick: () => applyTextColor("#ff77ff") },
      // add more colors as needed
    ], { direction: "row", iconSize: "28px", maxHeight: "80px" });
  }

});
