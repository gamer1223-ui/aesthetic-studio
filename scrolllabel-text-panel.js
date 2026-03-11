// ===========================
// scrollable-text-panel.js
// Scrollable dynamic panel for text, colors, or items
// ===========================

function createScrollablePanel(containerId, items, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  // Apply default styles
  container.style.display = "flex";
  container.style.flexDirection = options.direction || "row"; // horizontal or vertical
  container.style.overflowX = options.direction === "row" ? "auto" : "hidden";
  container.style.overflowY = options.direction === "column" ? "auto" : "hidden";
  container.style.maxHeight = options.maxHeight || "120px";
  container.style.maxWidth = options.maxWidth || "100%";
  container.style.padding = "5px";

  // Create item elements
  items.forEach(item => {
    const el = document.createElement("div");
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.margin = "5px";
    el.style.cursor = "pointer";

    // Icon or color preview
    if (item.icon) {
      const icon = document.createElement("img");
      icon.src = item.icon;
      icon.style.width = options.iconSize || "24px";
      icon.style.height = options.iconSize || "24px";
      icon.style.marginRight = "5px";
      el.appendChild(icon);
    } else if (item.color) {
      const colorBox = document.createElement("div");
      colorBox.style.width = options.iconSize || "24px";
      colorBox.style.height = options.iconSize || "24px";
      colorBox.style.backgroundColor = item.color;
      colorBox.style.border = "1px solid #000";
      colorBox.style.marginRight = "5px";
      el.appendChild(colorBox);
    }

    // Text
    const text = document.createElement("span");
    text.innerText = item.name || "";
    el.appendChild(text);

    // Click handler
    if (item.onClick) {
      el.addEventListener("click", item.onClick);
    }

    container.appendChild(el);
  });

  // Optional: Add scroll shadow indicators
  container.addEventListener("scroll", () => {
    // You can implement shadows or arrows to indicate more content
  });
}

// Example usage:
// HTML: <div id="colorPanel"></div>
// JS:
createScrollablePanel("colorPanel", [
  { name: "Red", color: "#ff0000", onClick: () => applyTextColor("#ff0000") },
  { name: "Green", color: "#00ff00", onClick: () => applyTextColor("#00ff00") },
  { name: "Blue", color: "#0000ff", onClick: () => applyTextColor("#0000ff") },
  // add as many as needed
], { direction: "row", iconSize: "30px", maxHeight: "60px" });
