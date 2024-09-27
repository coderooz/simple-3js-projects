import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js'


// Set up renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set up camera
const fav = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fav, aspect, near, far);
camera.position.z = 2;

// Create a scene
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;


// Create geometry and material
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0x00ccff,
    flatShading: true
});


const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const hemLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemLight);

const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
const wirefra = new THREE.Mesh(geo, wireMat)
mesh.add(wirefra);

// Animation loop for continuous rendering
function animate() {
    requestAnimationFrame(animate);

    // Add some rotation to the mesh
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    // Render the scene
    renderer.render(scene, camera);
    controls.update();
}


animate();





