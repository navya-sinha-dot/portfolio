"use client";

import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
// Types for the book content can be defined locally or ignored since content is null
interface BookContent {
    id: string;
    title: string;
    description: string;
}

interface BookProps {
    title: string;
    color: string;
    index: number;
    type: 'projects' | 'experience' | 'skills' | 'contact';
    content: any;
    onOpen: (id: string | null) => void;
    isOpen: boolean;
    width: number;
    height: number;
    depth: number;
    spacing: number;
}

export const Book: React.FC<BookProps> = ({
    title,
    color,
    index,
    type,
    content,
    onOpen,
    isOpen,
    width,
    height,
    depth,
    spacing
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Precise placement to ensure individual silhouettes
    const xPos = index * spacing - (spacing * 2.5);
    const shelfPos: [number, number, number] = [xPos, height / 2, 0];

    const handleClick = (e: any) => {
        e.stopPropagation();
        onOpen(isOpen ? null : title);
    };

    useFrame(() => {
        if (!groupRef.current) return;
        // Simple forward shift when active
        const targetZ = isOpen ? 1.2 : (hovered ? 0.4 : 0);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);

        // Scale down to 0 when "completely" open (taken by user)
        const targetScale = isOpen ? 0 : 1;
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.15));

        // Tilt slightly when open to show depth
        const targetRotY = isOpen ? -Math.PI * 0.05 : 0;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);
    });

    return (
        <group
            ref={groupRef}
            position={shelfPos}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={handleClick}
        >
            {/* Main Book Body (Z-axis depth) */}
            <mesh position={[0, 0, -depth / 2]}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Spine Overlay (The part facing the user) */}
            <mesh position={[0, 0, 0.01]}>
                <boxGeometry args={[width + 0.01, height + 0.01, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.6} />

                {/* Decorative Bands */}
                <mesh position={[0, height * 0.28, 0.03]}>
                    <boxGeometry args={[width + 0.04, 0.06, 0.04]} />
                    <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, -height * 0.28, 0.03]}>
                    <boxGeometry args={[width + 0.04, 0.06, 0.04]} />
                    <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Vertical Spine Title */}
                <Text
                    position={[0, 0, 0.04]}
                    rotation={[0, 0, -Math.PI / 2]}
                    fontSize={Math.min(width * 0.4, 0.25)}
                    color="#F5F5F3"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title.toUpperCase()}
                </Text>
            </mesh>

            {/* Subtle Page Edge (visible on top/bottom) */}
            <mesh position={[0, height / 2, -depth / 2]}>
                <boxGeometry args={[width * 0.85, 0.02, depth * 0.98]} />
                <meshStandardMaterial color="#F4F1EA" />
            </mesh>
        </group>
    );
};
