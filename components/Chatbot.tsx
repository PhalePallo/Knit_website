import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import type { ChatResponse } from '../services/knowledgeBase';
import { findBestMatch } from '../services/knowledgeBase';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    suggestions?: string[];
}

// Lightweight Markdown-ish renderer for chat bubbles
function renderFormattedText(text: string) {
    // Split into lines and process each
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, lineIdx) => {
        // Skip empty lines but add spacing
        if (line.trim() === '') {
            elements.push(<div key={`sp-${lineIdx}`} className="h-1.5" />);
            return;
        }

        // Horizontal rule
        if (line.trim() === '---') {
            elements.push(<hr key={`hr-${lineIdx}`} className="my-2 border-surface-200" />);
            return;
        }

        // Bullet point lines
        if (/^[•\-]\s/.test(line.trim())) {
            const content = line.trim().replace(/^[•\-]\s/, '');
            elements.push(
                <div key={`li-${lineIdx}`} className="flex gap-1.5 items-start ml-1">
                    <span className="text-brand-500 mt-px shrink-0">•</span>
                    <span>{renderInline(content)}</span>
                </div>
            );
            return;
        }

        // Numbered lines (1. or 1️⃣ style)
        const numMatch = line.trim().match(/^(\d+[.️⃣)]\s*)/);
        if (numMatch) {
            const content = line.trim().slice(numMatch[1].length);
            elements.push(
                <div key={`ol-${lineIdx}`} className="flex gap-1.5 items-start ml-1">
                    <span className="text-brand-500 font-semibold shrink-0">{numMatch[1].trim()}</span>
                    <span>{renderInline(content)}</span>
                </div>
            );
            return;
        }

        // Emoji-prefixed lines (🔒 **Title** — text)
        if (/^[\u{1F000}-\u{1FFFF}]/u.test(line.trim())) {
            elements.push(
                <div key={`em-${lineIdx}`} className="flex gap-1.5 items-start">
                    <span>{renderInline(line.trim())}</span>
                </div>
            );
            return;
        }

        // Regular paragraph
        elements.push(<p key={`p-${lineIdx}`}>{renderInline(line)}</p>);
    });

    return <>{elements}</>;
}

// Inline formatting: **bold**, *italic*

// Helper to process formatting within a text segment
function formatText(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIdx) {
            parts.push(...formatBold(text.slice(lastIdx, match.index)));
        }

        parts.push(
            <a
                key={`a-${match.index}`}
                href={match[2]}
                target={match[2].startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 underline font-medium"
            >
                {match[1]}
            </a>
        );
        lastIdx = match.index + match[0].length;
    }

    if (lastIdx < text.length) {
        parts.push(...formatBold(text.slice(lastIdx)));
    }

    return parts;
}

function formatBold(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIdx) {
            parts.push(text.slice(lastIdx, match.index));
        }
        parts.push(
            <strong key={`b-${match.index}`} className="font-semibold text-slate-900">
                {match[1]}
            </strong>
        );
        lastIdx = match.index + match[0].length;
    }
    if (lastIdx < text.length) {
        parts.push(text.slice(lastIdx));
    }
    return parts;
}

function renderInline(text: string): React.ReactNode[] {
    return formatText(text);
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi there! 👋 I'm Knit's assistant. How can I help you today?",
            suggestions: ['What is Knit?', 'Pricing plans', 'Book a demo']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        const userMessage = text.trim();
        if (!userMessage) return;

        // Length guard
        if (userMessage.length > 1000) {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: "Please keep messages under 1,000 characters." }
            ]);
            return;
        }

        setInputValue('');

        const newMessages: Message[] = [
            ...messages,
            { role: 'user', content: userMessage }
        ];
        setMessages(newMessages);
        setIsLoading(true);

        // Natural typing delay (shorter for chip clicks)
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 400));

        try {
            // Static import is safer and faster for this use case
            const result: ChatResponse = findBestMatch(userMessage, newMessages);

            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: result.answer,
                    suggestions: result.suggestions?.length ? result.suggestions : undefined
                }
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: "Something went wrong. Please try again!" }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
        }
    };

    const handleChipClick = (suggestion: string) => {
        if (!isLoading) sendMessage(suggestion);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!hasOpened) setHasOpened(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">

            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-surface-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    <div className="bg-slate-900 p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <Sparkles size={16} className="text-blue-300" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Knit Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-xs text-slate-400">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50 scroll-smooth">
                        {messages.map((msg, idx) => (
                            <div key={idx}>
                                <div className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div
                                        className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center border ${msg.role === 'user'
                                            ? 'bg-white border-surface-200 text-blue-600'
                                            : 'bg-blue-100 border-blue-200 text-blue-700'
                                            }`}
                                    >
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>

                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-sm'
                                            : 'bg-white border border-surface-200 text-slate-700 rounded-tl-sm'
                                            }`}
                                    >
                                        {msg.role === 'assistant'
                                            ? renderFormattedText(msg.content)
                                            : msg.content}
                                    </div>
                                </div>

                                {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && idx === messages.length - 1 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2 ml-11">
                                        {msg.suggestions.map((s, sIdx) => (
                                            <button
                                                key={sIdx}
                                                onClick={() => handleChipClick(s)}
                                                disabled={isLoading}
                                                className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex shrink-0 items-center justify-center">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-white border border-surface-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-surface-200 shrink-0">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about pricing, features, demo..."
                                maxLength={1000}
                                className="w-full pl-4 pr-12 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm text-slate-700 placeholder:text-slate-400 transition-all"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => sendMessage(inputValue)}
                                disabled={!inputValue.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-slate-400">
                                Powered by Knit Knowledge Base
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${isOpen ? 'bg-white text-slate-700 border border-surface-400 rotate-90' : 'bg-blue-600 text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-pulse" />}

                {/* Unread Indicator */}
                {!isOpen && !hasOpened && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </button>

            {/* Prompt Bubble */}
            {!isOpen && !hasOpened && (
                <div className="absolute bottom-16 right-0 mb-2 w-48 bg-white border border-surface-200 p-3 rounded-lg shadow-lg animate-in slide-in-from-right-5 fade-in duration-500 delay-1000 origin-bottom-right">
                    <p className="text-xs text-slate-700 font-medium">
                        👋 Hi! Need help navigating our platform?
                    </p>
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-surface-200 rotate-45"></div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
