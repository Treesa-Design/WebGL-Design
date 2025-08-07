'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const InteractiveRose = () => {
  const mountRef = useRef(null);
  const petalMaterialRef = useRef(new THREE.MeshStandardMaterial({ color: 0xffc0cb })); // Light pink default
  const [selectedColor, setSelectedColor] = useState('lightpink');
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x888888));
    const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const darkGreenMaterial = new THREE.MeshStandardMaterial({ color: 0x006400 });
    const roseGroup = new THREE.Group();
    scene.add(roseGroup);
    const bud = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), petalMaterialRef.current);
    bud.position.y = 2.5;
    roseGroup.add(bud);
    const petalCount = 12;
    const petalGeometry = new THREE.ConeGeometry(0.3, 0.7, 30);
    const petals = [];
    for (let i = 0; i < petalCount; i++) {
      const petal = new THREE.Mesh(petalGeometry, petalMaterialRef.current);
      const angle = (i / petalCount) * Math.PI * 2;
      petal.position.set(Math.cos(angle) * 0.3, 2.5, Math.sin(angle) * 0.3);
      petal.rotation.set(Math.PI / 2.3, 0, angle);
      roseGroup.add(petal);
      petals.push(petal);
    }
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3), greenMaterial);
    stem.position.y = 1;
    roseGroup.add(stem);
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
    const sepalGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);
    for (let i = 0; i < 3; i++) {
      const sepal = new THREE.Mesh(sepalGeometry, darkGreenMaterial);
      const angle = (i / 3) * Math.PI * 2;
      sepal.position.set(Math.cos(angle) * 0.1, 2.25, Math.sin(angle) * 0.1);
      sepal.rotation.set(-Math.PI / 3, 0, angle);
      roseGroup.add(sepal);
    }
    camera.position.set(0, 2.5, 5);
    controls.update();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  // Handle petal color change
  useEffect(() => {
    const colorMap = {
      red: 0xff0000,
      yellow: 0xffff00,
      magenta: 0xff00ff,
      lightpink: 0xffc0cb,
    };
    if (petalMaterialRef.current) {
      petalMaterialRef.current.color.setHex(colorMap[selectedColor]);
    }
  }, [selectedColor]);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="magenta">Magenta</option>
        </select>
      </div>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
};
export default InteractiveRose;
