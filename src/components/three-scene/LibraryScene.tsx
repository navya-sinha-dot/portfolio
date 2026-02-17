"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, Html, Image, useScroll, ScrollControls, Scroll, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookshelf } from './Bookshelf';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { ProjectArchive } from '../ui/ProjectArchive';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Steam: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    const group = React.useRef<THREE.Group>(null);
    const scroll = useScroll();
    const material = React.useMemo(() => new THREE.MeshBasicMaterial({
        color: "#FFFFFF",
        transparent: true,
        opacity: 0,
        depthWrite: false
    }), []);

    useFrame((state) => {
        if (!group.current) return;

        material.opacity = Math.max(0, 1 - scroll.offset * 2) * 0.6;

        group.current.children.forEach((child, i) => {
            child.position.y += 0.015 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.005;
            if (child.position.y > 0.7) {
                child.position.y = 0;
                child.position.x = (Math.random() - 0.5) * 0.2;
            }
            child.scale.setScalar(THREE.MathUtils.lerp(0.1, 0.5, child.position.y * 1.2));
        });
    });

    return (
        <group ref={group} position={position}>
            {[...Array(8)].map((_, i) => (
                <mesh key={i} material={material} position={[(Math.random() - 0.5) * 0.2, Math.random() * 0.7, (Math.random() - 0.5) * 0.1]}>
                    <sphereGeometry args={[0.08, 12, 12]} />
                </mesh>
            ))}
        </group>
    );
};

const StillLifeIntroduction: React.FC = () => {
    const scroll = useScroll();
    const frameMaterialRef = React.useRef<THREE.MeshStandardMaterial>(null);
    const imageRef = React.useRef<any>(null);
    const nameRef = React.useRef<any>(null);
    const lineRef = React.useRef<THREE.Group>(null);

    useFrame(() => {
        const offset = scroll.offset;
        const opacity = Math.max(0, 1 - offset * 2.5);
        const imageOpacity = Math.max(0, 1 - offset * 3);

        if (frameMaterialRef.current) frameMaterialRef.current.opacity = opacity;
        if (imageRef.current) imageRef.current.material.opacity = imageOpacity;
        if (nameRef.current) {
            nameRef.current.material.opacity = opacity;
            nameRef.current.position.y = 1.2 - offset * 2;
        }
        if (lineRef.current) {
            lineRef.current.children.forEach((child: any) => {
                if (child.material) child.material.opacity = opacity * 0.4;
            });
            lineRef.current.position.y = 0.8 - offset * 2;
        }
    });

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
                    <mesh position={[0, 1, -0.95]} rotation={[-Math.PI / 10, 0, 0]} castShadow>
                        <boxGeometry args={[3.1, 2.1, 0.08]} />
                        <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />

                        {/* Inner Screen */}
                        <mesh position={[0, 0, 0.05]}>
                            <planeGeometry args={[2.9, 1.9]} />
                            <meshStandardMaterial
                                color="#0D1C29"
                                emissive="#C5A059"
                                emissiveIntensity={0.05}
                                roughness={0}
                            />

                            {/* Screen Content UI */}
                            <Html
                                transform
                                scale={0.075}
                                position={[0, 0, 0.01]}
                                distanceFactor={5}
                                className="pointer-events-none select-none"
                            >
                                {/* <div className="w-[800px] h-[500px] bg-black/90 p-12 font-mono text-[24px] text-[#C5A059]/70 overflow-hidden flex flex-col border border-[#C5A059]/20 shadow-2xl">
                                    <div className="flex gap-4 mb-8 opacity-40">
                                        <div className="w-4 h-4 rounded-full bg-red-400" />
                                        <div className="w-4 h-4 rounded-full bg-yellow-400" />
                                        <div className="w-4 h-4 rounded-full bg-green-400" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="text-blue-400 opacity-60">{"// Records initialization..."}</p>
                                        <p><span className="text-purple-400">const</span> <span className="text-yellow-400">Archive</span> = <span className="text-white">()</span> <span className="text-purple-400">{"=>"}</span> {"{"}</p>
                                        <p className="ml-8"><span className="text-purple-400">return</span> <span className="text-white">(</span></p>
                                        <p className="ml-16 text-green-400">{"<Portfolio />"}</p>
                                        <p className="ml-8 text-white">);</p>
                                        <p>{"};"}</p>
                                    </div>
                                    <div className="mt-8 h-[2px] w-full bg-[#C5A059]/10 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[#C5A059]/40 w-1/3 animate-[loading_2s_infinite_linear]"
                                            style={{ animation: 'loading 2s infinite linear' }} />
                                    </div>
                                    <p className="mt-8 text-[18px] opacity-30 uppercase tracking-[0.4em]">Archival System Active</p>
                                </div> */}
                            </Html>

                            {/* Subtle light from screen onto book/mug */}
                            <pointLight position={[0, 0, 0.5]} intensity={0.6} color="#C5A059" distance={3} />
                        </mesh>
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
                    <Steam position={[0, 1, 0]} />
                </group>
            </group>

            {/* Profile Picture (Floating Frame on Right - Not on Table) */}
            <group position={[5, -0.2, 0]} rotation={[0, -0.4, 0]}>
                <mesh position={[0, 1, 0.02]} castShadow>
                    <boxGeometry args={[3, 4, 0.1]} />
                    <meshStandardMaterial
                        ref={frameMaterialRef}
                        color="#1A2A3A"
                        transparent
                        opacity={1}
                    />
                </mesh>
                <group position={[0, 1, 0.1]}>
                    <Image
                        ref={imageRef}
                        url="/girls.png"
                        scale={[2.8, 3.8]}
                        transparent
                    />
                </group>
            </group>

            {/* 3D Name Text */}
            <Text
                ref={nameRef}
                position={[-2.5, 1.2, 0]}
                fontSize={0.7}
                font="https://unpkg.com/@fontsource/playfair-display@5.1.0/files/playfair-display-latin-400-normal.woff"
                color="#0D1C29"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.2}
            >
                NAVYA SINHA
                <meshStandardMaterial transparent opacity={1} />
            </Text>

            {/* Decorative Line under name */}
            <group ref={lineRef} position={[-2.5, 0.8, 0]}>
                <mesh>
                    <planeGeometry args={[1.5, 0.015]} />
                    <meshBasicMaterial color="#C5A059" transparent opacity={0.4} />
                </mesh>
            </group>
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
            // Workspace exit animation (Gentler movement)
            const yMove = THREE.MathUtils.lerp(0, 5, offset);
            const zMove = THREE.MathUtils.lerp(0, -4, offset);
            scene3DRef.current.position.y = yMove;
            scene3DRef.current.position.z = zMove;

            // Fades out and shrinks much later (starts at 40%, gone at 70%)
            const exitScale = offset > 0.4 ? THREE.MathUtils.lerp(1, 0, (offset - 0.4) * 3.33) : 1;
            scene3DRef.current.scale.setScalar(exitScale);

            // Hide completely only at the very bottom
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
                <StillLifeIntroduction />
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

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseArchive();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
