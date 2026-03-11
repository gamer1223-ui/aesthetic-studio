/* scrolllabel-text-panel.js – upgraded for stylish scrollable panels */

function createScrollablePanel(containerId, items, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ''; // clear previous content
  container.classList.add('scroll-panel');

  // Set panel direction
  container.style.flexDirection = options.direction === 'column' ? 'column' : 'row';
  container.style.maxHeight = options.maxHeight || '80px';
  container.style.overflowX = options.direction === 'row' ? 'auto' : 'hidden';
  container.style.overflowY = options.direction === 'column' ? 'auto' : 'hidden';

  items.forEach(item => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.margin = '4px';
    div.style.cursor = 'pointer';
    div.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    div.style.width = options.iconSize || '40px';
    div.style.height = options.iconSize || '40px';
    div.style.borderRadius = '10px';
    div.style.background = 'rgba(255,255,255,0.1)';
    div.style.fontSize = '14px';
    div.style.color = '#fff';
    div.title = item.name;

    // Hover effect
    div.addEventListener('mouseover', () => {
      div.style.transform = 'scale(1.2)';
      div.style.boxShadow = '0 4px 15px rgba(255,119,255,0.6)';
    });
    div.addEventListener('mouseout', () => {
      div.style.transform = 'scale(1)';
      div.style.boxShadow = 'none';
    });

    // Click event
    div.addEventListener('click', () => {
      if(item.onClick) item.onClick();
    });

    // If color item, show color
    if(item.color){
      div.style.background = item.color;
    }

    // If font item, show first letter styled
    if(item.font){
      div.style.fontFamily = item.font;
      div.textContent = item.name[0];
    }

    container.appendChild(div);
  });
}

// Example usage functions
function applyFont(font){
  const selectedText = document.querySelector('#canvasText'); // your selected text element
  if(selectedText) selectedText.style.fontFamily = font;
}

function applyTextColor(color){
  const selectedText = document.querySelector('#canvasText'); // your selected text element
  if(selectedText) selectedText.style.color = color;
}
