'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    github: string;
    demo: string;
    icon: string;
}

export function ProjectCard({ title, description, github, demo, icon }: ProjectCardProps) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="p-4 bg-secondary/10 border-secondary/20 hover:bg-secondary/20 transition-colors">
                <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{icon}</div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight">{title}</h3>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{description}</p>
                        <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline" className="h-8 px-3 text-xs bg-transparent">
                                <a href={github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-3 h-3 mr-1" />
                                    GitHub
                                </a>
                            </Button>
                            <Button asChild size="sm" className="h-8 px-3 text-xs bg-accent hover:bg-accent/80">
                                <a href={demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Demo
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
