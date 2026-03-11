// filters-extended.js
const MegaFilterEngine = {
    // This generates the list of 100+ filters dynamically
    getFilterList: function() {
        let filters = [];
        const styles = ['Film', 'Retro', 'Aqua', 'Glow', 'Deep', 'Cyber', 'Sunny', 'Moody'];
        
        for (let i = 1; i <= 110; i++) {
            let hue = (i * 25) % 360;   // Changes the color tone
            let sat = 60 + (i % 140);    // Changes how colorful it is
            let con = 90 + (i % 50);     // Changes the sharpness
            let bright = 95 + (i % 20);  // Changes the light
            
            filters.push({
                id: i,
                name: `${styles[i % styles.length]} ${i}`,
                value: `hue-rotate(${hue}deg) saturate(${sat}%) contrast(${con}%) brightness(${bright}%)`
            });
        }
        return filters;
    },

    // This function actually paints the filter on your canvas
    apply: function(canvas, filterString) {
        const ctx = canvas.getContext('2d');
        ctx.filter = filterString;
        
        // Use the global image variable (ensure your upload script saves the image to window.loadedImg)
        if (window.loadedImg) {
            ctx.drawImage(window.loadedImg, 0, 0, canvas.width, canvas.height);
        }
    }
};

window.MegaFilterEngine = MegaFilterEngine;
