const hamburger = document.querySelector(".hamburger");
const navLinks = document.getElementById("nav-links");

function toggleMenu(){
hamburger.classList.toggle("active");
navLinks.classList.toggle("active");
}

function order(){
window.open("https://wa.me/234XXXXXXXXXX");
}

// THREE JS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector('#bg'),
alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.BufferGeometry();
const count = 400;

const positions = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++){
positions[i] = (Math.random() - 0.5) * 5;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ size: 0.02 });

const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 2;

function animate(){
requestAnimationFrame(animate);
particles.rotation.y += 0.001;
renderer.render(scene, camera);
}

animate();