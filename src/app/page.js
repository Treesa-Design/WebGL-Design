'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const InteractiveRose = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for mouse drag
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x888888));

    // Materials
    const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Light pink
    const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const darkGreenMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });

    // Rose Group (for rotating entire flower)
    const roseGroup = new THREE.Group();
    scene.add(roseGroup);

    // Bud
    const bud = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), petalMaterial);
    bud.position.y = 2.5;
    roseGroup.add(bud);

    // Petals
    const petalCount = 8; // Change to 6 or 8
    const petalGeometry = new THREE.ConeGeometry(0.3, 0.7, 30); // Bigger petals

    for (let i = 0; i < petalCount; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      const angle = (i / petalCount) * Math.PI * 2;

      petal.position.set(Math.cos(angle) * 0.3, 2.5, Math.sin(angle) * 0.3); // Spread petals out
      petal.rotation.set(Math.PI / 2.3, 0, angle); // Slight tilt
      roseGroup.add(petal);
    }

    // Stem
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3), greenMaterial);
    stem.position.y = 1;
    roseGroup.add(stem);

    // Leaves
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.4, 0.3, 0.4, 0.6, 0, 0.8);
    leafShape.bezierCurveTo(-0.4, 0.6, -0.4, 0.3, 0, 0);

    const leafGeometry = new THREE.ShapeGeometry(leafShape);
    const leaf1 = new THREE.Mesh(leafGeometry, darkGreenMaterial);
    leaf1.rotation.x = -Math.PI / 2;
    leaf1.rotation.z = Math.PI / 4;
    leaf1.position.set(0.3, 1.2, 0);

    const leaf2 = leaf1.clone();
    leaf2.rotation.z = -Math.PI / 4;
    leaf2.position.set(-0.3, 0.8, 0);

    roseGroup.add(leaf1);
    roseGroup.add(leaf2);

    // Sepals
    const sepalGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
    for (let i = 0; i < 3; i++) {
      const sepal = new THREE.Mesh(sepalGeometry, darkGreenMaterial);
      const angle = (i / 3) * Math.PI * 2;
      sepal.position.set(Math.cos(angle) * 0.1, 2.25, Math.sin(angle) * 0.1);
      sepal.rotation.set(-Math.PI / 3, 0, angle);
      roseGroup.add(sepal);
    }

    // Camera
    camera.position.set(0, 2.5, 5);
    controls.update();

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default InteractiveRose;
