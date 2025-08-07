'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const InteractiveTree = () => {
  const mountRef = useRef(null);
  const leavesRef = useRef([]);
  let currentAngle = 0;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 5), trunkMaterial);
    trunk.position.y = 2.5;
    treeGroup.add(trunk);

    const leafGeometry = new THREE.SphereGeometry(0.5, 16, 16);

    for (let y = 1; y <= 5; y += 0.8) {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(Math.cos(angle) * 1.2, y, Math.sin(angle) * 1.2);
        leaf.rotation.y = angle;
        treeGroup.add(leaf);
        leavesRef.current.push(leaf);
      }
    }

    camera.position.set(0, 5, 10);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleClick = () => {
      currentAngle += Math.PI / 9;
      leavesRef.current.forEach((leaf, index) => {
        leaf.visible = index % 36 >= currentAngle / (Math.PI / 18);
      });
    };

    window.addEventListener('click', handleClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default InteractiveTree;
