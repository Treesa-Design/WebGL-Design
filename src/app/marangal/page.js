'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function InteractiveFractalForest() {
  const mountRef = useRef(null);
  const forestGroupRef = useRef();
  const animationFrameRef = useRef();
  const [depth] = useState(4);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe8f5e9);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 8, 20);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    // Lights
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xc8e6c9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Forest group
    const forestGroup = new THREE.Group();
    scene.add(forestGroup);
    forestGroupRef.current = forestGroup;

    // Reused geometries & materials
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
    const branchMat = new THREE.MeshStandardMaterial({ color: 0x6b3f1b });
    const leafMatDark = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
    const leafMatLight = new THREE.MeshStandardMaterial({ color: 0x9ccc65 });

    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.6, 4.5, 12);
    const branchGeo = new THREE.CylinderGeometry(0.12, 0.25, 1, 10);
    const childBranchGeo = new THREE.CylinderGeometry(0.072, 0.12, 1, 8);
    const leafGeo = new THREE.IcosahedronGeometry(0.06, 0);

    // Function to create leaf cluster (merged)
    function makeLeafCluster(useLight) {
      const group = new THREE.Group();
      const mat = useLight ? leafMatLight : leafMatDark;
      const count = 6;
      for (let i = 0; i < count; i++) {
        const leaf = new THREE.Mesh(leafGeo, mat);
        leaf.position.set((Math.random() - 0.5) * 0.15, Math.random() * 0.15, (Math.random() - 0.5) * 0.15);
        leaf.scale.setScalar(0.8);
        group.add(leaf);
      }
      return group;
    }

    function createBranch(group, depthLevel, length, radius, useLightLeaves) {
      const branch = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.6, radius, length, 8), branchMat);
      branch.position.y = length / 2;
      const branchHolder = new THREE.Group();
      branchHolder.add(branch);

      if (depthLevel <= 1) {
        const leaves = makeLeafCluster(useLightLeaves);
        leaves.position.y = length;
        branchHolder.add(leaves);
      }

      group.add(branchHolder);

      if (depthLevel > 0) {
        const splits = 3;
        for (let i = 0; i < splits; i++) {
          const child = new THREE.Group();
          child.position.y = length;
          child.rotation.y = (i / splits) * Math.PI * 2;
          child.rotation.z = -(0.3 + Math.random() * 0.5);
          createBranch(child, depthLevel - 1, length * 0.6, radius * 0.6, useLightLeaves);
          branchHolder.add(child);
        }
      }
    }

    function buildTree(x, z, useLightLeaves) {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 2.25;
      tree.add(trunk);

      for (let i = 0; i < 6; i++) {
        const holder = new THREE.Group();
        holder.position.y = 3 + Math.random();
        holder.rotation.y = (i / 6) * Math.PI * 2;
        holder.rotation.z = -0.3 - Math.random() * 0.3;

        const branchBase = new THREE.Mesh(branchGeo, branchMat);
        branchBase.position.y = 0.5;
        holder.add(branchBase);

        createBranch(holder, depth, 1, 0.18, useLightLeaves);
        tree.add(holder);
      }

      forestGroup.add(tree);
    }

    // Create forest
    for (let i = 0; i < 20; i++) {
      buildTree((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, Math.random() > 0.5);
    }

    // Animate
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameRef.current);
      controls.dispose();
      renderer.dispose();

      // Dispose geometries and materials
      [trunkGeo, branchGeo, childBranchGeo, leafGeo, groundGeo].forEach((g) => g.dispose());
      [trunkMat, branchMat, leafMatDark, leafMatLight, groundMat].forEach((m) => m.dispose());

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [depth]);

  return <div style={{ width: '100vw', height: '100vh' }} ref={mountRef} />;
}
