# 💬 Portfolio WhatsApp | Ludmila Ravelli

<div align="center">

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ravelliludmila)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RavelliLudmila)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

## 🌟 Sobre el Proyecto

Un **portfolio interactivo y único** que simula la experiencia de WhatsApp para mostrar mi información profesional de manera creativa e innovadora. Esta aplicación combina diseño moderno con una navegación intuitiva, ofreciendo una experiencia de usuario memorable.

### ✨ Características Principales

-   🎨 **Diseño WhatsApp-like**: Interfaz familiar y fácil de usar
-   📱 **Completamente Responsive**: Adaptado para móviles y desktop
-   ⚡ **Navegación Interactiva**: ChatBot inteligente para explorar secciones
-   🎭 **Splash Screen**: Animación de bienvenida personalizada
-   📧 **Formulario de Contacto**: Integrado con EmailJS
-   🔗 **Enlaces Dinámicos**: Acceso directo a proyectos y redes sociales
-   ⚡ **Optimización de Rendimiento**: Carga rápida y smooth animations

## 🛠️ Tecnologías Utilizadas

### Frontend

-   **Next.js 15** - Framework de React para producción
-   **React 19** - Biblioteca para interfaces de usuario
-   **TypeScript** - Tipado estático para JavaScript
-   **Tailwind CSS** - Framework de CSS utilitario

### UI/UX

-   **Framer Motion** - Animaciones fluidas y transiciones
-   **Radix UI** - Componentes accesibles y primitivos
-   **Lucide React** - Iconografía moderna y consistente
-   **Class Variance Authority** - Sistema de variantes para componentes

### Funcionalidades

-   **EmailJS** - Servicio de envío de emails
-   **Formik + Yup** - Manejo y validación de formularios
-   **React Hooks** - Estado y lógica de componentes

## 🎯 Secciones Incluidas

-   👋 **About Me** - Información personal y profesional
-   💼 **Skills** - Tecnologías y herramientas que manejo
-   🚀 **Proyectos** - Portfolio de trabajos realizados
-   💼 **Experiencia** - Trayectoria profesional
-   📞 **Contacto** - Formulario de contacto directo

## 🚀 Inicio Rápido

### Prerrequisitos

-   Node.js (versión 18 o superior)
-   npm, yarn, pnpm o bun

### Instalación

1. **Clona el repositorio**

    ```bash
    git clone https://github.com/RavelliLudmila/ravelli-ludmila.git
    cd ravelli-ludmila
    ```

2. **Instala las dependencias**

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

3. **Ejecuta el servidor de desarrollo**

    ```bash
    npm run dev
    # o
    yarn dev
    # o
    pnpm dev
    ```

4. **Abre tu navegador**

    Navega a [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── contact/       # Endpoint de contacto
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base (botones, cards, etc.)
│   ├── chat-*            # Componentes del chat
│   ├── contact-form.tsx  # Formulario de contacto
│   ├── splash-screen.tsx # Pantalla de bienvenida
│   └── ...               # Otros componentes
├── content/              # Contenido de la aplicación
│   └── chatData.ts       # Datos de las conversaciones
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y constantes
└── ...
```

## 🎨 Personalización

### Modificar Contenido

-   **Datos personales**: Edita `src/content/chatData.ts`
-   **Enlaces y constantes**: Modifica `src/lib/constants.ts`
-   **Estilos**: Personaliza en `src/app/globals.css` y componentes

### Configuración de EmailJS

Para que funcione el formulario de contacto, configura tus credenciales de EmailJS en las variables de entorno o directamente en el componente.

## 📱 Características Responsivas

-   **Mobile First**: Diseñado primero para móviles
-   **Breakpoints Adaptativos**: Diferentes vistas para tablet y desktop
-   **Navegación Contextual**: Cambio automático entre vistas según el dispositivo
-   **Touch-Friendly**: Optimizado para dispositivos táctiles

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio con [Vercel](https://vercel.com)
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Despliega con un solo click

### Otras Plataformas

Este proyecto Next.js puede desplegarse en cualquier plataforma que soporte Node.js:

-   Netlify
-   Railway
-   AWS Amplify
-   DigitalOcean App Platform

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este portfolio:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📬 Contacto

**Ludmila Ravelli** - Frontend Developer

-   📧 Email: [lud.ravelli@gmail.com](https://mail.google.com/mail/u/0/?to=lud.ravelli@gmail.com&su=Oportunidad+Laboral&body=Hola+Ludmila,%0A%0AHe+visto+tu+portfolio+y+me+interesa+conocer+m%C3%A1s+sobre+tu+experiencia+como+Frontend+Developer.%0A%0A%5BEscribe+tu+mensaje+aqu%C3%AD%5D%0A%0ASaludos,+%5BTu+Nombre%5D.&fs=1&tf=cm)
-   💼 LinkedIn: [ravelliludmila](https://linkedin.com/in/ravelliludmila)
-   🐱 GitHub: [RavelliLudmila](https://github.com/RavelliLudmila)
-   📍 Ubicación: Santa Fe, Argentina

---

<div align="center">
  <p>⭐ ¡Si te gustó este proyecto, no olvides darle una estrella!</p>
  <p>Desarrollado con ❤️ por <a href="https://github.com/RavelliLudmila">Ludmila Ravelli</a></p>
</div>
