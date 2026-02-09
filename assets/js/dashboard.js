/**
 * System Dashboard Animation
 * Simulates real-time data metrics
 */

document.addEventListener('DOMContentLoaded', () => {
    const recordsRate = document.getElementById('records-rate');
    const uptime = document.getElementById('uptime');

    if (!recordsRate || !uptime) return;

    // Animate records rate
    setInterval(() => {
        const rate = Math.floor(Math.random() * 500) + 1000;
        recordsRate.textContent = rate.toLocaleString();
    }, 2000);

    // Animate uptime (subtle variation)
    setInterval(() => {
        const uptimeValue = (99.5 + Math.random() * 0.5).toFixed(1);
        uptime.textContent = `${uptimeValue}%`;
    }, 5000);
});
