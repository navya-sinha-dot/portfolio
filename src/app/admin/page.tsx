"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/portfolio");
            const json = await res.json();
            setData(json);
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
        if (password === correctPassword) {
            setIsAuthenticated(true);
            toast.success("Welcome back, Librarian.");
        } else {
            toast.error("Invalid credentials.");
        }
    };

    const saveData = async (updatedData: any) => {
        try {
            const res = await fetch("/api/portfolio", {
                method: "POST",
                body: JSON.stringify(updatedData),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                setData(updatedData);
                toast.success("Archive updated successfully");
            } else {
                toast.error("Failed to save changes");
            }
        } catch (err) {
            toast.error("Network error while saving");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center p-8 font-sans">
                <Toaster />
                <Card className="w-full max-w-md border-[#D1D1CB]/50 shadow-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="font-serif italic text-3xl text-[#1A2A3A]">Restricted Access</CardTitle>
                        <p className="text-[10px] text-[#C5A059] uppercase tracking-widest mt-2">Enter Librarian Key</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Admin Password"
                                className="bg-[#FDFCF8] border-[#D1D1CB]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white">
                                Unlock Archive
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading) return <div className="p-20 text-center font-serif italic text-2xl">Reading Manuscripts...</div>;

    return (
        <div className="min-h-screen bg-[#F5F5F3] p-8 font-sans">
            <Toaster />
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex justify-between items-center border-b border-[#D1D1CB] pb-6">
                    <div>
                        <h1 className="text-4xl font-serif text-[#1A2A3A] uppercase tracking-tighter italic">Librarian Panel</h1>
                        <p className="text-xs text-[#C5A059] uppercase tracking-widest mt-1">Editing Static Archive: portfolio.json</p>
                    </div>
                    <Button onClick={() => setIsAuthenticated(false)} variant="ghost" className="text-[#1A2A3A]/60">
                        Lock Panel
                    </Button>
                </header>

                <Tabs defaultValue="projects" className="w-full">
                    <TabsList className="bg-white border-b border-x border-t-0 p-1 rounded-none mb-8">
                        <TabsTrigger value="projects" className="data-[state=active]:bg-[#C5A059]/10 data-[state=active]:text-[#1A2A3A]">Projects</TabsTrigger>
                        <TabsTrigger value="experience" className="data-[state=active]:bg-[#C5A059]/10 data-[state=active]:text-[#1A2A3A]">Experience</TabsTrigger>
                        <TabsTrigger value="skills" className="data-[state=active]:bg-[#C5A059]/10 data-[state=active]:text-[#1A2A3A]">Skills</TabsTrigger>
                        <TabsTrigger value="about" className="data-[state=active]:bg-[#C5A059]/10 data-[state=active]:text-[#1A2A3A]">About & Hobbies</TabsTrigger>
                    </TabsList>

                    <TabsContent value="about">
                        <Card className="border-[#D1D1CB]/50 bg-[#FDFCF8]">
                            <CardHeader>
                                <CardTitle className="font-serif italic text-2xl text-[#1A2A3A]">Narrative Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#C5A059]">About Narrative</Label>
                                    <Textarea
                                        defaultValue={data?.about}
                                        className="h-32 bg-white border-[#D1D1CB]"
                                        onBlur={(e) => saveData({ ...data, about: e.target.value })}
                                    />
                                    <p className="text-[9px] text-gray-400 italic">Auto-saves on blur</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase tracking-widest text-[#C5A059]">Hobbies & Explorations</Label>
                                    <Textarea
                                        defaultValue={data?.hobbies}
                                        className="h-32 bg-white border-[#D1D1CB]"
                                        onBlur={(e) => saveData({ ...data, hobbies: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="projects">
                        <div className="grid gap-4">
                            <ScrollArea className="h-[500px] rounded-md">
                                <div className="space-y-4 pr-4">
                                    {data?.projects?.map((project: any, index: number) => (
                                        <Card key={index} className="border-[#D1D1CB]/50 bg-white hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 flex gap-4">
                                                <div className="w-24 h-16 bg-[#1A2A3A]/5 rounded-sm overflow-hidden flex-shrink-0">
                                                    <img src={project.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-serif text-[#1A2A3A] truncate">{project.title}</h3>
                                                    <p className="text-[10px] text-gray-400 font-sans uppercase tracking-widest truncate">{project.technologies.join(", ")}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" className="text-red-400 h-8" onClick={() => {
                                                        const newProjects = [...data.projects];
                                                        newProjects.splice(index, 1);
                                                        saveData({ ...data, projects: newProjects });
                                                    }}>Delete</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                            <Button className="w-full h-16 border-dashed border bg-transparent text-[#1A2A3A]/40 hover:bg-[#C5A059]/5 hover:text-[#C5A059] hover:border-[#C5A059]">
                                + Register New Project Entry
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="experience">
                        <Card className="border-[#D1D1CB]/50 bg-[#FDFCF8] p-8 text-center text-gray-400 italic">
                            Experience management interface pending further archival requests.
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills">
                        <Card className="border-[#D1D1CB]/50 bg-[#FDFCF8] p-8 text-center text-gray-400 italic">
                            Skills management interface pending further archival requests.
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
