'use client';

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import type { Chat, ChatMessage } from '@/content/chatData';
import { MessageBubble } from '@/components/message-bubble';
import { TypingIndicator } from '@/components/typing-indicator';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { Button } from '@/components/ui/button';
import { SendHorizontal, ChevronLeft } from 'lucide-react';
import { CONTACT_BUTTONS, CONTACT_LINKS } from '@/lib/constants';
import { SECTION_SUMMARIES, SECTION_BUTTONS } from '@/lib/chat-utils';

interface ChatConversationProps {
    chat: Chat;
    onBack?: () => void;
    onNavigateToChat?: (chatId: string) => void;
}

export function ChatConversation({ chat, onBack, onNavigateToChat }: ChatConversationProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isContactMode, setIsContactMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
    const [contactFormState, setContactFormState] = useState<{
        currentStep: 'initial' | 'name' | 'email' | 'project' | 'timeline' | 'reference' | 'summary' | 'completed';
        formData: Partial<{ name: string; email: string; project: string; timeline: string; reference: string }>;
    }>({
        currentStep: 'initial',
        formData: {},
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { showScrollButton, scrollToTop } = useScrollToTop({
        containerRef,
        threshold: onBack ? 100 : 200,
    });

    useEffect(() => {
        setMessages([]);
        setIsTyping(false);
        setIsInitialLoadComplete(false);
        setInputValue('');
        setContactFormState({ currentStep: 'initial', formData: {} });

        if (chat.id === 'bot' || chat.id === 'contact') {
            setIsContactMode(chat.id === 'contact');
            setTimeout(() => {
                loadMessagesWithTyping();
            }, 100);
        } else {
            const uniqueMessages = chat.messages.filter(
                (message, index, self) => index === self.findIndex((m) => m.text === message.text && m.from === message.from)
            );
            setMessages(uniqueMessages);
            setIsContactMode(false);
            setIsInitialLoadComplete(true);
        }

        setTimeout(() => {
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    }, [chat.id]);

    useEffect(() => {
        if (chat.id === 'contact' || chat.id === 'bot') {
            const scrollToBottom = () => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            };

            const timer = setTimeout(scrollToBottom, 100);
            return () => clearTimeout(timer);
        }
    }, [messages, isTyping, chat.id]);

    const loadMessagesWithTyping = async () => {
        setIsInitialLoadComplete(false);

        for (let i = 0; i < chat.messages.length; i++) {
            setIsTyping(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setIsTyping(false);
            setMessages((prev) => {
                const newMessage = chat.messages[i];
                const exists = prev.some(
                    (msg) =>
                        msg.text === newMessage.text &&
                        msg.from === newMessage.from &&
                        JSON.stringify(msg.buttons || []) === JSON.stringify(newMessage.buttons || [])
                );

                return exists ? prev : [...prev, newMessage];
            });

            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setIsInitialLoadComplete(true);
    };

    const handleBotAction = (action: string) => {
        if (onNavigateToChat && ['about', 'skills', 'projects', 'education', 'recommendations', 'contact'].includes(action)) {
            onNavigateToChat(action);
        }
    };

    const handleBotButtonClick = (action: string) => {
        const actionLabels: Record<string, string> = {
            about: 'About Me',
            skills: 'Skills',
            projects: 'Projects',
            education: 'Educación',
            recommendations: 'Recomendaciones',
            contact: 'Contacto',
            menu: 'Volver al Menú',
            'details-about': 'Ver Detalles de About Me',
            'details-skills': 'Ver Detalles de Skills',
            'details-projects': 'Ver Detalles de Projects',
            'details-education': 'Ver Detalles de Educación',
            'details-recommendations': 'Ver Detalles de Recomendaciones',
            'details-contact': 'Ver Detalles de Contacto',
        };

        setMessages((prev) => [...prev, { from: 'user', text: actionLabels[action] || action }]);

        if (action === 'menu') {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        from: 'me',
                        text: '¿Necesitas ayuda? Selecciona una sección:',
                        buttons: SECTION_BUTTONS,
                    },
                ]);
            }, 500);
            return;
        }

        if (['about', 'skills', 'projects', 'education', 'recommendations', 'contact'].includes(action)) {
            const sectionMessages = SECTION_SUMMARIES[action as keyof typeof SECTION_SUMMARIES] || [];

            sectionMessages.forEach((msg, index) => {
                setTimeout(() => {
                    setMessages((prev) => [...prev, msg]);
                }, (index + 1) * 1000);
            });

            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        from: 'me',
                        text: '¿Qué te gustaría hacer?',
                        buttons: [
                            { label: 'Volver al Menú', action: 'menu' },
                            { label: 'Ver Detalles', action: `details-${action}` },
                        ],
                    },
                ]);
            }, sectionMessages.length * 1000 + 500);
            return;
        }

        if (action.startsWith('details-')) {
            const section = action.replace('details-', '');
            onNavigateToChat?.(section);
            return;
        }
    };

    const handleContactButtonClick = async (action: string) => {
        if (action === 'send') {
            setMessages((prev) => [...prev, { from: 'user', text: 'Enviar' }]);

            try {
                const templateParams = {
                    from_name: contactFormState.formData.name || '',
                    from_email: contactFormState.formData.email || '',
                    project: contactFormState.formData.project || '',
                    timeline: contactFormState.formData.timeline || '',
                    reference: contactFormState.formData.reference || '',
                    to_email: CONTACT_LINKS.EMAIL,
                };

                const response = await emailjs.send('service_rwu98wp', 'template_h6b2oxp', templateParams, '4wN4T4JYzHW4g0u61');

                if (response.status === 200) {
                    setTimeout(() => {
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: `¡Perfecto! Tu mensaje ha sido enviado a ${CONTACT_LINKS.EMAIL}. Te responderé pronto. ✨`,
                            },
                        ]);
                        setContactFormState({ currentStep: 'completed', formData: {} });
                    }, 1000);
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (error) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            from: 'me',
                            text: `Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o escríbeme directamente a ${CONTACT_LINKS.EMAIL}`,
                        },
                    ]);
                }, 1000);
            }
        } else if (action === 'cancel') {
            setMessages((prev) => [...prev, { from: 'user', text: 'Cancelar' }]);
            setContactFormState({ currentStep: 'initial', formData: {} });
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        from: 'me',
                        text: 'No hay problema. ¿Quieres **comenzar de nuevo**?',
                        buttons: [
                            { label: 'Comenzar Formulario', action: 'start-form' },
                            { label: 'Contacto Rápido', action: 'quick-contact' },
                        ],
                    },
                ]);
            }, 500);
        } else if (action === 'start-form') {
            setMessages((prev) => [...prev, { from: 'user', text: 'Comenzar Formulario' }]);
            setContactFormState((prev) => ({ ...prev, currentStep: 'name' }));
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        from: 'me',
                        text: '¡Perfecto! Empecemos. ¿Cuál es tu **nombre**?',
                    },
                ]);
            }, 500);
        } else if (action === 'quick-contact') {
            setMessages((prev) => [...prev, { from: 'user', text: 'Contacto Rápido' }]);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        from: 'me',
                        text: `¡Perfecto! Aquí tienes mis datos de contacto:\n\n **Email:** ${CONTACT_LINKS.EMAIL}\n **LinkedIn:** Ludmila Ravelli\n **GitHub:** RavelliLudmila\n **Ubicación:** Santa Fe, Argentina`,
                        buttons: CONTACT_BUTTONS,
                    },
                ]);
            }, 500);
        }
    };

    const getButtonClickHandler = () => {
        if (!isInitialLoadComplete) return undefined;

        if (chat.id === 'bot') return handleBotButtonClick;
        if (chat.id === 'contact') return handleContactButtonClick;
        return undefined;
    };

    const handleContactInput = async (value: string) => {
        const { currentStep } = contactFormState;
        const canSubmitEmpty = currentStep === 'timeline' || currentStep === 'reference';

        if (chat.id === 'contact' && (value.trim() || canSubmitEmpty)) {
            const userMessage: ChatMessage = { from: 'user', text: value.trim() || 'Saltar' };
            setMessages((prev) => [...prev, userMessage]);
            setInputValue('');

            if (value.trim().toLowerCase() === 'cancelar') {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            from: 'me',
                            text: 'No hay problema. ¿Quieres **comenzar de nuevo**?',
                            buttons: [
                                { label: 'Comenzar Formulario', action: 'start-form' },
                                { label: 'Contacto Rápido', action: 'quick-contact' },
                            ],
                        },
                    ]);
                }, 1000);
                setContactFormState({ currentStep: 'initial', formData: {} });
                return;
            }

            const { currentStep, formData } = contactFormState;

            if (['name', 'email', 'project', 'timeline', 'reference'].includes(currentStep)) {
                const newFormData = { ...formData, [currentStep]: value };
                setContactFormState((prev) => ({ ...prev, formData: newFormData }));

                const steps = {
                    name: () => {
                        setContactFormState((prev) => ({ ...prev, currentStep: 'email' }));
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: `Hola **${value}**! ¿Cuál es tu *email*?`,
                            },
                        ]);
                    },
                    email: () => {
                        setContactFormState((prev) => ({ ...prev, currentStep: 'project' }));
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: 'Perfecto. Cuéntame sobre tu **proyecto** o idea:',
                            },
                        ]);
                    },
                    project: () => {
                        setContactFormState((prev) => ({ ...prev, currentStep: 'timeline' }));
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: '¡Interesante! ¿Cuál es tu *timeline* estimado? (opcional)\n\n**Presiona Enter para continuar**',
                            },
                        ]);
                    },
                    timeline: () => {
                        setContactFormState((prev) => ({ ...prev, currentStep: 'reference' }));
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: '¿Cómo *conociste* mi trabajo? (opcional)\n\n**Presiona Enter para continuar**',
                            },
                        ]);
                    },
                    reference: () => {
                        const finalData = { ...newFormData, reference: value };
                        setContactFormState((prev) => ({ ...prev, currentStep: 'summary' }));
                        setMessages((prev) => [
                            ...prev,
                            {
                                from: 'me',
                                text: `**Resumen de tu consulta:**\n\n📝 **Nombre:** ${finalData.name}\n📧 **Email:** ${
                                    finalData.email
                                }\n🚀 **Proyecto:** ${finalData.project}\n${
                                    finalData.timeline && finalData.timeline.trim() ? `⏰ **Timeline:** ${finalData.timeline}\n` : ''
                                }${finalData.reference && finalData.reference.trim() ? `🔗 **Referencia:** ${finalData.reference}` : ''}`,
                                buttons: [
                                    { label: '✅ Enviar', action: 'send' },
                                    { label: '❌ Cancelar', action: 'cancel' },
                                ],
                            },
                        ]);
                    },
                };

                steps[currentStep as keyof typeof steps]?.();
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && chat.id === 'contact') {
            e.preventDefault();
            handleContactInput(inputValue);
        }
    };

    const getAvatarMayus = (title: string) => {
        return title.replace(/[^A-Z]/g, '');
    };

    const getGradientClass = (id: string) => {
        const gradients = {
            bot: 'from-pink-300 to-purple-300',
            about: 'from-purple-300 to-blue-300',
            skills: 'from-blue-300 to-teal-300',
            projects: 'from-teal-300 to-green-300',
            education: 'from-green-300 to-yellow-300',
            recommendations: 'from-yellow-300 to-orange-300',
            contact: 'from-orange-300 to-pink-300',
        };
        return gradients[id as keyof typeof gradients] || 'from-pink-300 to-purple-300';
    };

    return (
        <div className="h-full min-h-screen flex flex-col bg-background">
            <div
                className={`p-4 border-b border-border bg-background flex items-center gap-3 ${
                    onBack ? 'fixed top-0 left-0 right-0 z-20 md:sticky md:left-auto md:right-auto' : ''
                }`}
            >
                {onBack && (
                    <Button variant="ghost" size="sm" onClick={onBack}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                )}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getGradientClass(chat.id)} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">{getAvatarMayus(chat.title)}</span>
                </div>
                <div>
                    <h2 className="font-semibold text-foreground">{chat.title}</h2>
                    <p className="text-xs text-muted-foreground">{chat.description}</p>
                </div>
            </div>

            <div
                ref={containerRef}
                className={`flex-1 min-h-0 overflow-y-auto p-4 space-y-4 relative ${onBack ? 'pt-20 pb-20 md:pt-4 md:pb-4' : ''}`}
                style={{
                    backgroundImage: `url('/Fondo.png')`,
                    backgroundSize: 'auto',
                    backgroundPosition: 'top left',
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'local',
                    minHeight: onBack ? 'calc(100vh - 160px)' : 'auto',
                }}
            >
                <ScrollToTopButton show={showScrollButton} onClick={scrollToTop} />

                {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} onButtonClick={getButtonClickHandler()} />
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </div>

            <div
                className={`p-4 border-t border-border bg-background ${
                    onBack ? 'fixed bottom-0 left-0 right-0 z-10 md:sticky md:left-auto md:right-auto' : ''
                }`}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                            chat.id === 'contact' && contactFormState.currentStep === 'name'
                                ? 'Tu nombre...'
                                : chat.id === 'contact' && contactFormState.currentStep === 'email'
                                ? 'tu@email.com'
                                : chat.id === 'contact' && contactFormState.currentStep === 'project'
                                ? 'Describe tu proyecto...'
                                : chat.id === 'contact' && contactFormState.currentStep === 'timeline'
                                ? 'Ej: 2-3 meses (opcional)'
                                : chat.id === 'contact' && contactFormState.currentStep === 'reference'
                                ? 'Ej: LinkedIn, referencia... (opcional)'
                                : 'Escribe un mensaje...'
                        }
                        className="flex-1 p-3 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        disabled={
                            !['contact'].includes(chat.id) ||
                            (chat.id === 'contact' && ['initial', 'summary', 'completed'].includes(contactFormState.currentStep))
                        }
                    />
                    <Button
                        size="sm"
                        className="rounded-full w-10 h-10 p-0"
                        disabled={
                            !['contact'].includes(chat.id) ||
                            (chat.id === 'contact' && ['initial', 'summary', 'completed'].includes(contactFormState.currentStep))
                        }
                        onClick={() => handleContactInput(inputValue)}
                    >
                        <SendHorizontal className="w-4 h-4 text-rose-400" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
