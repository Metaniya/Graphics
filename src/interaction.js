import * as THREE from 'three';

let raycaster, mouse, selectedObject, infoPanel, originalColor;

export function initInteraction(scene, camera, renderer) {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  infoPanel = document.getElementById('info-panel');

  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('click', onClick);

  function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (selectedObject !== obj) {
        if (selectedObject) resetHighlight(selectedObject);
        highlight(obj);
        selectedObject = obj;

        infoPanel.style.display = 'block';
        infoPanel.style.left = event.clientX + 10 + 'px';
        infoPanel.style.top = event.clientY + 10 + 'px';
        infoPanel.textContent = obj.name || 'Unknown part';
      }
    } else {
      if (selectedObject) resetHighlight(selectedObject);
      selectedObject = null;
      infoPanel.style.display = 'none';
    }
  }

  function onClick() {
    if (selectedObject) {
      // Briefly scale up for click feedback
      const originalScale = selectedObject.scale.clone();
      selectedObject.scale.multiplyScalar(1.2);
      setTimeout(() => {
        selectedObject.scale.copy(originalScale);
      }, 300);
    }
  }

  function highlight(obj) {
    originalColor = obj.material.color.getHex();
    obj.material.color.setHex(0xffa500); // orange highlight
  }

  function resetHighlight(obj) {
    obj.material.color.setHex(originalColor);
  }
}
