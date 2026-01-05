'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function createFloatingField({ count = 160, radius = 8 }) {
  const geo = new THREE.CapsuleGeometry(0.12, 0.42, 6, 12);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    metalness: 0.3,
    roughness: 0.4,
    emissive: new THREE.Color(0xf5f5f5),
    emissiveIntensity: 0.15,
  });

  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const dummy = new THREE.Object3D();
  const seeds = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.25 + Math.random() * 0.75);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = (Math.random() - 0.5) * radius * 0.9;
    const z = r * Math.sin(phi) * Math.sin(theta);

    const s = 0.6 + Math.random() * 1.6;

    dummy.position.set(x, y, z);
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    seeds[i * 4 + 0] = x;
    seeds[i * 4 + 1] = y;
    seeds[i * 4 + 2] = z;
    seeds[i * 4 + 3] = Math.random() * 10;
  }

  mesh.instanceMatrix.needsUpdate = true;

  return { mesh, seeds };
}

export function createGlowPlane() {
  const geo = new THREE.PlaneGeometry(40, 40, 1, 1);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.08,
    depthWrite: false,
  });
  const plane = new THREE.Mesh(geo, mat);
  plane.position.set(0, -2.5, -6);
  plane.rotation.x = -Math.PI * 0.35;
  return plane;
}
