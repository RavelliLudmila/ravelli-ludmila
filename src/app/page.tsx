'use client';

import { useState, useEffect } from 'react';
import { chats } from '@/content/chatData';
import { ChatList } from '@/components/chat-list';
import { ChatConversation } from '@/components/chat-conversation';
import { SplashScreen } from '@/components/splash-screen';

export default function WhatsAppPortfolio() {
    const [showSplash, setShowSplash] = useState(true);
    const [activeChat, setActiveChat] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer);
        };
    }, []);

    if (showSplash) {
        return <SplashScreen />;
    }

    if (isMobile) {
        if (activeChat) {
            return (
                <ChatConversation
                    chat={chats.find((c) => c.id === activeChat)!}
                    onBack={() => setActiveChat(null)}
                    onNavigateToChat={setActiveChat}
                />
            );
        }
        return <ChatList chats={chats} onSelectChat={setActiveChat} />;
    }

    return (
        <div className="h-screen flex bg-background">
            <div className="w-1/3 border-r border-border">
                <ChatList chats={chats} onSelectChat={setActiveChat} activeChat={activeChat} />
            </div>

            <div className="flex-1">
                {activeChat ? (
                    <ChatConversation chat={chats.find((c) => c.id === activeChat)!} onNavigateToChat={setActiveChat} />
                ) : (
                    <div className="h-full flex items-center justify-center bg-muted/20">
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-muted-foreground">Selecciona una conversación para comenzar</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
