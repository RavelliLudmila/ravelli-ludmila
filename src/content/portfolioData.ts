import { CONTACT_LINKS, PROJECT_LINKS } from '@/lib/constants';

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    github: string;
    demo: string;
    icon: string;
}

export const projects: ProjectData[] = [
    {
        id: 'psymatch',
        title: 'PsyMatch',
        description: 'Plataforma de conexión entre pacientes y psicólogos con sistema de matching inteligente',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        github: PROJECT_LINKS.PSYMATCH_REPO,
        demo: PROJECT_LINKS.PSYMATCH_DEMO,
        icon: '🧠',
    },
    {
        id: 'aura-ecommerce',
        title: 'Aura Ecommerce',
        description: 'E-commerce completo con carrito de compras, gestión de productos y panel administrativo',
        technologies: ['Next.js', 'React', 'TypeORM', 'PostgreSQL', 'Express.js'],
        github: PROJECT_LINKS.AURA_REPO,
        demo: '#',
        icon: '🛒',
    },
];

export interface ProfileData {
    name: string;
    title: string;
    location: string;
    bio: string;
    email: string;
    linkedin: string;
    github: string;
    languages: { name: string; level: string }[];
}

export const profile: ProfileData = {
    name: 'Ludmila Ravelli',
    title: 'Frontend Developer',
    location: 'Santa Fe, Argentina',
    bio: 'Desarrolladora Frontend especializada en React y Next.js. Estudiante de Tecnicatura Universitaria en Tecnologías de la Información en la UTN. Apasionada por crear experiencias de usuario excepcionales y código limpio.',
    email: CONTACT_LINKS.EMAIL,
    linkedin: CONTACT_LINKS.LINKEDIN,
    github: CONTACT_LINKS.GITHUB,
    languages: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'Intermedio-Alto (B2)' },
    ],
};

export const experience = [
    {
        id: 'henry-ta',
        title: 'Teaching Assistant',
        company: 'Henry',
        period: 'mar 2024 — jul 2024',
        description:
            'Soporte académico a estudiantes en JavaScript, React y desarrollo web. Coordinación de grupos de estudio y resolución de dudas técnicas.',
        technologies: ['JavaScript', 'React', 'Node.js', 'Git'],
    },
];

export const education = [
    {
        id: 'utn-tecnicatura',
        title: 'Tecnicatura Universitaria en Tecnologías de la Información',
        institution: 'UTN (Universidad Tecnológica Nacional)',
        period: 'ago 2023 — actualidad',
        status: 'En curso',
    },
    {
        id: 'henry-bootcamp',
        title: 'Full Stack Web Development Bootcamp',
        institution: 'Henry',
        period: 'sep 2023 — feb 2024',
        status: 'Completado',
    },
];
