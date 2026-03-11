function createFilterUI() {
    const tray = document.getElementById('filter-tray');
    const allFilters = window.MegaFilterEngine.getFilterList();

    allFilters.forEach(f => {
        // Create a container for each filter
        const filterItem = document.createElement('div');
        filterItem.className = 'filter-card';
        
        // Add a preview circle and the name
        filterItem.innerHTML = `
            <div class="filter-circle" style="filter: ${f.value}"></div>
            <span>${f.name}</span>
        `;

        // When clicked, apply it to the main canvas
        filterItem.onclick = () => {
            const canvas = document.getElementById('photo-canvas');
            window.MegaFilterEngine.apply(canvas, f.value);
        };

        tray.appendChild(filterItem);
    });
}

// Call this function when the app starts
window.addEventListener('DOMContentLoaded', createFilterUI);
