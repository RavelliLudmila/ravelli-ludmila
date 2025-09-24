import { CONTACT_BUTTONS } from '@/lib/constants';

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
                text: 'Hola — soy **Ludmila Ravelli**. Full Stack Developer desde Santa Fe, Argentina.',
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
                text: 'Actualmente trabajo como **Freelance Full Stack Developer** (sep 2025 — actualidad), desarrollando portfolios, páginas institucionales y e-commerce completos.',
            },
            {
                from: 'me',
                text: 'Mi objetivo profesional: conseguir mi **primer rol como Full Stack Developer remoto**, donde pueda seguir aprendiendo y aportando con soluciones completas.',
            },
            {
                from: 'me',
                text: 'Me especializo en construir aplicaciones completas: desde interfaces accesibles hasta APIs robustas, con atención al detalle y *arquitectura limpia*.',
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
            { from: 'me', text: '**Estilos & UI:** Tailwind CSS, Radix UI, shadcn/ui, diseño *responsive* y mobile-first.' },
            { from: 'me', text: '**Forms & Validación:** Formik + Yup; Animaciones con *Framer Motion*.' },
            { from: 'me', text: '**Gestión de estado:** Context API, Custom Hooks, Zustand.' },
            { from: 'me', text: '**Backend & DB:** Node.js, Express.js, PostgreSQL, MySQL, MongoDB, TypeORM.' },
            { from: 'me', text: '**Lenguajes adicionales:** Java, Python, C#, .NET.' },
            {
                from: 'me',
                text: '**Integraciones:** MercadoPago, OAuth, APIs RESTful. **Herramientas:** Git/GitHub, Docker, ESLint, Postman, Trello.',
            },
            { from: 'me', text: '**Deploy:** Vercel, Render, AWS, Railway.' },
            { from: 'me', text: '**Metodologías:** Scrum, Kanban, pair programming, TDD.' },
            {
                from: 'me',
                text: '**Soft Skills:** Comunicación efectiva, resolución de problemas, trabajo en equipo, aprendizaje continuo.',
                buttons: [
                    { label: 'Ver Proyectos', action: 'projects' },
                    { label: 'Contacto', action: 'contact' },
                    { label: 'Menú Principal', action: 'menu' },
                ],
            },
        ],
    },
    {
        id: 'projects',
        title: 'Proyectos',
        description: 'Desarrollos destacados',
        messages: [
            {
                from: 'me',
                text: '**PsyMatch** — Plataforma de conexión psicólogo-paciente',
            },
            {
                from: 'me',
                text: 'App completa que facilita la búsqueda y reserva de citas con psicólogos. Frontend en *React + TypeScript*, backend *Node.js + Express*, base de datos *PostgreSQL*.',
            },
            {
                from: 'me',
                text: 'Características: autenticación OAuth, sistema de reservas, dashboard administrativo, pasarela de pagos MercadoPago, geolocalización con Mapbox.',
            },
            {
                from: 'me',
                text: '**Aura E-commerce** — Tienda online completa',
            },
            {
                from: 'me',
                text: 'E-commerce full-stack para productos de tecnología. *Next.js 15 + TypeScript*, backend *Node.js*, base de datos *PostgreSQL* con TypeORM.',
            },
            {
                from: 'me',
                text: 'Funcionalidades: carrito de compras, gestión de usuarios, panel admin, categorización de productos, sistema de órdenes completo.',
            },
            {
                from: 'me',
                text: 'Ambos proyectos incluyen: diseño responsive, animaciones fluidas, código limpio y documentado, testing, deploy en producción.',
                buttons: [
                    { label: 'GitHub', action: 'github' },
                    { label: 'LinkedIn', action: 'linkedin' },
                    { label: 'Contacto', action: 'contact' },
                    { label: 'Menú Principal', action: 'menu' },
                ],
            },
        ],
    },
    {
        id: 'experience',
        title: 'Experiencia',
        description: 'Trayectoria profesional',
        messages: [
            {
                from: 'me',
                text: '**Freelance Full Stack Developer** (sep 2025 — actualidad)',
            },
            {
                from: 'me',
                text: 'Desarrollo de aplicaciones web completas: portfolios profesionales, páginas institucionales y e-commerce. Trabajo directo con clientes, desde análisis de requerimientos hasta deploy.',
            },
            {
                from: 'me',
                text: '**Teaching Assistant - Henry Bootcamp** (jul 2025 — sept 2025)',
            },
            {
                from: 'me',
                text: 'Acompañé +100 estudiantes en su proceso de aprendizaje. Revisión de entregas, mentoría técnica, coordinación de equipos en metodologías ágiles.',
            },
            {
                from: 'me',
                text: '**Estudiante Full Stack - Henry** (abr 2025 — sept 2025)',
            },
            {
                from: 'me',
                text: 'Bootcamp intensivo de 700+ horas. Desarrollo de proyectos individuales y grupales usando tecnologías modernas. Enfoque en buenas prácticas y trabajo colaborativo.',
            },
            {
                from: 'me',
                text: 'Durante todas las experiencias: participación activa en code reviews, implementación de mejores prácticas, documentación técnica.',
                buttons: [
                    { label: 'Ver Educación', action: 'education' },
                    { label: 'Contacto', action: 'contact' },
                    { label: 'Menú Principal', action: 'menu' },
                ],
            },
        ],
    },
    {
        id: 'education',
        title: 'Educación',
        description: 'Formación académica y certificaciones',
        messages: [
            {
                from: 'me',
                text: '**Tecnicatura Universitaria en Tecnologías de la Información** - *UTN*',
            },
            {
                from: 'me',
                text: 'Agosto 2023 — Actualidad. Formación universitaria en desarrollo de software, bases de datos, arquitectura de sistemas.',
            },
            {
                from: 'me',
                text: '**Bootcamp Full Stack 3.0** - *Henry*',
            },
            {
                from: 'me',
                text: 'Abril 2025 — Septiembre 2025. 700+ horas de formación intensiva. JavaScript, React, Node.js, PostgreSQL, metodologías ágiles.',
            },
            {
                from: 'me',
                text: '**Certificaciones adicionales:**\n• TypeScript Fundamentals\n• React Advanced Patterns\n• Node.js & Express Mastery\n• Database Design & PostgreSQL',
            },
            {
                from: 'me',
                text: '**Formación continua:** Cursos especializados en Next.js 15, arquitectura de software, testing, y mejores prácticas de desarrollo.',
                buttons: [
                    { label: 'Ver Skills', action: 'skills' },
                    { label: 'Contacto', action: 'contact' },
                    { label: 'Menú Principal', action: 'menu' },
                ],
            },
        ],
    },
    {
        id: 'recommendations',
        title: 'Recomendaciones',
        description: 'Referencias profesionales',
        messages: [
            {
                from: 'me',
                text: '**Referencias de Henry Bootcamp:**',
            },
            {
                from: 'me',
                text: '"Ludmila demostró excelentes habilidades técnicas y de liderazgo como Teaching Assistant. Su capacidad para explicar conceptos complejos y guiar estudiantes fue excepcional."',
            },
            {
                from: 'me',
                text: '**Testimonio de estudiantes mentoreados:**',
            },
            {
                from: 'me',
                text: '"Gracias a Ludmila pude entender React y TypeScript de manera clara. Siempre estuvo disponible para resolver dudas y nos ayudó a implementar mejores prácticas."',
            },
            {
                from: 'me',
                text: '**Referencias de clientes freelance:**',
            },
            {
                from: 'me',
                text: '"Trabajo excepcional en el desarrollo de nuestro e-commerce. Entregó a tiempo, con código limpio y funcionalidades que superaron nuestras expectativas."',
            },
            {
                from: 'me',
                text: 'Disponible para proporcionar contactos de referencias específicas según sea necesario.',
                buttons: [
                    { label: 'LinkedIn', action: 'linkedin' },
                    { label: 'Contacto', action: 'contact' },
                    { label: 'Menú Principal', action: 'menu' },
                ],
            },
        ],
    },
];

export const contactChat: Chat = {
    id: 'contact',
    title: 'Contacto',
    description: 'Hablemos de tu proyecto',
    messages: [
        {
            from: 'me',
            text: '¡Perfecto! Me encanta conocer proyectos nuevos. ¿Cuál es la mejor forma de contactarte?',
            buttons: CONTACT_BUTTONS,
        },
    ],
};
