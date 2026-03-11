// ===========================
// theme.js
// UI themes and button animations
// ===========================

// Theme configurations
const themes = {
  light: {
    background: "#ffffff",
    buttonColor: "#f0f0f0",
    buttonHover: "#dcdcdc",
    textColor: "#000000"
  },
  dark: {
    background: "#1e1e1e",
    buttonColor: "#333333",
    buttonHover: "#555555",
    textColor: "#ffffff"
  },
  pink: {
    background: "#ffe6f0",
    buttonColor: "#ffb6c1",
    buttonHover: "#ff99b3",
    textColor: "#4d0033"
  }
};

// Current theme
let currentTheme = "light";

// Apply theme
function applyTheme(themeName) {
  if (!themes[themeName]) return;
  currentTheme = themeName;

  const theme = themes[themeName];
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.textColor;

  const buttons = document.querySelectorAll(".theme-button");
  buttons.forEach(btn => {
    btn.style.backgroundColor = theme.buttonColor;
    btn.style.color = theme.textColor;

    // Hover effect
    btn.addEventListener("mouseenter", () => {
      btn.style.backgroundColor = theme.buttonHover;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.backgroundColor = theme.buttonColor;
    });
  });
}

// Add animated button effect
function animateButton(btn) {
  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.95)";
  });
  btn.addEventListener("mouseup", () => {
    btn.style.transform = "scale(1)";
  });
}
