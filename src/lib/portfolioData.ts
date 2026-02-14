export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    link?: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string[];
}

export const projects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Redesign",
        description: "A modern take on a classic e-commerce platform.",
        longDescription: "This project focused on improving user experience through a minimalist interface and lightning-fast performance using Next.js and specialized caching strategies.",
        image: "https://placehold.co/400x320/1A2A3A/F5F5F3?text=Project+View",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
        link: "https://example.com"
    },
    {
        id: "2",
        title: "AI Chatbot Dashboard",
        description: "Real-time analytics for AI customer support.",
        longDescription: "A comprehensive dashboard for monitoring and managing AI-driven customer support bots. It features real-time data visualization and sentiment analysis.",
        image: "https://placehold.co/400x320/1A2A3A/F5F5F3?text=Project+View",
        technologies: ["React", "Three.js", "Node.js", "Socket.io"],
        link: "https://example.com"
    },
    {
        id: "3",
        title: "Travel Planner App",
        description: "Collaborative trip planning with interactive maps.",
        longDescription: "An application that allows users to plan trips together in real-time. It integrates with Mapbox for interactive routing and places discovery.",
        image: "https://placehold.co/400x320/1A2A3A/F5F5F3?text=Project+View",
        technologies: ["React Native", "Firebase", "Google Maps API"],
        link: "https://example.com"
    }
];

export const experiences: Experience[] = [
    {
        id: "exp1",
        company: "Tech Innovators",
        role: "Senior Frontend Engineer",
        duration: "2022 - Present",
        description: [
            "Led the development of a flagship 3D visualization tool.",
            "Optimized application performance by 40%.",
            "Mentored junior developers and established coding standards."
        ]
    },
    {
        id: "exp2",
        company: "Creative Labs",
        role: "Full Stack Developer",
        duration: "2020 - 2022",
        description: [
            "Built and maintained multiple client websites using React and Node.js.",
            "Implemented automated testing pipelines using Jest and Cypress.",
            "Collaborated with designers to ensure pixel-perfect implementations."
        ]
    }
];

export const categories = [
    { id: "projects", title: "Projects", color: "#1F2A36" },
    { id: "experience", title: "Experience", color: "#C9B27D" },
    { id: "skills", title: "Skills", color: "#2E3A3F" },
    { id: "about", title: "About", color: "#D6C8A4" },
    { id: "hobbies", title: "Hobbies", color: "#1F2A36" },
    { id: "contact", title: "Contact", color: "#D6C8A4" }
];
