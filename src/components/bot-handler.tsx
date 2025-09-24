'use client';

import { useState } from 'react';
import type { ChatMessage } from '@/content/chatData';
import { MessageBubble } from '@/components/message-bubble';
import { SECTION_SUMMARIES, SECTION_BUTTONS, getActionLabel, addMessageWithDelay, addMessagesSequentially } from '@/lib/chat-utils';

interface BotHandlerProps {
    messages: ChatMessage[];
    onAction: (action: string) => void;
    onAddMessage: (message: ChatMessage) => void;
}

export function BotHandler({ messages, onAction, onAddMessage }: BotHandlerProps) {
    const [currentFlow, setCurrentFlow] = useState<string | null>(null);

    const handleButtonClick = (action: string) => {
        onAddMessage({
            from: 'user',
            text: getActionLabel(action),
        });

        if (action === 'menu') {
            setCurrentFlow(null);
            onAddMessage({
                from: 'me',
                text: '¿Necesitas ayuda? Selecciona una sección:',
                buttons: SECTION_BUTTONS,
            });
            return;
        }

        if (['about', 'skills', 'projects', 'education', 'recommendations', 'contact'].includes(action)) {
            setCurrentFlow(action);
            showSectionSummary(action);
            return;
        }

        if (action.startsWith('details-')) {
            const section = action.replace('details-', '');
            onAction(section);
            return;
        }

        onAction(action);
    };

    const showSectionSummary = (section: string) => {
        const sectionMessages = SECTION_SUMMARIES[section as keyof typeof SECTION_SUMMARIES] || [];

        addMessagesSequentially(sectionMessages, onAddMessage);

        addMessageWithDelay(
            {
                from: 'me',
                text: '¿Qué te gustaría hacer?',
                buttons: [
                    { label: 'Volver al Menú', action: 'menu' },
                    { label: 'Ver Detalles', action: `details-${section}` },
                ],
            },
            sectionMessages.length * 1000 + 500,
            onAddMessage
        );
    };

    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} onButtonClick={handleButtonClick} />
            ))}
        </div>
    );
}
