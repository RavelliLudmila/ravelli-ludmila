'use client';

import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { ChatMessage } from '@/content/chatData';
import { MessageBubble } from '@/components/message-bubble';
import { CONTACT_LINKS } from '@/lib/constants';

interface ContactFormProps {
    messages: ChatMessage[];
    onAddMessage: (message: ChatMessage) => void;
    onStepChange?: (step: string) => void;
}

interface FormData {
    name: string;
    email: string;
    project: string;
    timeline: string;
    reference: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
    project: Yup.string().required('La descripción del proyecto es requerida'),
    timeline: Yup.string(),
    reference: Yup.string(),
});

export function ContactForm({ messages, onAddMessage, onStepChange }: ContactFormProps) {
    const [currentStep, setCurrentStep] = useState<'initial' | 'name' | 'email' | 'project' | 'timeline' | 'reference' | 'summary' | 'completed'>(
        'initial'
    );
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (['name', 'email', 'project', 'timeline', 'reference'].includes(currentStep)) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [currentStep]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            project: '',
            timeline: '',
            reference: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    onAddMessage({
                        from: 'me',
                        text: '¡Perfecto! Tu mensaje ha sido enviado a lud.ravelli@gmail.com. Te responderé pronto. ✨',
                    });
                    setCurrentStep('completed');
                    onStepChange?.('completed');
                } else {
                    throw new Error('Error al enviar');
                }
            } catch (error) {
                onAddMessage({
                    from: 'me',
                    text: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o escríbeme directamente:',
                    buttons: [
                        {
                            label: 'Enviar Email Directo',
                            action: CONTACT_LINKS.GMAIL_COMPOSE,
                        },
                        { label: 'Intentar de Nuevo', action: 'retry' },
                    ],
                });
            }
        },
    });

    const quickContactButtons = [
        {
            label: 'Email',
            action: CONTACT_LINKS.GMAIL_COMPOSE,
        },
        { label: 'LinkedIn', action: CONTACT_LINKS.LINKEDIN },
        { label: 'GitHub', action: CONTACT_LINKS.GITHUB },
    ];

    const handleStartForm = () => {
        onAddMessage({ from: 'user', text: 'Comenzar formulario' });
        setCurrentStep('name');
        onStepChange?.('name');
        onAddMessage({
            from: 'me',
            text: '¡Genial! Empecemos. ¿Cuál es tu **nombre**?',
        });
    };

    const handleQuickContact = () => {
        onAddMessage({ from: 'user', text: 'Contacto rápido' });
        onAddMessage({
            from: 'me',
            text: '¡Perfecto! Aquí tienes mis **enlaces directos**:',
            buttons: quickContactButtons,
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && ['name', 'email', 'project', 'timeline', 'reference'].includes(currentStep)) {
            e.preventDefault();
            handleInputSubmit(inputValue);
            setInputValue('');
        }
    };

    const handleInputSubmit = (value: string) => {
        if (!value.trim() && currentStep !== 'reference' && currentStep !== 'timeline') return;

        const userMessage = { from: 'user' as const, text: value || 'Saltar' };
        onAddMessage(userMessage);

        const newFormData = { ...formData, [currentStep]: value };
        setFormData(newFormData);
        formik.setFieldValue(currentStep, value);

        const steps = {
            name: () => {
                setCurrentStep('email');
                onAddMessage({
                    from: 'me',
                    text: `Hola **${value}**! ¿Cuál es tu *email*?`,
                });
            },
            email: () => {
                setCurrentStep('project');
                onAddMessage({
                    from: 'me',
                    text: 'Perfecto. Cuéntame sobre tu **proyecto** o idea:',
                });
            },
            project: () => {
                setCurrentStep('timeline');
                onAddMessage({
                    from: 'me',
                    text: '¡Interesante! ¿Cuál es tu *timeline* estimado? (opcional)\n\n**Presiona Enter para continuar**',
                });
            },
            timeline: () => {
                setCurrentStep('reference');
                onAddMessage({
                    from: 'me',
                    text: '¿Cómo *conociste* mi trabajo? (opcional)\n\n**Presiona Enter para continuar**',
                });
            },
            reference: () => {
                showSummary({ ...newFormData, reference: value });
            },
        };

        steps[currentStep as keyof typeof steps]?.();
    };

    const showSummary = (data: Partial<FormData>) => {
        setCurrentStep('summary');
        onAddMessage({
            from: 'me',
            text: `**Resumen de tu consulta:**\n\n📝 **Nombre:** ${data.name}\n📧 **Email:** ${data.email}\n🚀 **Proyecto:** ${data.project}\n${
                data.timeline ? `⏰ **Timeline:** ${data.timeline}\n` : ''
            }${data.reference ? `🔗 **Referencia:** ${data.reference}` : ''}`,
            buttons: [
                { label: '✅ Enviar', action: 'send' },
                { label: '❌ Cancelar', action: 'cancel' },
            ],
        });
    };

    const handleSummaryAction = (action: string) => {
        if (action === 'send') {
            onAddMessage({ from: 'user', text: 'Enviar' });
            formik.handleSubmit();
        } else if (action === 'cancel') {
            onAddMessage({ from: 'user', text: 'Cancelar' });
            setCurrentStep('initial');
            setFormData({});
            formik.resetForm();
            onStepChange?.('initial');
            onAddMessage({
                from: 'me',
                text: 'No hay problema. ¿Quieres **comenzar de nuevo**?',
                buttons: [
                    { label: 'Comenzar Formulario', action: 'start-form' },
                    { label: 'Contacto Rápido', action: 'quick-contact' },
                ],
            });
        } else if (action === 'retry') {
            formik.handleSubmit();
        }
    };

    const handleButtonClick = (action: string) => {
        if (action === 'start-form') {
            handleStartForm();
        } else if (action === 'quick-contact') {
            handleQuickContact();
        } else if (action === 'send' || action === 'cancel' || action === 'retry') {
            handleSummaryAction(action);
        } else if (action.startsWith('http') || action.includes('mail.google.com')) {
            window.open(action, '_blank');
        }
    };

    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} onButtonClick={handleButtonClick} />
            ))}
        </div>
    );
}
