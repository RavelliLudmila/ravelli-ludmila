'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, SendHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatList } from '@/components/chat-list';
import { chats } from '@/content/chatData';

export default function NotFound() {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleChatSelect = (chatId: string) => {
        router.push(`/?chat=${chatId}`);
    };

    if (isMobile) {
        return (
            <div className="h-screen flex flex-col bg-background">
                <div className="flex items-center justify-between p-4 bg-background shadow-sm border-b border-border">
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">E</span>
                        </div>
                        <div>
                            <h1 className="font-semibold text-foreground">Error 404</h1>
                            <p className="text-xs text-muted-foreground">Página no encontrada</p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    style={{
                        backgroundImage: `url('/fondo.png')`,
                        backgroundSize: 'auto',
                        backgroundPosition: 'top left',
                        backgroundRepeat: 'repeat',
                        backgroundAttachment: 'local',
                    }}
                >
                    {renderErrorMessages()}
                </div>

                <div className="p-4 border-t border-border bg-background">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value=""
                            placeholder="Escribe un mensaje..."
                            className="flex-1 p-3 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={true}
                        />
                        <Button size="sm" className="rounded-full w-10 h-10 p-0" disabled={true}>
                            <SendHorizontal className="w-4 h-4 text-rose-400" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex bg-background">
            <div className="w-1/3 border-r border-border">
                <ChatList chats={chats} onSelectChat={handleChatSelect} />
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-4 bg-background shadow-sm border-b border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">E</span>
                        </div>
                        <div>
                            <h1 className="font-semibold text-foreground">Error 404</h1>
                            <p className="text-xs text-muted-foreground">Página no encontrada</p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    style={{
                        backgroundImage: `url('/fondo.png')`,
                        backgroundSize: 'auto',
                        backgroundPosition: 'top left',
                        backgroundRepeat: 'repeat',
                        backgroundAttachment: 'local',
                    }}
                >
                    {renderErrorMessages()}
                </div>

                <div className="p-4 border-t border-border bg-background">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value=""
                            placeholder="Escribe un mensaje..."
                            className="flex-1 p-3 rounded-full border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            disabled={true}
                        />
                        <Button size="sm" className="rounded-full w-10 h-10 p-0" disabled={true}>
                            <SendHorizontal className="w-4 h-4 text-rose-400" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderErrorMessages() {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-start"
                >
                    <div className="max-w-xs bg-card rounded-2xl rounded-tl-md p-4 shadow-sm">
                        <p className="text-card-foreground text-sm">¡Hola! 👋</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-start"
                >
                    <div className="max-w-sm bg-card rounded-2xl rounded-tl-md p-4 shadow-sm">
                        <p className="text-card-foreground text-sm">Parece que la página que buscas no existe. 🤔</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex justify-end"
                >
                    <div className="max-w-xs bg-primary rounded-2xl rounded-tr-md p-4 shadow-sm">
                        <p className="text-primary-foreground text-sm">¿Error 404? 😅</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="flex justify-start"
                >
                    <div className="max-w-sm bg-card rounded-2xl rounded-tl-md p-4 shadow-sm">
                        <p className="text-card-foreground text-sm mb-3">
                            ¡Exacto! Pero no te preocupes, puedo ayudarte a encontrar lo que buscas. 😊
                        </p>

                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-left justify-start bg-white/90 hover:bg-white text-gray-700 border-white/50"
                                onClick={() => router.push('/')}
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Ir al inicio
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </>
        );
    }
}
