'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Link from 'next/link';
import DismissableMessage from '../components/DismissableMessage';
const InteractiveTree = () => {
  const mountRef = useRef(null);
  const leavesRef = useRef([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  let currentAngle = 0;
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const scene = new THREE.Scene();
    const navHeight = 80;
    const availableHeight = window.innerHeight - navHeight;
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / availableHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, availableHeight);
    renderer.setClearColor(0xfdfcf8, 0.8);
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
      const newAvailableHeight = window.innerHeight - navHeight;
      camera.aspect = window.innerWidth / newAvailableHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, newAvailableHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0f0f23', overflow: 'hidden' }}>
      {/* Multi-Color Animated Background */}
      <div style={{ position: 'fixed', inset: '0', pointerEvents: 'none' }}>
        {/* Dynamic mouse-following gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.4,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(80, 200, 120, 0.3) 0%, rgba(34, 139, 34, 0.2) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)`,
            transition: 'background 0.5s ease-out'
          }}
        />
        
        {/* Animated orbs */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '384px',
          height: '384px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.3,
          background: 'linear-gradient(45deg, #50c878, #228b22, #90ee90)',
          animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '75%',
          right: '25%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          filter: 'blur(48px)',
          opacity: 0.25,
          background: 'linear-gradient(45deg, #228b22, #32cd32, #006400)',
          animation: 'float 20s ease-in-out infinite',
          animationDelay: '3s'
        }} />
        
        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '40px',
          width: '12px',
          height: '12px',
          background: '#50c878',
          borderRadius: '50%',
          opacity: 0.8,
          animation: 'float 15s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '160px',
          right: '80px',
          width: '8px',
          height: '8px',
          background: '#228b22',
          borderRadius: '50%',
          opacity: 0.7,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '2s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '160px',
          left: '80px',
          width: '16px',
          height: '16px',
          background: '#90ee90',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '4s'
        }} />
      </div>
      

      <DismissableMessage 
        title="Maram Tree Demo"
        description="Click anywhere to make leaves disappear gradually"
        gradient="linear-gradient(45deg, #22c55e, #16a34a)"
        borderColor="rgba(34, 197, 94, 0.3)"
        position={{ top: '100px', left: '2rem' }}
      />

      <div ref={mountRef} style={{ 
        width: '100vw', 
        height: 'calc(100vh - 80px)', 
        marginTop: '80px',
        background: 'rgba(253, 252, 248, 0.9)', 
        borderRadius: '12px 12px 0 0' 
      }} />
    </div>
  );
};
export default InteractiveTree;
