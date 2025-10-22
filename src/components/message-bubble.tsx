'use client';

import { motion } from 'framer-motion';
import type { ChatMessage } from '@/content/chatData';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
    message: ChatMessage;
    onButtonClick?: (action: string) => void;
}

export function MessageBubble({ message, onButtonClick }: MessageBubbleProps) {
    const isFromMe = message.from === 'me';

    const formatText = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/__(.*?)__/g, '<u>$1</u>')
            .replace(
                /(https?:\/\/[^\s]+)/g,
                '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>'
            );
    };

    const extractLinks = (text: string) => {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const links = text.match(linkRegex) || [];
        return links.map((link) => ({
            label: link.includes('linkedin') ? 'LinkedIn' : link.includes('github') ? 'GitHub' : link.includes('mail.google.com') ? 'Email' : 'Link',
            action: link,
        }));
    };

    const textLinks = extractLinks(message.text);
    const allButtons = [...(message.buttons || []), ...textLinks];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${isFromMe ? 'justify-start' : 'justify-end'}`}
        >
            <div className={`max-w-[80%] ${isFromMe ? 'order-1' : 'order-2'}`}>
                <div
                    className={`p-3 rounded-2xl ${
                        isFromMe
                            ? 'bg-card text-card-foreground rounded-bl-md border border-border'
                            : 'bg-primary text-primary-foreground rounded-br-md shadow-sm'
                    }`}
                >
                    {message.fromContact && <p className="text-xs text-muted-foreground mb-2">{message.fromContact}</p>}

                    <div
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: formatText(message.text.replace(/(https?:\/\/[^\s]+)/g, '')) }}
                    />

                    {allButtons.length > 0 && (
                        <div className="mt-3 space-y-2">
                            {allButtons.map((button, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className={`w-full text-left justify-start transition-colors ${
                                        isFromMe
                                            ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                                            : 'bg-white/90 hover:bg-white text-gray-700 border-white/50'
                                    }`}
                                    onClick={() => {
                                        if (button.action.startsWith('http') || button.action.includes('mail.google.com')) {
                                            window.open(button.action, '_blank');
                                        } else {
                                            onButtonClick?.(button.action);
                                        }
                                    }}
                                >
                                    {button.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
