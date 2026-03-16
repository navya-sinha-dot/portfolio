"use client";

import React from "react";
import { InteractiveBook } from "./InteractiveBook";
import { Mail, MapPin, Linkedin, Github, ExternalLink, Code } from "lucide-react";

interface ProjectArchiveProps {
    type: "projects" | "experience" | "skills" | "hobbies" | "contact";
    onClose?: () => void;
}

export const ProjectArchive: React.FC<ProjectArchiveProps> = ({ type, onClose }) => {
    const [portfolioData, setPortfolioData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(data => {
                setPortfolioData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    // Handle Escape key to close
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && onClose) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const generatePages = () => {
        if (loading) {
            return [
                <div key="loading" className="flex flex-col items-center justify-center h-full p-10 bg-[#F4F1EA]">
                    <div className="w-12 h-12 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[10px] uppercase tracking-widest text-[#1A2A3A]/40 italic">Retrieving Records...</p>
                </div>
            ];
        }

        const pages: React.ReactNode[] = [];
        const { projects = [], experiences = [], skills = [], hobbies = "" } = portfolioData || {};

        // Title / Cover Page
        pages.push(
            <div key="title" className="flex flex-col items-center justify-center h-full p-10 text-center bg-[#F4F1EA]">
                <h1 className="text-4xl font-serif text-[#1A2A3A] mb-4 uppercase tracking-tighter">
                    {type === "projects" && "My Work"}
                    {type === "experience" && "Career Chronology"}
                    {type === "skills" && "Technical Arsenal"}
                    {type === "hobbies" && "Explorations"}
                    {type === "contact" && "Get in touch"}
                </h1>
                <div className="w-16 h-[1px] bg-[#C5A059] mb-4" />
                <p className="text-xs font-sans text-[#1A2A3A]/60 uppercase tracking-[0.3em]">
                    The Archive | Vol. II
                </p>
            </div>
        );

        if (type === "projects") {
            projects.forEach((project: any) => {
                pages.push(
                    <div key={`p-img-${project.id || project._id}`} className="flex flex-col h-full bg-[#FCFAF5]">
                        <div className="h-1/2 bg-white relative overflow-hidden flex items-center justify-center p-4">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain shadow-sm border border-gray-100"
                            />
                            <div className="absolute inset-0 bg-black/[0.02]" />
                        </div>
                        <div className="p-8 flex-1 flex flex-col justify-center">
                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-2 block">Project Entry</span>
                            <h2 className="text-2xl font-serif text-[#1A2A3A] mb-2">{project.title}</h2>
                            <p className="text-xs text-[#1A2A3A]/70 leading-relaxed font-medium italic">{project.description}</p>
                        </div>
                    </div>
                );

                pages.push(
                    <div key={`p-det-${project.id || project._id}`} className="flex flex-col h-full p-10 bg-[#FDFCF8]">
                        <h3 className="text-sm font-bold text-[#1A2A3A] uppercase tracking-widest mb-6 pb-2 border-b border-[#D1D1CB]/30">Exhibition Details</h3>
                        <p className="text-sm text-[#1A2A3A]/80 leading-relaxed mb-8 font-serif italic">
                            {project.longDescription}
                        </p>

                        <div className="mt-auto">
                            <h4 className="text-[10px] text-[#1A2A3A]/40 uppercase tracking-widest mb-3">Technologies Utilized</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech: string) => (
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
                                    Project Link →
                                </a>
                            )}
                        </div>
                    </div>
                );
            });
        } else if (type === "skills") {
            pages.push(
                <div key="skills-1" className="flex flex-col h-full p-10 bg-[#FCFAF5]">
                    <h2 className="text-3xl font-serif text-[#1A2A3A] mb-6 uppercase tracking-tighter">Technical Arsenal</h2>
                    <div className="space-y-6">
                        {skills.slice(0, 2).map((cat: any) => (
                            <div key={cat.category}>
                                <h3 className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-3">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((s: string) => (
                                        <span key={s} className="px-3 py-1 bg-white border border-[#D1D1CB] text-[10px] text-[#1A2A3A] font-bold rounded-full">{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            if (skills.length > 2) {
                pages.push(
                    <div key="skills-2" className="flex flex-col h-full p-10 bg-[#FDFCF8]">
                        {skills.slice(2).map((cat: any) => (
                            <div key={cat.category} className="mb-6">
                                <h3 className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mb-3">{cat.category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((s: string) => (
                                        <span key={s} className="px-3 py-1 bg-[#1A2A3A] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        } else if (type === "hobbies") {
            pages.push(
                <div key="hobbies-1" className="flex flex-col h-full p-10 bg-[#FCFAF5] justify-center text-center">
                    <h2 className="text-3xl font-serif text-[#1A2A3A] mb-2 uppercase tracking-tight">Explorations</h2>
                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em]">Outside the Code</p>
                </div>
            );
            pages.push(
                <div key="hobbies-2" className="flex flex-col h-full p-10 bg-[#FDFCF8] font-serif italic text-[#1A2A3A]/80 leading-loose">
                    {hobbies.split('\n').map((p: string, i: number) => (
                        <p key={i} className="mb-6">{p}</p>
                    ))}
                </div>
            );
        } else if (type === "contact") {
            const { contact } = portfolioData || {};
            if (contact) {
                pages.push(
                    <div key="contact-1" className="flex flex-col h-full p-10 bg-[#FCFAF5] justify-center">
                        <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em] mb-4">Get in Touch</span>
                        <h2 className="text-4xl font-serif text-[#1A2A3A] mb-8 uppercase tracking-tighter italic">Contact<br />Details</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A]/5 flex items-center justify-center text-[#C5A059]">
                                    <Mail size={14} />
                                </div>
                                <div>
                                    <h3 className="text-[9px] text-[#1A2A3A]/40 uppercase tracking-widest mb-1">Electronic Mail</h3>
                                    <p className="text-sm font-serif italic text-[#1A2A3A]">{contact.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A]/5 flex items-center justify-center text-[#C5A059]">
                                    <MapPin size={14} />
                                </div>
                                <div>
                                    <h3 className="text-[9px] text-[#1A2A3A]/40 uppercase tracking-widest mb-1">Base of Operations</h3>
                                    <p className="text-sm font-serif italic text-[#1A2A3A]">{contact.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                pages.push(
                    <div key="contact-2" className="flex flex-col h-full p-10 bg-[#FDFCF8] justify-center relative">
                        <div className="absolute top-10 right-10 w-20 h-20 border border-[#C5A059]/10 rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border border-[#C5A059]/20 rounded-full" />
                        </div>

                        <p className="text-sm text-[#1A2A3A]/70 leading-relaxed font-serif italic mb-12">
                            "{contact.message}"
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-[9px] text-[#1A2A3A]/40 uppercase tracking-widest mb-4">Digital Presence</h3>
                            <div className="flex flex-col gap-3">
                                {contact.linkedin && (
                                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="group text-xs text-[#C5A059] hover:text-[#1A2A3A] transition-colors flex items-center gap-3 font-bold uppercase tracking-widest">
                                        <div className="w-6 h-6 border border-[#C5A059]/30 rounded-full flex items-center justify-center group-hover:border-[#1A2A3A]/30 transition-colors">
                                            <Linkedin size={10} />
                                        </div>
                                        LinkedIn
                                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                                {contact.github && (
                                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="group text-xs text-[#C5A059] hover:text-[#1A2A3A] transition-colors flex items-center gap-3 font-bold uppercase tracking-widest">
                                        <div className="w-6 h-6 border border-[#C5A059]/30 rounded-full flex items-center justify-center group-hover:border-[#1A2A3A]/30 transition-colors">
                                            <Github size={10} />
                                        </div>
                                        GitHub
                                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                                {contact.leetcode && (
                                    <a href={contact.leetcode} target="_blank" rel="noopener noreferrer" className="group text-xs text-[#C5A059] hover:text-[#1A2A3A] transition-colors flex items-center gap-3 font-bold uppercase tracking-widest">
                                        <div className="w-6 h-6 border border-[#C5A059]/30 rounded-full flex items-center justify-center group-hover:border-[#1A2A3A]/30 transition-colors">
                                            <Code size={10} />
                                        </div>
                                        LeetCode
                                        <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="mt-16 pt-8 border-t border-[#1A2A3A]/5">
                            <div className="text-[8px] text-[#1A2A3A]/30 uppercase tracking-[0.2em] leading-relaxed">
                                Formal Inquiry Records<br />
                                Archive Updated: {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            experiences.forEach((exp: any) => {
                pages.push(
                    <div key={exp.id} className="flex flex-col h-full p-10 bg-[#FCFAF5]">
                        <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mb-4 block">{exp.duration}</span>
                        <h2 className="text-3xl font-serif text-[#1A2A3A] mb-1">{exp.company}</h2>
                        <p className="text-xs font-bold text-[#1A2A3A]/40 uppercase tracking-[0.3em] mb-8">{exp.role}</p>

                        <ul className="space-y-4">
                            {exp.description.map((point: string, i: number) => (
                                <li key={i} className="text-xs text-[#1A2A3A]/70 leading-relaxed pl-4 relative italic font-medium">
                                    <span className="absolute left-0 top-1.5 w-1.5 h-[1px] bg-[#C5A059]" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

                if (exp.certificate) {
                    pages.push(
                        <div key={`${exp.id}-cert`} className="flex flex-col h-full p-10 bg-[#FDFCF8] justify-center items-center">
                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em] mb-8">Official Record</span>
                            <div className="w-full h-3/4 bg-white shadow-xl border border-gray-100 p-4 transform rotate-1">
                                <img src={exp.certificate} alt="Certificate" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    );
                }
            });
        }

        pages.push(
            <div key="end" className="flex flex-col items-center justify-center h-full p-10 text-center bg-[#F4F1EA]">
                <div className="w-12 h-12 border border-[#1A2A3A]/20 rounded-full flex items-center justify-center mb-6">
                    <div className="w-8 h-8 border border-[#1A2A3A]/10 rounded-full animate-ping" />
                </div>
                <p className="text-[10px] font-sans text-[#1A2A3A]/40 uppercase tracking-[0.4em]">End of Record</p>
            </div>
        );

        return pages;
    };

    if (type === "skills" && !loading) {
        const { skills = [] } = portfolioData || {};
        return (
            <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8 overflow-hidden backdrop-blur-sm">
                <div
                    className="w-[550px] min-h-[700px] bg-[#FCFAF5] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative p-16 flex flex-col border-t-[12px] border-[#1A2A3A]"
                >
                    <button onClick={onClose} className="absolute top-6 right-6 text-[#1A2A3A]/40 hover:text-[#1A2A3A] transition-colors scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="border-b-2 border-[#1A2A3A]/10 pb-8 mb-10">
                        <h1 className="text-4xl font-serif text-[#1A2A3A] uppercase tracking-tighter mb-2 italic font-bold">Technical Arsenal</h1>
                    </div>

                    <div className="flex-1 space-y-10">
                        {skills.map((cat: any) => (
                            <div key={cat.category} className="relative">
                                <h3 className="text-[11px] text-[#C5A059] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                                    <span className="w-6 h-[1px] bg-[#C5A059]/30" />
                                    {cat.category}
                                </h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-4 pl-9">
                                    {cat.items.map((skill: string) => (
                                        <div key={skill} className="flex items-center gap-2 group">
                                            <div className="w-1 h-1 rounded-full bg-[#1A2A3A]/20 group-hover:bg-[#C5A059] transition-colors" />
                                            <span className="text-sm font-serif italic text-[#1A2A3A]/80">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-8 overflow-hidden backdrop-blur-sm">
            <div className="w-[1000px] h-[750px] relative flex items-center justify-center">
                <InteractiveBook
                    pages={generatePages()}
                    onClose={onClose}
                    width={500}
                    height={600}
                />

                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-white/80 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-6 whitespace-nowrap bg-black/20 px-6 py-2 rounded-full backdrop-blur-md">
                    <span className="animate-pulse">Click to flip pages</span>
                    <div className="w-12 h-[1px] bg-white/30" />
                    <span className="opacity-60">Use escape to close</span>
                </div>
            </div>
        </div>
    );
};
