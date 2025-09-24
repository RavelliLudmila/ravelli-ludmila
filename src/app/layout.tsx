import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`font-sans ${poppins.variable} antialiased`}>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </body>
        </html>
    );
}
