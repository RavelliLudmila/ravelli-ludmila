'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Atom, Settings, Database, Wrench, Palette, ClipboardList } from 'lucide-react';

const skillCategories = [
    {
        title: 'Lenguajes',
        icon: Monitor,
        skills: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
    },
    {
        title: 'Frontend',
        icon: Atom,
        skills: ['React 19', 'Next.js 15', 'TailwindCSS', 'Radix UI', 'Flowbite', 'Formik+Yup', 'Framer Motion'],
    },
    {
        title: 'Backend',
        icon: Settings,
        skills: ['Node.js', 'Express.js', 'NestJS'],
    },
    {
        title: 'Database',
        icon: Database,
        skills: ['PostgreSQL', 'Prisma', 'TypeORM', 'MySQL', 'MongoDB'],
    },
    {
        title: 'Herramientas',
        icon: Wrench,
        skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Postman', 'ESLint', 'js-cookie', 'DayJS'],
    },
    {
        title: 'Diseño',
        icon: Palette,
        skills: ['Figma', 'Photoshop (básico)'],
    },
    {
        title: 'Metodologías',
        icon: ClipboardList,
        skills: ['Scrum', 'Kanban', 'FDD'],
    },
];

export function SkillsGrid() {
    return (
        <div className="grid grid-cols-1 gap-4">
            {skillCategories.map((category, index) => (
                <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <Card className="p-4 bg-accent/10 border-accent/20">
                        <div className="flex items-center gap-2 mb-3">
                            <category.icon className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-primary/20 text-primary-foreground hover:bg-primary/30 transition-colors"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
