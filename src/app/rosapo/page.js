'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Link from 'next/link';
import DismissableMessage from '../components/DismissableMessage';
const InteractiveRose = () => {
  const mountRef = useRef(null);
  const petalMaterialRef = useRef(new THREE.MeshStandardMaterial({ color: 0xffc0cb })); // Light pink default
  const [selectedColor, setSelectedColor] = useState('lightpink');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
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
      const newAvailableHeight = window.innerHeight - navHeight;
      camera.aspect = window.innerWidth / newAvailableHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, newAvailableHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#1a0a1a', overflow: 'hidden' }}>
      {/* Multi-Color Animated Background */}
      <div style={{ position: 'fixed', inset: '0', pointerEvents: 'none' }}>
        {/* Dynamic mouse-following gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            opacity: 0.4,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 105, 180, 0.3) 0%, rgba(255, 20, 147, 0.2) 25%, rgba(255, 182, 193, 0.1) 50%, transparent 70%)`,
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
          background: 'linear-gradient(45deg, #ff69b4, #ff1493, #ffb6c1)',
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
          background: 'linear-gradient(45deg, #ff1493, #dc143c, #ff6347)',
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
          background: '#ff69b4',
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
          background: '#ff1493',
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
          background: '#ffb6c1',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '4s'
        }} />
      </div>
      

      <DismissableMessage 
        title="Interactive Rose"
        description="Change the rose color using the controls below."
        gradient="linear-gradient(45deg, #ff69b4, #ff1493)"
        borderColor="rgba(255, 105, 180, 0.3)"
        position={{ top: '100px', left: '2rem' }}
      />

      {/* Color Selector */}
      <div style={{
        position: 'absolute',
        top: '200px',
        left: '2rem',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 105, 180, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        color: 'white',
        animation: `${isLoaded ? 'fade-in 1s ease-out' : 'none'}`,
        opacity: isLoaded ? 1 : 0
      }}>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', opacity: 0.9 }}>Rose Color:</p>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          style={{ 
            padding: '8px', 
            fontSize: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: '1px solid rgba(255, 105, 180, 0.5)',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#ff69b4';
            e.target.style.boxShadow = '0 0 10px rgba(255, 105, 180, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 105, 180, 0.5)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="magenta">Magenta</option>
          <option value="lightpink">Light Pink</option>
        </select>
      </div>

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
export default InteractiveRose;
