import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  size: number;
  color: string;
}

function Node({ position, size, color }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      meshRef.current.scale.setScalar(hovered ? scale * 1.3 : scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? '#00BCF2' : color}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function Connection({ start, end, color }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);
  
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }))} />
  );
}

function NetworkField() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate nodes
  const nodes = useMemo(() => {
    const nodeArray: { position: [number, number, number]; size: number; color: string }[] = [];
    const count = 60;
    
    for (let i = 0; i < count; i++) {
      nodeArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ],
        size: Math.random() * 0.08 + 0.03,
        color: Math.random() > 0.7 ? '#00BCF2' : '#0078D4',
      });
    }
    return nodeArray;
  }, []);

  // Generate connections
  const connections = useMemo(() => {
    const connArray: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    const maxDistance = 3;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        );
        
        if (dist < maxDistance) {
          connArray.push({
            start: nodes[i].position,
            end: nodes[j].position,
            color: '#0078D4',
          });
        }
      }
    }
    return connArray;
  }, [nodes]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
      
      // Mouse parallax
      groupRef.current.rotation.x += mousePos.y * 0.05;
      groupRef.current.rotation.y += mousePos.x * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Node key={i} {...node} />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} {...conn} />
      ))}
    </group>
  );
}

export default function NetworkBackground() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if touch device - disable on mobile
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    // Use IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const canvas = document.querySelector('canvas');
    if (canvas) observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-0">
        {/* Fallback grid background for mobile */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 120, 212, 0.05) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <NetworkField />
      </Canvas>
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.8) 100%)',
        }}
      />
    </div>
  );
}
