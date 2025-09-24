'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/content/portfolioData';
import { useActiveSection, useSmoothScroll } from '@/hooks/use-scroll-animations';

const navItems = [
    { id: 'home', label: 'Inicio', href: '#' },
    { id: 'projects', label: 'Proyectos', href: '#projects' },
    { id: 'skills', label: 'Habilidades', href: '#skills' },
    { id: 'contact', label: 'Contacto', href: '#contact' },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const activeSection = useActiveSection(['home', 'projects', 'skills', 'contact']);
    const { scrollToSection } = useSmoothScroll();

    const handleNavigation = (sectionId: string) => {
        scrollToSection(sectionId);
        setIsOpen(false);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
            >
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-bold text-foreground cursor-pointer"
                            onClick={() => handleNavigation('home')}
                        >
                            LR
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id)}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${
                                        activeSection === item.id
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Button variant="ghost" size="sm" asChild>
                                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href={`mailto:${profile.email}`}>
                                    <Mail className="w-4 h-4" />
                                </a>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-[73px] left-0 right-0 z-40 bg-background border-b border-border md:hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id)}
                                    className={`block w-full text-left text-sm font-medium transition-colors hover:text-primary ${
                                        activeSection === item.id
                                            ? 'text-primary'
                                            : 'text-muted-foreground'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            
                            <div className="flex items-center space-x-3 pt-4 border-t border-border">
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4" />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <a href={`mailto:${profile.email}`}>
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}