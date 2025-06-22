import './style.css';

import { initScene, getScene, getCamera, getRenderer, getControls } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { initInteraction } from './interaction.js';
import { initCameraAnimation } from './cameraAnimation.js';

initScene();

const scene = getScene();
const camera = getCamera();
const renderer = getRenderer();
const controls = getControls();

const product = createProduct();
scene.add(product);

addLighting(scene);

initInteraction(scene, camera, renderer);

const cameraAnim = initCameraAnimation(controls, camera, product.position);

let lastTime = 0;

function animate(time = 0) {
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  cameraAnim.update(deltaTime);

  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
