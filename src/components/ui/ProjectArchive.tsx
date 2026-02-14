"use client";

import React from "react";
import { projects, experiences, Project, Experience } from "@/lib/portfolioData";
import { InteractiveBook } from "./InteractiveBook";

interface ProjectArchiveProps {
    type: "projects" | "experience" | "skills" | "about" | "hobbies" | "contact";
    onClose?: () => void;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({ type, onClose }) => {
    const generatePages = () => {
        const pages: React.ReactNode[] = [];

        // Title / Cover Page
        pages.push(
            <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-[#F4F1EA]">
                <h1 className="text-4xl font-serif text-[#1A2A3A] mb-4 uppercase tracking-tighter">
                    {type === "projects" ? "Index of Works" : "Career Chronology"}
                </h1>
                <div className="w-16 h-[1px] bg-[#C5A059] mb-4" />
                <p className="text-xs font-sans text-[#1A2A3A]/60 uppercase tracking-[0.3em]">
                    The Archive | Vol. II
                </p>
            </div>
        );

        if (type === "projects") {
            projects.forEach((project) => {
                // Project Image/Lead Page
                pages.push(
                    <div className="flex flex-col h-full bg-[#FCFAF5]">
                        <div className="h-2/3 bg-gray-200 relative overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/10" />
                        </div>
                        <div className="p-8">
                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-2 block">Project 0{project.id}</span>
                            <h2 className="text-2xl font-serif text-[#1A2A3A] mb-2">{project.title}</h2>
                            <p className="text-xs text-[#1A2A3A]/70 leading-relaxed font-medium italic">{project.description}</p>
                        </div>
                    </div>
                );

                // Project Details Page
                pages.push(
                    <div className="flex flex-col h-full p-10 bg-[#FDFCF8]">
                        <h3 className="text-sm font-bold text-[#1A2A3A] uppercase tracking-widest mb-6 pb-2 border-b border-[#D1D1CB]/30">Exhibition Details</h3>
                        <p className="text-sm text-[#1A2A3A]/80 leading-relaxed mb-8 font-serif italic">
                            {project.longDescription}
                        </p>

                        <div className="mt-auto">
                            <h4 className="text-[10px] text-[#1A2A3A]/40 uppercase tracking-widest mb-3">Technologies Utilized</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-2 py-1 bg-[#1A2A3A]/5 text-[#1A2A3A]/60 text-[9px] font-bold rounded-sm border border-[#1A2A3A]/10 uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-block text-[10px] text-[#C5A059] font-black uppercase tracking-[0.3em] hover:text-[#1A2A3A] transition-colors"
                                >
                                    View Case Study →
                                </a>
                            )}
                        </div>
                    </div>
                );
            });
        } else if (type === "skills") {
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FCFAF5]">
                    <h2 className="text-3xl font-serif text-[#1A2A3A] mb-6 uppercase tracking-tighter">Technical Arsenal</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-3">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["React", "Next.js", "TypeScript", "Tailwind", "Three.js", "GSAP"].map(s => (
                                    <span key={s} className="px-3 py-1 bg-white border border-[#D1D1CB] text-[10px] text-[#1A2A3A] font-bold rounded-full">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-3">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Node.js", "PostgreSQL", "Prisma", "Redis", "Docker"].map(s => (
                                    <span key={s} className="px-3 py-1 bg-white border border-[#D1D1CB] text-[10px] text-[#1A2A3A] font-bold rounded-full">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FDFCF8]">
                    <h3 className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-4">Design & Creative</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Figma", "Motion Design", "3D Modeling", "Branding"].map(s => (
                            <span key={s} className="px-3 py-1 bg-[#1A2A3A] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">{s}</span>
                        ))}
                    </div>
                    <div className="mt-12 p-6 border border-[#C5A059]/20 rounded-lg italic text-sm text-[#1A2A3A]/70 leading-relaxed font-serif">
                        "The goal of my technical practice is to bridge the gap between complex engineering and emotional, intuitive user experiences."
                    </div>
                </div>
            );
        } else if (type === "about") {
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FCFAF5] justify-center text-center">
                    <div className="w-24 h-24 bg-[#D1D1CB] rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                        <img src="https://placehold.co/200x200?text=AC" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-3xl font-serif text-[#1A2A3A] mb-2 uppercase tracking-tight">The Architect</h2>
                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em]">Curator & Engineer</p>
                </div>
            );
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FDFCF8] font-serif italic text-[#1A2A3A]/80 leading-loose">
                    <p className="mb-6">
                        I am a digital architect focused on building immersive environments that transcend the ordinary web. With a background in both engineering and design, I treat every project as a piece of curated history.
                    </p>
                    <p>
                        Based in the intersection of code and art, I spend my time exploring the limits of what's possible with modern browser technology.
                    </p>
                </div>
            );
        }
        else if (type === "hobbies") {
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FCFAF5] justify-center text-center">
                    <div className="w-24 h-24 bg-[#D1D1CB] rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                        <img src="https://placehold.co/200x200?text=AC" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-3xl font-serif text-[#1A2A3A] mb-2 uppercase tracking-tight">The Architect</h2>
                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em]">Curator & Engineer</p>
                </div>
            );
            pages.push(
                <div className="flex flex-col h-full p-10 bg-[#FDFCF8] font-serif italic text-[#1A2A3A]/80 leading-loose">
                    <p className="mb-6">
                        I am a digital architect focused on building immersive environments that transcend the ordinary web. With a background in both engineering and design, I treat every project as a piece of curated history.
                    </p>
                    <p>
                        Based in the intersection of code and art, I spend my time exploring the limits of what's possible with modern browser technology.
                    </p>
                </div>
            );
        }
        else {
            experiences.forEach((exp) => {
                // Experience Page
                pages.push(
                    <div className="flex flex-col h-full p-10 bg-[#FCFAF5]">
                        <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-4 block">{exp.duration}</span>
                        <h2 className="text-3xl font-serif text-[#1A2A3A] mb-1">{exp.company}</h2>
                        <p className="text-xs font-bold text-[#1A2A3A]/40 uppercase tracking-[0.3em] mb-8">{exp.role}</p>

                        <ul className="space-y-4">
                            {exp.description.map((point, i) => (
                                <li key={i} className="text-xs text-[#1A2A3A]/70 leading-relaxed pl-4 relative italic font-medium">
                                    <span className="absolute left-0 top-1.5 w-1.5 h-[1px] bg-[#C5A059]" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            });
        }

        // Final Page
        pages.push(
            <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-[#F4F1EA]">
                <div className="w-12 h-12 border border-[#1A2A3A]/20 rounded-full flex items-center justify-center mb-6">
                    <div className="w-8 h-8 border border-[#1A2A3A]/10 rounded-full animate-ping" />
                </div>
                <p className="text-[10px] font-sans text-[#1A2A3A]/40 uppercase tracking-[0.4em]">End of Record</p>
            </div>
        );

        return pages;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-8 overflow-hidden">
            <div className="w-[900px] h-[650px] relative">
                <InteractiveBook
                    pages={generatePages()}
                    onClose={onClose}
                    width={600}
                    height={700}
                />

                {/* Helper UI */}
                <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-white/60 text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-4">
                    <span>Click to flip pages</span>
                    <div className="w-8 h-[1px] bg-white/20" />
                    <span>Use escape to close</span>
                </div>
            </div>
        </div>
    );
};
