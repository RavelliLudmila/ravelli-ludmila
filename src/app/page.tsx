'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { SkillsGrid } from '@/components/skills-grid';
import { ContactForm } from '@/components/contact-form';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { projects, profile } from '@/content/portfolioData';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { showScrollButton, scrollToTop } = useScrollToTop({
        threshold: 200,
        containerRef
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 max-w-4xl"
                >
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold text-foreground"
                        >
                            {profile.name}
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-xl md:text-2xl text-muted-foreground"
                        >
                            {profile.title}
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex items-center justify-center gap-2 text-muted-foreground"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        >
                            {profile.bio}
                        </motion.p>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button size="lg" className="text-lg px-8 py-3" onClick={() => {
                            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Ver mis proyectos
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" size="icon" asChild>
                                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href={`mailto:${profile.email}`}>
                                    <Mail className="w-5 h-5" />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Mis Proyectos
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Algunos de los proyectos en los que he trabajado
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    github={project.github}
                                    demo={project.demo}
                                    icon={project.icon}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-8 bg-muted/20">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Tecnologías y Habilidades
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Stack tecnológico con el que trabajo
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <SkillsGrid />
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Contacto
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            ¿Interesado en trabajar juntos? ¡Hablemos!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </section>

            <ScrollToTopButton show={showScrollButton} onClick={scrollToTop} />
        </div>
    );
}
