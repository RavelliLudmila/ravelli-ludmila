'use client';

import type { ChatMessage } from '@/content/chatData';
import { MessageBubble } from '@/components/message-bubble';
import { SECTION_SUMMARIES, SECTION_BUTTONS, getActionLabel, addMessageWithDelay, addMessagesSequentially } from '@/lib/chat-utils';

interface BotHandlerProps {
    messages: ChatMessage[];
    onAction: (action: string) => void;
    onAddMessage: (message: ChatMessage) => void;
}

export function BotHandler({ messages, onAction, onAddMessage }: BotHandlerProps) {
    const handleButtonClick = (action: string) => {
        onAddMessage({
            from: 'user',
            text: getActionLabel(action),
        });

        if (action === 'menu') {
            onAddMessage({
                from: 'me',
                text: '¿Necesitas ayuda? Selecciona una sección:',
                buttons: SECTION_BUTTONS,
            });
            return;
        }

        if (['about', 'skills', 'projects', 'experience', 'education', 'recommendations', 'contact'].includes(action)) {
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

        addMessagesSequentially(sectionMessages, onAddMessage, 1200);

        // Add action buttons after messages
        const finalMessage: ChatMessage = {
            from: 'me',
            text: '¿Te gustaría ver más detalles o volver al menú?',
            buttons: [
                { label: 'Ver Detalles Completos', action: `details-${section}` },
                { label: 'Volver al Menú', action: 'menu' },
            ],
        };

        addMessageWithDelay(finalMessage, (sectionMessages.length + 1) * 1200, onAddMessage);
    };

    return (
        <>
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} onButtonClick={handleButtonClick} />
            ))}
        </>
    );
}
