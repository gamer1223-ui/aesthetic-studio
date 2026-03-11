// ===========================
// animations.js
// Handles UI button hover, click animations, and toolbar transitions
// ===========================

// Select all toolbar buttons
const toolbarButtons = document.querySelectorAll(".toolbar-button");

// Add hover animation
toolbarButtons.forEach(button => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
    button.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
    button.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.25)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "none";
  });

  // Click animation
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.95)";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1.1)";
  });
});

// Toolbar expand/collapse
const toolbar = document.querySelector(".toolbar");
const toggleToolbar = document.querySelector("#toolbar-toggle");

toggleToolbar.addEventListener("click", () => {
  if (toolbar.classList.contains("collapsed")) {
    toolbar.classList.remove("collapsed");
    toolbar.style.height = "120px"; // expanded height
    toolbar.style.transition = "height 0.3s ease";
  } else {
    toolbar.classList.add("collapsed");
    toolbar.style.height = "50px"; // collapsed height
    toolbar.style.transition = "height 0.3s ease";
  }
});

// Smooth panel open animation
const panels = document.querySelectorAll(".tool-panel");
panels.forEach(panel => {
  panel.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

// Function to show panel
function showPanel(panelId) {
  panels.forEach(p => {
    if (p.id === panelId) {
      p.style.opacity = 1;
      p.style.transform = "translateY(0px)";
      p.style.pointerEvents = "auto";
    } else {
      p.style.opacity = 0;
      p.style.transform = "translateY(-20px)";
      p.style.pointerEvents = "none";
    }
  });
}

// Example usage: showPanel('text-tools') when Text button clicked
