import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js"
import { GUI } from "dat.gui";

const sceneA = new THREE.Scene()
sceneA.background = new THREE.Color(0x123456)

const sceneB = new THREE.Scene()
sceneB.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png')

const sceneC = new THREE.Scene()
sceneC.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
//sceneC.backgroundBlurriness = 0.5

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({ wireframe: true });

const cubeA = new THREE.Mesh(geometry, material);
const cubeB = new THREE.Mesh(geometry, material);
const cubeC = new THREE.Mesh(geometry, material);

sceneA.add(cubeA);
sceneB.add(cubeB);
sceneC.add(cubeC);

let activeScene = sceneA
let activeCube = cubeA
const setScene = {
  sceneA: () => {
    activeScene = sceneA
    activeCube = cubeA
  },
  sceneB: () => {
    activeScene = sceneB
    activeCube = cubeB
  },
  sceneC: () => {
    activeScene = sceneC
    activeCube = cubeC
  },
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
cubeFolder.add(activeCube.rotation, "x", 0, Math.PI * 2)
cubeFolder.add(activeCube.rotation, "y", 0, Math.PI * 2)
cubeFolder.add(activeCube.rotation, "z", 0, Math.PI * 2)
cubeFolder.open()

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 20)
cameraFolder.open()

const sceneFolder = gui.addFolder("Scene")
sceneFolder.add(setScene, 'sceneA').name('Scene A')
sceneFolder.add(setScene, 'sceneB').name('Scene B')
sceneFolder.add(setScene, 'sceneC').name('Scene C')

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(activeScene, camera);
  stats.update()
}

animate();
