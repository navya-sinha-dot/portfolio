import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    image: { type: String, required: true },
    technologies: [String],
    link: String,
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: [String],
}, { timestamps: true });

export const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

const SkillSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Frontend, Backend, Design
    items: [String],
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

const ContentSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true }, // about, hobbies
    content: { type: String, required: true },
}, { timestamps: true });

export const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);
