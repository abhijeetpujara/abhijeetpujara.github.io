/**
 * Portfolio Enhancements JS
 * Includes: Theme Toggle, Typing Animation
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Enhancements JS loaded");

    // --- Theme Toggle Logic ---
    const getTheme = () => {
        try {
            return localStorage.getItem('theme') || 'dark'; // Changed default to 'dark'
        } catch (e) {
            console.warn("localStorage not accessible:", e);
            return 'dark'; // Changed fallback to 'dark'
        }
    };

    const setTheme = (theme) => {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn("Could not save theme to localStorage:", e);
        }
    };

    const toggleTheme = () => {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
        updateThemeIcon(newTheme);
        console.log("Theme toggled to:", newTheme);
    };

    const updateThemeIcon = (theme) => {
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun'; // Direct class replacement for reliability
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    };

    // Initialize Theme
    const savedTheme = getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Add Theme Toggle Button listener
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.onclick = (e) => {
            e.preventDefault();
            toggleTheme();
            return false;
        };
        console.log("Theme toggle button listener attached via onclick");
    } else {
        console.error("Theme toggle button not found");
    }

    // --- Typing Animation Logic ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text') || "";
        let index = 0;
        typingElement.textContent = "";

        const type = () => {
            if (index < textToType.length) {
                typingElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        };

        // Start typing after a small delay
        setTimeout(type, 1000);
    }
});
