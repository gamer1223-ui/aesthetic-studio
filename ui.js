// ===========================
// ui.js
// Handles toolbar panel toggles and UI interactions
// ===========================

// Select toolbar buttons and panels
const toolbarButtons = document.querySelectorAll(".toolbar-button");
const panels = document.querySelectorAll(".tool-panel");

// Hide all panels initially
panels.forEach(panel => {
  panel.style.opacity = 0;
  panel.style.pointerEvents = "none";
  panel.style.transform = "translateY(-10px)";
  panel.style.transition = "opacity 0.3s ease, transform 0.3s ease";
});

// Function to show a specific panel
function showPanel(panelId) {
  panels.forEach(panel => {
    if (panel.id === panelId) {
      panel.style.opacity = 1;
      panel.style.pointerEvents = "auto";
      panel.style.transform = "translateY(0px)";
    } else {
      panel.style.opacity = 0;
      panel.style.pointerEvents = "none";
      panel.style.transform = "translateY(-10px)";
    }
  });
}

// Attach click events to toolbar buttons
toolbarButtons.forEach(button => {
  button.addEventListener("click", () => {
    const targetPanel = button.dataset.panel; // data-panel attribute in HTML
    if (targetPanel) {
      showPanel(targetPanel);
    }
  });
});

// Optional: Collapse toolbar automatically when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".toolbar") && !e.target.closest(".tool-panel")) {
    panels.forEach(panel => {
      panel.style.opacity = 0;
      panel.style.pointerEvents = "none";
      panel.style.transform = "translateY(-10px)";
    });
  }
});
