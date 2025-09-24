import type { ChatMessage } from '@/content/chatData';
import { CONTACT_BUTTONS, CONTACT_LINKS } from '@/lib/constants';

export const SECTION_SUMMARIES = {
    about: [
        { from: 'me' as const, text: 'Soy Ludmila Ravelli, Full Stack Developer desde Santa Fe, Argentina.' },
        { from: 'me' as const, text: 'Estudio en la UTN y completé el Bootcamp de Henry como estudiante y TA.' },
        { from: 'me' as const, text: 'Busco mi primer rol remoto para seguir creciendo en desarrollo full stack.' },
    ],
    skills: [
        { from: 'me' as const, text: 'Frontend: React 19, Next.js 15, TypeScript, JavaScript (ES6+).' },
        { from: 'me' as const, text: 'UI: Tailwind CSS, shadcn/ui, diseño responsive y mobile-first.' },
        { from: 'me' as const, text: 'Backend: Node.js, Express.js, PostgreSQL, MongoDB, TypeORM.' },
    ],
    projects: [
        { from: 'me' as const, text: 'PsyMatch — Plataforma de conexión psicólogo-paciente completa.' },
        { from: 'me' as const, text: 'Aura E-commerce — Tienda online full-stack con funcionalidades avanzadas.' },
        { from: 'me' as const, text: 'Portfolio Profesional — Diseño moderno con funcionalidades interactivas.' },
    ],
    experience: [
        { from: 'me' as const, text: 'Freelance Full Stack Developer (sep 2025 — actualidad).' },
        { from: 'me' as const, text: 'Teaching Assistant Henry (jul 2025 — sept 2025).' },
        { from: 'me' as const, text: 'Estudiante Full Stack Henry (abr 2025 — sept 2025).' },
    ],
    education: [
        { from: 'me' as const, text: 'UTN — Tecnicatura en Tecnologías de la Información (2023-actualidad).' },
        { from: 'me' as const, text: 'Henry — Bootcamp Full Stack 3.0 + Teaching Assistant.' },
    ],
    recommendations: [
        { from: 'me' as const, text: 'Referencias de Henry: "Excelentes habilidades técnicas y de liderazgo."' },
        { from: 'me' as const, text: 'Estudiantes: "Explicaciones claras y siempre disponible para ayudar."' },
        { from: 'me' as const, text: 'Clientes: "Trabajo excepcional, entregó más de lo esperado."' },
    ],
    contact: [
        { from: 'me' as const, text: 'Formulario conversacional para contacto directo.' },
        { from: 'me' as const, text: `Tu mensaje llegará a ${CONTACT_LINKS.EMAIL}` },
        {
            from: 'me' as const,
            text: `**Contacto rápido:**\n *Ubicación:* Santa Fe, Argentina\n *Email:* ${CONTACT_LINKS.EMAIL}\n *LinkedIn:* Ludmila Ravelli\n *GitHub:* RavelliLudmila`,
            buttons: CONTACT_BUTTONS,
        },
    ],
};

export const SECTION_BUTTONS = [
    { label: 'About Me', action: 'about' },
    { label: 'Skills', action: 'skills' },
    { label: 'Projects', action: 'projects' },
    { label: 'Experiencia', action: 'experience' },
    { label: 'Educación', action: 'education' },
    { label: 'Recomendaciones', action: 'recommendations' },
    { label: 'Contacto', action: 'contact' },
];

export const ACTION_LABELS: Record<string, string> = {
    about: 'About Me',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experiencia',
    education: 'Educación',
    recommendations: 'Recomendaciones',
    contact: 'Contacto',
    menu: 'Volver al Menú',
    'details-about': 'Ver Detalles de About Me',
    'details-skills': 'Ver Detalles de Skills',
    'details-projects': 'Ver Detalles de Projects',
    'details-experience': 'Ver Detalles de Experiencia',
    'details-education': 'Ver Detalles de Educación',
    'details-recommendations': 'Ver Detalles de Recomendaciones',
    'details-contact': 'Ver Detalles de Contacto',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
};

export function getActionLabel(action: string): string {
    return ACTION_LABELS[action] || action;
}

export function addMessageWithDelay(message: ChatMessage, delay: number, onAddMessage: (message: ChatMessage) => void): void {
    setTimeout(() => {
        onAddMessage(message);
    }, delay);
}

export function addMessagesSequentially(messages: ChatMessage[], onAddMessage: (message: ChatMessage) => void, baseDelay = 1000): void {
    messages.forEach((msg, index) => {
        addMessageWithDelay(msg, (index + 1) * baseDelay, onAddMessage);
    });
}
