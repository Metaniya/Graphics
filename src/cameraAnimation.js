let autoRotate = true;
let lastUserInteraction = 0;

export function initCameraAnimation(controls, camera, target) {
  // target is THREE.Vector3 for the product center (usually (0,0,0))
  const radius = camera.position.distanceTo(target);
  let angle = 0;

  window.addEventListener('mousedown', () => {
    autoRotate = false;
    lastUserInteraction = performance.now();
  });

  window.addEventListener('touchstart', () => {
    autoRotate = false;
    lastUserInteraction = performance.now();
  });

  function update(deltaTime) {
    if (!autoRotate) {
      // If 5 seconds passed since last user interaction, re-enable auto-rotate
      if (performance.now() - lastUserInteraction > 5000) {
        autoRotate = true;
      } else {
        return;
      }
    }
    angle += deltaTime * 0.3; // rotation speed radians/sec

    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(target);
  }

  return { update };
}
