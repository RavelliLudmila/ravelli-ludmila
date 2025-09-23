import { useState, useEffect, RefObject } from 'react';

interface UseScrollToTopOptions {
    threshold?: number;
    containerRef: RefObject<HTMLDivElement>;
}

export function useScrollToTop({ threshold = 200, containerRef }: UseScrollToTopOptions) {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const containerScrollTop = container.scrollTop;
            const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            const scrollTop = containerScrollTop > 0 ? containerScrollTop : windowScrollTop;

            let scrollHeight, clientHeight;
            if (containerScrollTop > 0) {
                scrollHeight = container.scrollHeight;
                clientHeight = container.clientHeight;
            } else {
                scrollHeight = document.documentElement.scrollHeight;
                clientHeight = window.innerHeight;
            }

            const hasScrollableContent = scrollHeight > clientHeight + 50;
            const isScrolledDown = scrollTop > threshold;
            const shouldShow = isScrolledDown && hasScrollableContent;

            setShowScrollButton(shouldShow);
        };

        container.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold, containerRef]);

    const scrollToTop = () => {
        const container = containerRef.current;

        if (container && container.scrollTop > 0) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return { showScrollButton, scrollToTop };
}
