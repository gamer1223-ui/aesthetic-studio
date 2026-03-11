/* theme.js – upgraded for colorful UI themes */

const themes = {
  light: {
    bodyBg: '#f5f5f5',
    textColor: '#111',
    panelBg: 'rgba(255,255,255,0.9)',
    buttonGradient: 'linear-gradient(90deg, #ff7fff, #7fbfff)',
    sliderColor: '#ff77ff'
  },
  dark: {
    bodyBg: '#111',
    textColor: '#fff',
    panelBg: 'rgba(30,30,30,0.9)',
    buttonGradient: 'linear-gradient(90deg, #00ffff, #ff00ff)',
    sliderColor: '#00ffff'
  },
  neon: {
    bodyBg: '#000',
    textColor: '#0fff0f',
    panelBg: 'rgba(0,0,0,0.85)',
    buttonGradient: 'linear-gradient(90deg, #0ff, #f0f)',
    sliderColor: '#0fff0f'
  },
  rgbGlow: {
    bodyBg: '#111',
    textColor: '#fff',
    panelBg: 'rgba(0,0,0,0.7)',
    buttonGradient: 'linear-gradient(90deg, #ff0000,#00ff00,#0000ff)',
    sliderColor: '#ff0000'
  },
  pinkGradient: {
    bodyBg: '#330033',
    textColor: '#fff',
    panelBg: 'rgba(50,0,50,0.85)',
    buttonGradient: 'linear-gradient(90deg,#ff77ff,#ff00ff)',
    sliderColor: '#ff77ff'
  }
};

// Apply a theme dynamically
function applyTheme(name){
  const theme = themes[name];
  if(!theme) return;

  document.body.style.background = theme.bodyBg;
  document.body.style.color = theme.textColor;

  // Update panels
  const panels = document.querySelectorAll('.scroll-panel');
  panels.forEach(panel => panel.style.background = theme.panelBg);

  // Update buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => btn.style.background = theme.buttonGradient);

  // Update sliders
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach(slider => slider.style.background = theme.sliderColor);

  // Optionally update welcome banner
  const banner = document.getElementById("welcomeBanner");
  if(banner){
    banner.style.background = theme.buttonGradient;
  }
}
