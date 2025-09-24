'use client';

import { useState, useEffect, useRef } from 'react';
import type { Chat, ChatMessage } from '@/content/chatData';
import { MessageBubble } from '@/components/message-bubble';
import { TypingIndicator } from '@/components/typing-indicator';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { Button } from '@/components/ui/button';
import { SendHorizontal, ChevronLeft } from 'lucide-react';
import { CONTACT_BUTTONS } from '@/lib/constants';
import { SECTION_BUTTONS } from '@/lib/chat-utils';

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

        if (chat.id === 'bot' || chat.id === 'contact') {
            setIsContactMode(chat.id === 'contact');
            loadInitialMessages();
        } else {
            loadChatMessages();
        }

        function loadInitialMessages() {
            if (chat.id === 'contact') {
                addMessageWithDelay(
                    {
                        from: 'me',
                        text: '¡Perfecto! Me encanta conocer proyectos nuevos. ¿Cuál es la mejor forma de contactarte?',
                        buttons: CONTACT_BUTTONS,
                    },
                    1000
                );
            } else {
                // Bot chat
                chat.messages.forEach((msg, index) => {
                    addMessageWithDelay(msg, (index + 1) * 1000);
                });
            }
            setTimeout(() => setIsInitialLoadComplete(true), chat.messages.length * 1000 + 500);
        }

        function loadChatMessages() {
            chat.messages.forEach((msg, index) => {
                addMessageWithDelay(msg, (index + 1) * 1200);
            });
            setTimeout(() => setIsInitialLoadComplete(true), chat.messages.length * 1200 + 500);
        }
    }, [chat.id, chat.messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addMessageWithDelay = (message: ChatMessage, delay: number) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, message]);
            setIsTyping(false);
        }, delay);
    };

    const addMessage = (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
    };

    const handleButtonClick = (action: string) => {
        // Handle external links
        if (action.startsWith('http')) {
            window.open(action, '_blank');
            return;
        }

        // Handle navigation actions
        if (action === 'menu') {
            addMessage({
                from: 'user',
                text: 'Volver al Menú',
            });

            addMessageWithDelay(
                {
                    from: 'me',
                    text: '¿Necesitas ayuda? Selecciona una sección:',
                    buttons: SECTION_BUTTONS,
                },
                1000
            );
            return;
        }

        // Handle section navigation
        if (['about', 'skills', 'projects', 'experience', 'education', 'recommendations', 'contact'].includes(action)) {
            if (onNavigateToChat) {
                onNavigateToChat(action);
            }
            return;
        }

        // Handle contact form
        if (isContactMode) {
            handleContactFormAction(action);
        }
    };

    const handleContactFormAction = (action: string) => {
        // This would handle the contact form logic
        // For now, just open external links
        if (action.startsWith('http')) {
            window.open(action, '_blank');
        }
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            from: 'user',
            text: inputValue,
        };

        addMessage(userMessage);
        setInputValue('');

        // Auto-response for demo
        setTimeout(() => {
            addMessage({
                from: 'me',
                text: 'Gracias por tu mensaje. Te responderé pronto.',
            });
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isInitialLoadComplete && messages.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <TypingIndicator />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-background" ref={containerRef}>
            {/* Header */}
            {onBack && (
                <div className="p-4 border-b border-border bg-primary/5 flex items-center gap-3">
                    <Button variant="ghost" size="sm" onClick={onBack}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{chat.title.replace(/[^A-Z]/g, '')}</span>
                        </div>
                        <div>
                            <h2 className="font-semibold text-foreground text-sm">{chat.title}</h2>
                            <p className="text-xs text-muted-foreground">{chat.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} onButtonClick={handleButtonClick} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {isContactMode && (
                <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button onClick={handleSendMessage} size="sm">
                            <SendHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            <ScrollToTopButton show={showScrollButton} onClick={scrollToTop} />
        </div>
    );
}
