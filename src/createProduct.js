import * as THREE from 'three';

export function createProduct() {
  const group = new THREE.Group();

  const material = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.7, metalness: 0.3 });

  // Seat (box)
  const seatGeometry = new THREE.BoxGeometry(3, 0.3, 3);
  const seat = new THREE.Mesh(seatGeometry, material);
  seat.name = "Seat";
  seat.position.set(0, 2, 0);
  group.add(seat);

  // Backrest (box)
  const backrestGeometry = new THREE.BoxGeometry(3, 3, 0.3);
  const backrest = new THREE.Mesh(backrestGeometry, material);
  backrest.name = "Backrest";
  backrest.position.set(0, 3.5, -1.35);
  group.add(backrest);

  // Legs (cylinders)
  const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 16);
  const legPositions = [
    [-1.2, 1, 1.2],
    [1.2, 1, 1.2],
    [-1.2, 1, -1.2],
    [1.2, 1, -1.2]
  ];

  legPositions.forEach((pos, i) => {
    const leg = new THREE.Mesh(legGeometry, material);
    leg.name = `Leg ${i + 1}`;
    leg.position.set(...pos);
    group.add(leg);
  });

  // Center group at origin
  group.position.set(0, 0, 0);

  return group;
}
