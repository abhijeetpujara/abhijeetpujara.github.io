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
            } else {
                // After typing static text, start ETL logs
                setTimeout(startETLLogs, 2000);
            }
        };

        const etlLogs = [
            "Initializing Azure Data Factory pipeline...",
            "Mounting ADLS Gen2 storage [blob.core.windows.net]...",
            "Starting Azure Databricks cluster [Standard_DS3_v2]...",
            "Extracting telemetry from Event Hub...",
            "Running Synapse SQL script: transform_silver_to_gold...",
            "Optimizing Delta Table indexing...",
            "Azure Health: NOMINAL. Region: Central India.",
            "Syncing Data Catalog with Purview...",
            "Ingestion successful: 2.4 TB processed.",
            "Pipeline Status: ARCHIVE COMPLETE."
        ];

        const startETLLogs = () => {
            let logIndex = 0;
            const logContainer = typingElement.parentElement;

            const addLog = () => {
                const logLine = document.createElement('p');
                logLine.style.color = '#10b981';
                logLine.style.margin = '5px 0';
                logLine.style.fontSize = '0.9rem';
                logLine.style.borderLeft = '2px solid #10b981';
                logLine.style.paddingLeft = '10px';
                logLine.style.opacity = '0';
                logLine.style.transition = 'opacity 0.5s ease';
                logLine.textContent = `> [${new Date().toLocaleTimeString()}] ${etlLogs[logIndex]}`;

                logContainer.appendChild(logLine);
                setTimeout(() => logLine.style.opacity = '1', 50);

                // Auto-scroll to bottom
                logContainer.scrollTop = logContainer.scrollHeight;

                // Keep only last 5 logs
                if (logContainer.children.length > 6) {
                    logContainer.removeChild(logContainer.children[1]);
                }

                logIndex = (logIndex + 1) % etlLogs.length;
                setTimeout(addLog, 2500 + Math.random() * 2000);
            };

            addLog();
        };

        // Start typing after a small delay
        setTimeout(type, 1000);
    }

    // --- Infra Widget Dynamic Updates (Azure Theme) ---
    const azureStatus = document.getElementById('azure-status');
    const adfStatus = document.getElementById('adf-status');
    if (azureStatus && adfStatus) {
        setInterval(() => {
            const statuses = ['NOMINAL', 'NOMINAL', 'OPTIMIZING', 'SYNCING'];
            const adfStates = ['ACTIVE', 'ACTIVE', 'RUNNING', 'IDLE'];
            azureStatus.textContent = statuses[Math.floor(Math.random() * statuses.length)];
            adfStatus.textContent = adfStates[Math.floor(Math.random() * adfStates.length)];

            // Randomly change status color to show "activity"
            azureStatus.style.color = azureStatus.textContent === 'NOMINAL' ? 'var(--accent-color)' : '#fbbf24';
        }, 4000);
    }
});
