'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollOptions {
    threshold?: number;
    rootMargin?: string;
}

export function useScrollAnimation(options: ScrollOptions = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<Element | null>(null);

    const { threshold = 0.1, rootMargin = '0px' } = options;

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold, rootMargin }
        );

        observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [ref, threshold, rootMargin]);

    const elementRef = useCallback((node: Element | null) => {
        if (node) setRef(node);
    }, []);

    return { isVisible, ref: elementRef };
}

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = scrollPx / winHeightPx;
            setScrollProgress(Math.min(scrolled * 100, 100));
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial call

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return scrollProgress;
}

export function useActiveSection(sections: string[]) {
    const [activeSection, setActiveSection] = useState(sections[0] || '');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections.slice().reverse()) {
                const element = sectionId === 'home' 
                    ? document.body 
                    : document.getElementById(sectionId);
                
                if (element) {
                    const offsetTop = sectionId === 'home' ? 0 : element.offsetTop;
                    if (scrollPosition >= offsetTop) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    return activeSection;
}

export function useSmoothScroll() {
    const scrollToSection = useCallback((sectionId: string) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80; // Account for fixed header
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    }, []);

    return { scrollToSection };
}