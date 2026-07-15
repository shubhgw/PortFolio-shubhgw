document.addEventListener("DOMContentLoaded", () => {
    // 1. Grab all sections (pages) and the status indicator element
    const pages = document.querySelectorAll('.slide');
    const indicator = document.getElementById('page-indicator');
    const totalPages = pages.length;

    // 2. Configure the Intersection Observer options
    // A threshold of 0.5 means a section must be at least 50% visible 
    // to be considered the "active" page.
    const observerOptions = {
        root: document.querySelector('.deck-container'), // Track scrolling inside the main deck container
        rootMargin: '0px',
        threshold: 0.5 
    };

    // 3. Define the observer callback
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // When a section comes into view (passes the 50% threshold)
            if (entry.isIntersecting) {
                // Find the index of the active section (+1 to make it human-readable)
                const pageIndex = Array.from(pages).indexOf(entry.target) + 1;
                
                // Dynamically update the indicator text
                indicator.textContent = `Page ${pageIndex} / ${totalPages}`;
                
                // Add micro-interaction: subtle scale pop on the indicator when updating
                indicator.style.transform = "scale(1.1) translate(-2px, -2px)";
                indicator.style.boxShadow = "var(--shadow-hover) var(--shadow-hover) 0px var(--clr-black)";
                
                // Revert the pop effect quickly
                setTimeout(() => {
                    indicator.style.transform = "none";
                    indicator.style.boxShadow = "var(--shadow-offset) var(--shadow-offset) 0px var(--clr-black)";
                }, 200);
            }
        });
    };

    // 4. Initialize and attach the observer to each page element
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    pages.forEach(page => {
        observer.observe(page);
    });
});