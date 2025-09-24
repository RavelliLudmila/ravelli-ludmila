import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { ScrollProgressIndicator } from '@/components/scroll-progress-indicator';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'Ludmila Ravelli - Full Stack Developer',
    description: 'Portfolio profesional de Ludmila Ravelli - Full Stack Developer especializada en React, Next.js y tecnologías web modernas',
    keywords: ['Ludmila Ravelli', 'Full Stack Developer', 'React', 'Next.js', 'Node.js', 'TypeScript'],
    authors: [{ name: 'Ludmila Ravelli' }],
    creator: 'Ludmila Ravelli',
    openGraph: {
        title: 'Ludmila Ravelli - Full Stack Developer',
        description: 'Portfolio profesional de Ludmila Ravelli - Full Stack Developer especializada en React, Next.js y tecnologías web modernas',
        url: 'https://ludmila-ravelli.vercel.app',
        siteName: 'Ludmila Ravelli Portfolio',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ludmila Ravelli - Full Stack Developer',
        description: 'Portfolio profesional de Ludmila Ravelli - Full Stack Developer especializada en React, Next.js y tecnologías web modernas',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`font-poppins ${poppins.variable} antialiased bg-background text-foreground`}>
                <ScrollProgressIndicator />
                <Navigation />
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </body>
        </html>
    );
}
