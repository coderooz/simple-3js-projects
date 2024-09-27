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

const loader = new THREE.TextureLoader();

// Create geometry and material
const geo = new THREE.IcosahedronGeometry(1.0, 12);
const mat = new THREE.MeshStandardMaterial({
    map: loader.load('./resources/earthmap.jpg')
});


const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const hemLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemLight);

// const wireMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
// const wirefra = new THREE.Mesh(geo, wireMat)
// mesh.add(wirefra);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Animation loop for continuous rendering
function animate() {
    requestAnimationFrame(animate);

    // Add some rotation to the mesh
    mesh.rotation.x += 0.0;
    mesh.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
    controls.update();
}


animate();


function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize, false);



