/**
 * Digital Wave Three.js Background
 * Features: Undulating 3D grid of points simulating a "Data Ocean".
 * Theme-aware and mouse-responsive.
 */

class DigitalWaveBackground {
    constructor() {
        this.canvas = document.getElementById('data-particles-canvas');
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.points = null;
        this.mouse = new THREE.Vector2(0, 0);
        this.targetMouse = new THREE.Vector2(0, 0);
        this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        this.AMOUNTX = 100;
        this.AMOUNTY = 100;
        this.SEPARATION = 60;
        this.count = 0;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.createWave();
        this.camera.position.z = 1000;
        this.camera.position.y = 400;

        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.updateColors();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        this.animate();
    }

    createWave() {
        const numParticles = this.AMOUNTX * this.AMOUNTY;
        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);
        const colors = new Float32Array(numParticles * 3);

        const mainColor = new THREE.Color(this.isDark ? 0x38bdf8 : 0x004a99);

        let i = 0, j = 0;
        for (let ix = 0; ix < this.AMOUNTX; ix++) {
            for (let iy = 0; iy < this.AMOUNTY; iy++) {
                positions[i] = ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2; // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2; // z

                colors[i] = mainColor.r;
                colors[i + 1] = mainColor.g;
                colors[i + 2] = mainColor.b;

                scales[j] = 1;
                i += 3;
                j++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
    }

    updateColors() {
        this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = new THREE.Color(this.isDark ? 0x38bdf8 : 0x004a99);
        const colors = this.points.geometry.attributes.color.array;

        for (let i = 0; i < colors.length; i += 3) {
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
        }
        this.points.geometry.attributes.color.needsUpdate = true;
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(e) {
        this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        this.targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const positions = this.points.geometry.attributes.position.array;
        const scales = this.points.geometry.attributes.scale.array;

        let i = 0, j = 0;
        for (let ix = 0; ix < this.AMOUNTX; ix++) {
            for (let iy = 0; iy < this.AMOUNTY; iy++) {
                positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 50) +
                    (Math.sin((iy + this.count) * 0.5) * 50);

                scales[j] = (Math.sin((ix + this.count) * 0.3) + 1) * 8 +
                    (Math.sin((iy + this.count) * 0.5) + 1) * 8;

                i += 3;
                j++;
            }
        }

        this.points.geometry.attributes.position.needsUpdate = true;
        this.points.geometry.attributes.scale.needsUpdate = true;

        this.count += 0.05;

        // Camera movement based on mouse
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.camera.position.x += (this.mouse.x * 500 - this.camera.position.x) * 0.05;
        this.camera.position.z += (1000 + this.mouse.y * 500 - this.camera.position.z) * 0.05;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new DigitalWaveBackground();
    } else {
        const checkThree = setInterval(() => {
            if (typeof THREE !== 'undefined') {
                new DigitalWaveBackground();
                clearInterval(checkThree);
            }
        }, 100);
    }
});
