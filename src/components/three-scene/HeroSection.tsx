"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-between px-20 overflow-hidden bg-[#F5F5F3]">
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            {/* Left Side: Illustration Placeholder */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-1/2 h-full flex flex-col justify-center"
            >
                <div className="relative w-[500px] h-[500px]">
                    {/* Background Decorative Circle */}
                    <div className="absolute inset-0 bg-[#C5A059]/5 rounded-full blur-3xl -z-10 animate-pulse" />

                    {/* The "Main Illustration" Box */}
                    <div className="w-full h-full bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(26,42,58,0.15)] overflow-hidden border border-[#D1D1CB] relative group">
                        {/* Interior Scene */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCF8] to-[#E5E5E0] flex items-center justify-center">
                            <div className="relative">
                                {/* Character Placeholder (Abstract) */}
                                <div className="w-32 h-32 bg-[#1A2A3A] rounded-full mx-auto relative z-10 shadow-lg" />
                                <div className="w-48 h-24 bg-[#1A2A3A] rounded-t-[50px] -mt-8 mx-auto relative z-0" />

                                {/* Hands holding items */}
                                <motion.div
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-16 top-10 flex items-center gap-2"
                                >
                                    {/* Cup */}
                                    <div className="w-12 h-10 bg-[#FCFAF5] rounded-b-xl border-t-2 border-[#1A2A3A] relative">
                                        <div className="absolute -right-3 top-2 w-4 h-4 border-2 border-[#1A2A3A] rounded-full" />
                                        {/* Steam Waves */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 space-y-1">
                                            {[0, 0.4, 0.8].map((delay, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ y: 0, opacity: 0, scale: 0.8 }}
                                                    animate={{ y: -20, opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay }}
                                                    className="w-4 h-1 bg-[#C5A059]/40 blur-[1px] rounded-full mx-auto"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ rotate: [0, -3, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -left-16 top-12"
                                >
                                    {/* Book in hand */}
                                    <div className="w-16 h-20 bg-[#C5A059] rounded-sm shadow-md border-l-4 border-[#1A2A3A]/20" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Text Decorative */}
                        <div className="absolute top-8 left-8">
                            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em]">Volume 01</span>
                        </div>
                    </div>
                </div>

                {/* Text Content Overlay */}
                <div className="mt-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-7xl font-serif text-[#1A2A3A] mb-6 leading-none uppercase tracking-tighter"
                    >
                        The <span className="text-[#C5A059]">Modern</span> <br />Artisan
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-12 h-[1px] bg-[#C5A059]" />
                        <p className="text-[10px] text-[#1A2A3A]/40 font-bold uppercase tracking-[0.4em]">Portfolio & Retrospective</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side: Laptop Decorative */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-1/3 flex justify-center perspective-[2000px]"
            >
                <div className="relative rotate-y-[-15deg] group hover:rotate-y-[-5deg] transition-all duration-1000">
                    {/* Glossy Laptop Top */}
                    <div className="w-[480px] h-[320px] bg-[#1A2A3A] rounded-t-2xl border-x-[12px] border-t-[12px] border-[#2A2A2A] shadow-[0_50px_100px_-10px_rgba(0,0,0,0.4)] overflow-hidden relative">
                        {/* Screen Content */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3 bg-gradient-to-tr from-transparent via-white/5 to-white/10">
                            <div className="w-1/3 h-1 bg-[#C5A059]/40 rounded shadow-[0_0_10px_#C5A059]" />
                            <div className="w-3/4 h-2 bg-white/5 rounded" />
                            <div className="w-1/2 h-2 bg-white/5 rounded" />
                        </div>
                        {/* Reflection Line */}
                        <div className="absolute -inset-x-20 top-0 h-40 bg-white/5 rotate-[35deg] translate-y-[-50%]" />
                    </div>
                    {/* Bottom Chassis */}
                    <div className="w-[560px] h-6 bg-[#2D2D2D] -ml-10 rounded-b-2xl shadow-inner border-b-4 border-[#1A1A1A]" />

                    {/* Ambient Glow */}
                    <div className="absolute -bottom-10 -left-10 -right-10 h-20 bg-[#C5A059]/10 blur-[80px] rounded-full" />
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em]">Explore Library</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#C5A059] to-transparent" />
            </motion.div>
        </section>
    );
};
