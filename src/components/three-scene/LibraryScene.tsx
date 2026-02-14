"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Html, Image, useScroll, ScrollControls, Scroll } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookshelf } from './Bookshelf';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { ProjectArchive } from '../ui/ProjectArchive';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Steam: React.FC<{ position: [number, number, number]; opacity: number }> = ({ position, opacity }) => {
    const group = React.useRef<THREE.Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        group.current.children.forEach((child, i) => {
            child.position.y += 0.01 + Math.sin(state.clock.elapsedTime + i) * 0.005;
            if (child.position.y > 0.5) child.position.y = 0;
            child.scale.setScalar(THREE.MathUtils.lerp(0.1, 0.3, child.position.y * 2));
        });
    });

    return (
        <group ref={group} position={position}>
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[Math.random() * 0.2 - 0.1, Math.random() * 0.5, 0]}>
                    <circleGeometry args={[0.1, 16]} />
                    <meshBasicMaterial color="#FFFFFF" transparent opacity={opacity * 0.3} />
                </mesh>
            ))}
        </group>
    );
};

const StillLifeIntroduction: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
    return (
        <group>
            {/* The Surface (Marble Table) - Shifted Left */}
            <mesh position={[-2.5, -2, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 0.4, 6]} />
                <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.05} />
            </mesh>

            {/* Main Workspace (Shifted Left) */}
            <group position={[-2.5, -0.5, 0]}>
                {/* 3D Laptop */}
                <group position={[0, -1.2, -0.5]}>
                    <mesh castShadow>
                        <boxGeometry args={[3, 0.1, 2]} />
                        <meshStandardMaterial color="#D1D1CB" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 1, -1]} rotation={[-Math.PI / 10, 0, 0]} castShadow>
                        <boxGeometry args={[3, 2, 0.08]} />
                        <meshStandardMaterial color="#1A2A3A" metalness={0.5} roughness={0.1} />
                        <pointLight position={[0, 0, 0.2]} intensity={0.5} color="#C5A059" />
                    </mesh>
                </group>

                {/* Leather Bound Book */}
                <group position={[-2.5, -1.35, 1]} rotation={[0, 0.3, 0]}>
                    <mesh castShadow position={[0, 0, 0]}>
                        <boxGeometry args={[1.5, 0.2, 2.2]} />
                        <meshStandardMaterial color="#1F2A3A" roughness={0.6} />
                    </mesh>
                    <mesh position={[0, 0.15, 0]}>
                        <boxGeometry args={[1.4, 0.1, 2.1]} />
                        <meshStandardMaterial color="#FCFAF5" roughness={0.9} />
                    </mesh>
                </group>

                {/* Ceramic Mug */}
                <group position={[2.5, -1.5, 1]} rotation={[0, -0.2, 0]}>
                    <mesh position={[0, 0.5, 0]} castShadow>
                        <cylinderGeometry args={[0.4, 0.35, 0.8, 32]} />
                        <meshStandardMaterial color="#FCFAF5" roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.85, 0]}>
                        <cylinderGeometry args={[0.34, 0.34, 0.05, 32]} />
                        <meshStandardMaterial color="#3D2B1F" roughness={0.1} />
                    </mesh>
                    <mesh position={[0.5, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <torusGeometry args={[0.25, 0.05, 12, 24, Math.PI]} />
                        <meshStandardMaterial color="#FCFAF5" roughness={0.2} />
                    </mesh>
                    <Steam position={[0, 1, 0]} opacity={1 - (scrollOffset * 2)} />
                </group>
            </group>

            {/* Profile Picture (Floating Frame on Right - Not on Table) */}
            <group position={[5, -0.2, 0]} rotation={[0, -0.4, 0]}>
                <mesh position={[0, 1, 0.02]} castShadow>
                    <boxGeometry args={[3, 4, 0.1]} />
                    <meshStandardMaterial color="#1A2A3A" />
                </mesh>
                <group position={[0, 1, 0.08]}>
                    <Image
                        url="/girl.png"
                        scale={[2.8, 3.8]}
                        transparent
                        opacity={1 - scrollOffset * 2}
                    />
                </group>
            </group>

            {/* Name/Intro Text - Positioned above the table area */}
            <Html position={[-2.5, 1.2, 0]} center transform distanceFactor={10}>
                <div className="w-[800px] text-center select-none pointer-events-none flex flex-col items-center">
                    <h1 className="text-3xl font-serif text-[#0D1C29] mb-4 uppercase tracking-[0.3em] opacity-90 leading-tight"
                        style={{ opacity: 1 - scrollOffset * 2.5, transform: `translateY(${scrollOffset * -40}px)` }}>
                        Navya Sinha
                    </h1>
                    <div className="h-[1px] w-32 bg-[#C5A059] mb-4 opacity-40" style={{ opacity: 1 - scrollOffset * 2.5 }} />
                    {/* <p className="text-xs font-sans text-[#1A2A3A]/60 uppercase tracking-[0.8em] font-small"
                        style={{ opacity: 1 - scrollOffset * 3.5 }}>
                        Crafting narratives through code & design
                    </p> */}
                </div>
            </Html>
        </group>
    );
};

const ScrollScene: React.FC<{
    openBookId: string | null;
    setOpenBookId: (id: string | null) => void;
    setActiveArchive: (type: any) => void;
}> = ({ openBookId, setOpenBookId, setActiveArchive }) => {
    const scroll = useScroll();
    const scene3DRef = React.useRef<any>(null);
    const shelfRef = React.useRef<any>(null);

    useFrame((state) => {
        const offset = scroll.offset; // 0 to 1

        if (scene3DRef.current) {
            // Workspace exit animation (tighter movement)
            const yMove = THREE.MathUtils.lerp(0, 8, offset);
            const zMove = THREE.MathUtils.lerp(0, -8, offset);
            scene3DRef.current.position.y = yMove;
            scene3DRef.current.position.z = zMove;

            // Fades out and shrinks much faster
            const exitScale = offset > 0.3 ? THREE.MathUtils.lerp(1, 0, (offset - 0.3) * 5) : 1;
            scene3DRef.current.scale.setScalar(exitScale);

            // Hide completely once it's small enough or scrolled past
            scene3DRef.current.visible = exitScale > 0.001;
        }

        if (shelfRef.current) {
            // Shelf entry animation (starts closer, less gap)
            shelfRef.current.position.y = THREE.MathUtils.lerp(-8, 0, offset);
            shelfRef.current.position.z = THREE.MathUtils.lerp(-8, 0, offset);
            shelfRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 0.7, offset));
            shelfRef.current.rotation.x = THREE.MathUtils.lerp(0.3, 0, offset);
        }
    });

    return (
        <>
            <group ref={scene3DRef} position={[0, 0, 0]}>
                <StillLifeIntroduction scrollOffset={scroll.offset} />
            </group>

            <group ref={shelfRef} position={[0, -12, 0]}>
                <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
                    <Bookshelf
                        openBookId={openBookId}
                        onBookToggle={setOpenBookId}
                        onOpenArchive={(type) => setActiveArchive(type as any)}
                    />
                </Float>
            </group>
        </>
    );
};

export const LibraryScene: React.FC = () => {
    const [activeArchive, setActiveArchive] = React.useState<"projects" | "experience" | "skills" | "about" | "hobbies" | "contact" | null>(null);
    const [openBookId, setOpenBookId] = React.useState<string | null>(null);

    const handleCloseArchive = () => {
        setActiveArchive(null);
        setOpenBookId(null);
    };

    return (
        <div className="w-full h-screen bg-[#F5F5F3] overflow-hidden relative font-sans">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Real Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}
            />

            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.6)_100%)]" />

            {/* Top UI Elements */}
            <div className="absolute top-10 left-12 z-20 flex flex-col gap-1 pointer-events-none group">
                <h1 className="text-3xl font-serif text-[#1A2A3A] tracking-[0.3em] uppercase leading-none italic opacity-90 transition-opacity">My Archive</h1>
                <div className="h-[2px] w-32 bg-[#C5A059] origin-left" />
                <span className="text-[10px] text-[#1A2A3A]/90 uppercase tracking-[0.4em] mt-2 font-serif italic">Digital Portfolio</span>
            </div>

            <Canvas shadows dpr={[1, 2]} className="absolute inset-0 z-10">
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={27} />

                {/* Modern High-Key Lighting */}
                <ambientLight intensity={0.45} />
                <spotLight
                    position={[10, 20, 10]}
                    angle={0.2}
                    penumbra={1}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <directionalLight position={[3, 6, 6]} intensity={1.1} color="#FFFFFF" />

                <Suspense fallback={<Html center><div className="text-[#1A2A3A] font-serif italic animate-pulse tracking-widest uppercase text-xs text-center">Opening Records...</div></Html>}>
                    <ScrollControls pages={3} damping={0.2}>
                        <ScrollScene
                            openBookId={openBookId}
                            setOpenBookId={setOpenBookId}
                            setActiveArchive={setActiveArchive}
                        />
                        <Environment preset="city" />
                    </ScrollControls>
                </Suspense>

                <EffectComposer multisampling={4}>
                    <Bloom luminanceThreshold={1.2} intensity={0.5} levels={9} mipmapBlur />
                    <Vignette eskil={false} offset={0.1} darkness={0.2} />
                </EffectComposer>
            </Canvas>

            <AnimatePresence>
                {activeArchive && (
                    <ProjectArchive
                        type={activeArchive}
                        onClose={handleCloseArchive}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
