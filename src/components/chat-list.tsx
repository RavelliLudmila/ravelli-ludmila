'use client';

import { motion } from 'framer-motion';
import type { Chat } from '@/content/chatData';

interface ChatListProps {
    chats: Chat[];
    onSelectChat: (chatId: string) => void;
    activeChat?: string | null;
}

export function ChatList({ chats, onSelectChat, activeChat }: ChatListProps) {
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
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">LR</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground">Ludmila Ravelli</h1>
                        <p className="text-xs text-muted-foreground">Frontend Developer</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {chats.map((chat, index) => (
                    <motion.div
                        key={chat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                            activeChat === chat.id ? 'bg-primary/10' : ''
                        }`}
                        onClick={() => onSelectChat(chat.id)}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradientClass(
                                    chat.id
                                )} flex items-center justify-center flex-shrink-0`}
                            >
                                <span className="text-white font-semibold text-lg">{getAvatarMayus(chat.title)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground truncate">{chat.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{chat.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
