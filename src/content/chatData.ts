import { CONTACT_BUTTONS, PROJECT_LINKS, CONTACT_LINKS } from '@/lib/constants';

export type ChatMessage = {
    from: 'me' | 'user';
    fromContact?: string;
    text: string;
    buttons?: { label: string; action: string }[];
};

export type Chat = {
    id: string;
    title: string;
    description: string;
    messages: ChatMessage[];
};

export const chats: Chat[] = [
    {
        id: 'bot',
        title: 'ChatBot',
        description: 'Acceso rápido a todas las secciones',
        messages: [
            {
                from: 'me',
                text: '¿Necesitas ayuda? Selecciona una sección:',
                buttons: [
                    { label: 'About Me', action: 'about' },
                    { label: 'Skills', action: 'skills' },
                    { label: 'Projects', action: 'projects' },
                    { label: 'Experiencia', action: 'experience' },
                    { label: 'Educación', action: 'education' },
                    { label: 'Recomendaciones', action: 'recommendations' },
                    { label: 'Contacto', action: 'contact' },
                ],
            },
        ],
    },
    {
        id: 'about',
        title: 'About Me',
        description: 'Perfil profesional y objetivos',
        messages: [
            {
                from: 'me',
                text: 'Hola — soy **Ludmila Ravelli**. Frontend Developer desde Santa Fe, Argentina.',
            },
            {
                from: 'me',
                text: 'Actualmente curso la Tecnicatura Universitaria en Tecnologías de la Información en la *UTN* (ago 2023 — actualidad).',
            },
            {
                from: 'me',
                text: 'Completé el **Bootcamp Full Stack 3.0** de *Henry* (abr 2025 — sept 2025), donde participé como estudiante y luego como Teaching Assistant.',
            },
            {
                from: 'me',
                text: 'En Henry, como TA, acompañé a más de 100 estudiantes, revisé entregas y guié equipos en *metodologías ágiles* (Scrum, Kanban) y buenas prácticas.',
            },
            {
                from: 'me',
                text: 'Actualmente trabajo como **Freelance Frontend Developer** (sep 2025 — actualidad), desarrollando portfolios, páginas institucionales y e-commerce completos.',
            },
            {
                from: 'me',
                text: 'Mi objetivo profesional: conseguir mi **primer rol como Frontend Developer remoto**, donde pueda seguir aprendiendo y aportando con interfaces limpias y usables.',
            },
            {
                from: 'me',
                text: 'Me especializo en construir interfaces accesibles, performantes y con atención al detalle: componentes reutilizables, *arquitectura limpia* y UX consistente.',
            },
            {
                from: 'me',
                text: 'Trabajo de forma colaborativa, comunico con *claridad* y me adapto rápido a equipos. Busco crecer en proyectos que prioricen calidad de código y *experiencia de usuario*.',
            },
            {
                from: 'me',
                text: '**Contacto rápido:**\n *Ubicación:* Santa Fe, Argentina\n *Email:* lud.ravelli@gmail.com\n *LinkedIn:* Ludmila Ravelli\n *GitHub:* RavelliLudmila',
                buttons: CONTACT_BUTTONS,
            },
        ],
    },
    {
        id: 'skills',
        title: 'Skills',
        description: 'Stack tecnológico y soft skills',
        messages: [
            { from: 'me', text: '**Frontend:** React 19, Next.js 15, TypeScript, JavaScript (ES6+).' },
            { from: 'me', text: '**Estilos & UI:** Tailwind CSS, Radix UI, Flowbite, diseño *responsive* y mobile-first.' },
            { from: 'me', text: '**Forms & Validación:** Formik + Yup; Animaciones con *Framer Motion*.' },
            { from: 'me', text: '**Gestión de estado:** Context API, Custom Hooks.' },
            { from: 'me', text: '**Backend & DB:** Node.js, Express.js, PostgreSQL, MySQL, MongoDB, TypeORM.' },
            { from: 'me', text: '**Lenguajes adicionales:** Java, .Net, C#.' },
            {
                from: 'me',
                text: '**Integraciones:** MercadoPago, Mapbox, Google OAuth. **Herramientas:** Git/GitHub, ESLint, Postman, Trello, Slack.',
            },
            { from: 'me', text: '**Deploy** en Vercel / Render.' },
            { from: 'me', text: '**Metodologías:** Scrum, Kanban, pair programming.' },
            {
                from: 'me',
                text: '**Soft skills:** comunicación efectiva, trabajo en equipo, *liderazgo*, resolución de problemas, atención al detalle.',
            },
        ],
    },
    {
        id: 'projects',
        title: 'Projects',
        description: 'Proyectos destacados',
        messages: [
            { from: 'me', text: '**PsyMatch** — Plataforma de Salud Mental (jul–ago 2025).' },
            {
                from: 'me',
                text: 'Conecta pacientes con profesionales mediante un algoritmo de matching. Incluye dashboards, reservas y **pagos**.',
            },
            {
                from: 'me',
                text: '**Stack:** Next.js 15, React 19, TS, Tailwind, Radix, Formik+Yup, ApexCharts, NestJS, PostgreSQL, TypeORM, Mapbox, MercadoPago, Google OAuth.',
            },
            {
                from: 'me',
                text: `**Links:** Repo: ${PROJECT_LINKS.PSYMATCH_REPO} · Demo: ${PROJECT_LINKS.PSYMATCH_DEMO}`,
            },
            { from: 'me', text: '**Aura** — Tienda de Ropa Deportiva Femenina (jul 2025).' },
            { from: 'me', text: 'E-commerce con carrito persistente, validación de stock y *dashboard de gestión*.' },
            { from: 'me', text: '**Stack:** Next.js 15, React 19, TS, Tailwind, Context API, Formik, next-themes, js-cookie.' },
            { from: 'me', text: `**Links:** Repo: ${PROJECT_LINKS.AURA_REPO} · Demo: ${PROJECT_LINKS.AURA_DEMO}` },
            { from: 'me', text: '**Portfolio Creativo** (sep 2025).' },
            { from: 'me', text: 'Portfolio que refleja identidad profesional, con foco en accesibilidad e *interacciones*.' },
            { from: 'me', text: `**Links:** Repo: ${PROJECT_LINKS.PORTFOLIO_REPO}` },
            { from: 'me', text: '**Stack:** Next.js, React, Tailwind, Framer Motion.' },
        ],
    },
    {
        id: 'experience',
        title: 'Experiencia Profesional',
        description: 'Experiencia laboral y voluntariado',
        messages: [
            { from: 'me', text: '**Freelance Frontend Developer** — sep 2025 - actualidad.' },
            { from: 'me', text: 'Diseño y desarrollo de portfolios, páginas institucionales y e-commerce completos con Next.js y React.' },
            { from: 'me', text: 'Implementación de integraciones de pago (MercadoPago) y gestión de stock.' },
            { from: 'me', text: 'Diseño de interfaces en Figma priorizando accesibilidad y experiencia de usuario.' },
            { from: 'me', text: '**Full Stack Teaching Assistant** — Henry Bootcamp (jul 2025 - actualidad).' },
            { from: 'me', text: 'Soporte técnico a estudiantes en React, Node.js y PostgreSQL, promoviendo colaboración mediante pair programming.' },
            { from: 'me', text: 'Coordinación de grupos de estudiantes para fomentar integración y comunicación efectiva.' },
            { from: 'me', text: 'Revisión y depuración de entregas de proyectos, asegurando calidad de código y cumplimiento de deadlines.' },
            { from: 'me', text: 'Guía en adopción de metodologías ágiles y estándares de la industria.' },
        ],
    },
    {
        id: 'education',
        title: 'Educación y Certificaciones',
        description: 'UTN, Henry, inglés',
        messages: [
            {
                from: 'me',
                text: '**UTN** — Tecnicatura Universitaria en Tecnologías de la Información (ago 2023 — actualidad). Materias: Algoritmos, Programación I & II, Bases de Datos, Análisis de Sistemas.',
            },
            {
                from: 'me',
                text: '**Henry** — Bootcamp Full Stack 3.0 (abr 2025 — sep 2025). Proyectos reales, pair programming y *metodologías ágiles*.',
            },
            {
                from: 'me',
                text: `**Certificado de inglés EF SET:** 46/100 — Nivel B1 Intermedio. ${PROJECT_LINKS.ENGLISH_CERT}`,
            },
        ],
    },
    {
        id: 'recommendations',
        title: 'Recomendaciones',
        description: 'Opiniones de colegas y mentores',
        messages: [
            {
                from: 'me',
                fromContact: 'Matías Camba',
                text: 'Con apenas veinte y algo de años, Ludmila ya reúne dos cualidades clave: **talento** y comunicación. Inspira y *motiva a crecer*.',
            },
            {
                from: 'me',
                fromContact: 'Andrea Larsen',
                text: 'Desde el inicio se destacó por su **disposición para ayudar** y su *curiosidad* por las nuevas tecnologías.',
            },
            {
                from: 'me',
                fromContact: 'Luis Miguel Alfonzo Roca',
                text: 'Su capacidad para **liderar** y presentar el demo fue clave para transmitir valor y generar *confianza*.',
            },
            {
                from: 'me',
                fromContact: 'Morena Martín',
                text: 'Propuso la **idea inicial**, diseñó en *Figma* y lideró el frontend. Responsable y *clara al comunicar*.',
            },
            {
                from: 'me',
                fromContact: 'Mauricio Herrera',
                text: 'Profesional capaz, inteligente y *talentosa*. Eleva al equipo con su **compromiso** y comunicación.',
            },
            {
                from: 'me',
                fromContact: 'Francisco D’Alessandro',
                text: 'Constante, curiosa y en búsqueda de la excelencia. Perfil ideal para crecer y aportar valor.',
            },
            {
                from: 'me',
                text: 'Ver recomendaciones completas en LinkedIn',
                buttons: [{ label: 'Abrir LinkedIn', action: CONTACT_LINKS.LINKEDIN_RECOMMENDATIONS }],
            },
        ],
    },
    {
        id: 'contact',
        title: 'Contacto',
        description: 'Formulario conversacional',
        messages: [
            { from: 'me', text: 'Al finalizar esta conversación, tu mensaje llegará a **lud.ravelli@gmail.com**.' },
            {
                from: 'me' as const,
                text: '**Contacto rápido:**\n *Ubicación:* Santa Fe, Argentina\n *Email:* lud.ravelli@gmail.com\n *LinkedIn:* Ludmila Ravelli\n *GitHub:* RavelliLudmila',
                buttons: CONTACT_BUTTONS,
            },
            {
                from: 'me',
                text: '¿Quieres comenzar ahora?',
                buttons: [{ label: 'Comenzar', action: 'start-form' }],
            },
        ],
    },
];
