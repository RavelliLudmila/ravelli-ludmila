export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
    }
};

export const downloadCV = () => {
    // Placeholder para descarga de CV
    console.log('Downloading CV...');
    // Aquí iría la lógica para descargar el CV
};