'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project-card';
import { SkillsGrid } from '@/components/skills-grid';
import { ContactForm } from '@/components/contact-form';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { SplashScreen } from '@/components/splash-screen';
import { profile, projects } from '@/content/portfolioData';
import { Github, Linkedin, Mail, MapPin, ArrowDown, Coffee } from 'lucide-react';

export default function HomePage() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SplashScreen />

            {/* Hero Section */}
            <main className="pt-20">
                <section className="container mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                {profile.name}
                            </span>
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {profile.title}
                        </motion.h2>

                        <motion.p
                            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {profile.bio}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Button onClick={scrollToProjects} size="lg" className="group">
                                Ver Proyectos
                                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href={profile.email} className="flex items-center gap-2">
                                    <Coffee className="w-4 h-4" />
                                    Conversemos
                                </a>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex justify-center space-x-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            <Button variant="ghost" size="sm" asChild>
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <Github className="w-5 h-5" />
                                    GitHub
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-primary"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    LinkedIn
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-primary">
                                    <Mail className="w-5 h-5" />
                                    Email
                                </a>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex justify-center items-center gap-2 text-sm text-muted-foreground mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>{profile.location}</span>
                        </motion.div>
                    </motion.div>
                </section>
            </main>

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
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mis Proyectos</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Algunos de los proyectos en los que he trabajado</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tecnologías y Habilidades</h2>
                        <p className="text-muted-foreground text-lg">Stack tecnológico con el que trabajo</p>
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
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contacto</h2>
                        <p className="text-muted-foreground text-lg">¿Interesado en trabajar juntos? ¡Hablemos!</p>
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
