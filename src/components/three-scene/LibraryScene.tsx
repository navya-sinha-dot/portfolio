"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookshelf } from './Bookshelf';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { ProjectArchive } from '../ui/ProjectArchive';

export const LibraryScene: React.FC = () => {
    const [activeArchive, setActiveArchive] = React.useState<"projects" | "experience" | "skills" | "about" | "hobbies" | "contact" | null>(null);
    const [openBookId, setOpenBookId] = React.useState<string | null>(null);

    const handleCloseArchive = () => {
        setActiveArchive(null);
        setOpenBookId(null);
    };
    return (
        <div className="w-full h-screen bg-[#F5F5F3] overflow-hidden relative font-sans">
            {/* Real Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/bg.png')" }}
            />

            {/* Subtle Gradient Overlays for Depth */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.6)_100%)]" />

            {/* Top UI Elements */}
            <div className="absolute top-10 left-12 z-20 flex flex-col gap-1 pointer-events-none group">
                <h1 className="text-3xl font-serif text-[#1A2A3A] tracking-[0.3em] uppercase leading-none italic opacity-90 group-hover:opacity-100 transition-opacity">The Archive</h1>
                <div className="h-[2px] w-32 bg-[#C5A059] origin-left scale-x-100 group-hover:bg-[#1A2A3A] transition-colors" />
                <span className="text-[10px] text-[#1A2A3A]/60 uppercase tracking-[0.4em] mt-2 font-elegant italic font-semibold">Alex Chen | Digital Portfolio</span>
            </div>

            <div className="absolute top-10 right-12 z-20">
                <button className="px-10 py-3 bg-[#2D4F3E] hover:bg-[#1A2A3A] text-[#F5F5F3] text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm shadow-xl transition-all group overflow-hidden relative">
                    <span className="relative z-10">Hire Me</span>
                </button>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-40 flex flex-col items-center pointer-events-none">
                <div className="w-[1px] h-16 bg-gradient-to-t from-[#C5A059] to-transparent" />
                <span className="text-[9px] uppercase tracking-[0.6em] text-[#1A2A3A] mt-6 font-sans font-black">Explore the Collection</span>
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
                <pointLight position={[-10, 10, -5]} intensity={1} color="#FFFFFF" />
                <directionalLight position={[3, 6, 6]} intensity={1.1} color="#FFFFFF" />

                <Suspense fallback={<Html center><div className="text-[#1A2A3A] font-serif italic animate-pulse tracking-widest uppercase text-xs">Accessing Records...</div></Html>}>
                    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1} scale={[0.7, 0.7, 0.7]}>
                        <Bookshelf
                            openBookId={openBookId}
                            onBookToggle={setOpenBookId}
                            onOpenArchive={(type) => setActiveArchive(type as any)}
                        />
                    </Float>
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={7}
                    maxDistance={14}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 2.2}
                    makeDefault
                />

                <EffectComposer multisampling={4}>
                    <Bloom luminanceThreshold={1.2} intensity={0.5} levels={9} mipmapBlur />
                    <Vignette eskil={false} offset={0.1} darkness={0.2} />
                    <Noise opacity={0.01} />
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
