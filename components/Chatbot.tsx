
"use client";

import { useEffect, useRef, useState } from "react";
import {
    X,
    Send,
    Bot,
    User,
    LoaderCircle,
    Trash2,
    Brain,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatMessage = {
    role: "user" | "model";
    text: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "model",
            text: "Hello! 👋 Welcome to E-Store. I'm your shopping assistant. What would you like to know about our products?",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading, isOpen]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!message.trim() || loading) return;

        const userMessage = message.trim();

        const previousMessages = messages.filter(
            (item) => item.role === "user" || item.role === "model"
        );

        setMessages((prev) => [
            ...prev,
            { role: "user", text: userMessage },
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: previousMessages,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Something went wrong.");
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: data.reply,
                },
            ]);
        } catch (error) {
            console.error("Chatbot request failed:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: "Sorry, I am having trouble responding right now. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function clearChat() {
        setMessages([
            {
                role: "model",
                text: "Hello! 👋 Welcome to E-Store. How can I help you today?",
            },
        ]);
    }

    return (
        <>
            {!isOpen && (
                <button
                    title="Ask E-Bot"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chatbot"
                    className="group fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors duration-500 ease-in-out hover:bg-blue-700 cursor-pointer"
                >
                    <Brain
                        size={21}
                        className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    Shop with AI
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-3 right-3 z-[9999] flex h-[min(680px,calc(100dvh-24px))] w-[460px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10 dark:border-gray-700 dark:bg-gray-950 dark:shadow-black/40 sm:bottom-6 sm:right-6">

                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3.5 dark:border-gray-800 dark:bg-gray-950">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                <Bot size={23} />
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                                    E-Store Assistant
                                </h2>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        AI Shopping Support
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={clearChat}
                                title="Clear conversation"
                                aria-label="Clear conversation"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer"
                            >
                                <Trash2 size={17} />
                            </button>

                            <button
                                onClick={() => setIsOpen(false)}
                                title="Close chatbot"
                                aria-label="Close chatbot"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer"
                            >
                                <X size={19} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-white px-4 py-5 dark:bg-gray-950 sm:px-5">
                        <div className="space-y-6">
                            {messages.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-3 ${item.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {item.role === "model" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                                            <Bot size={17} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[85%] break-words text-sm leading-7 ${item.role === "user"
                                            ? "rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5 text-white"
                                            : "min-w-0 flex-1 pt-1 text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        {item.role === "user" ? (
                                            <div className="whitespace-pre-wrap">{item.text}</div>
                                        ) : (
                                            <div
                                                className="
                          [&_p]:mb-3 [&_p:last-child]:mb-0
                          [&_strong]:font-semibold [&_strong]:text-gray-950
                          dark:[&_strong]:text-white
                          [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-xl [&_h1]:font-bold
                          [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold
                          [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:font-semibold
                          [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5
                          [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5
                          [&_li]:pl-1
                          [&_a]:text-blue-600 [&_a]:underline
                          dark:[&_a]:text-blue-400
                          [&_blockquote]:my-3 [&_blockquote]:border-l-2
                          [&_blockquote]:border-gray-300 [&_blockquote]:pl-3
                          dark:[&_blockquote]:border-gray-700
                          [&_pre]:my-3 [&_pre]:overflow-x-auto
                          [&_pre]:rounded-xl [&_pre]:bg-gray-900
                          [&_pre]:p-3 [&_pre]:text-gray-100
                          [&_code]:rounded [&_code]:bg-gray-100
                          [&_code]:px-1.5 [&_code]:py-0.5
                          [&_code]:text-sm [&_code]:text-pink-600
                          dark:[&_code]:bg-gray-800 dark:[&_code]:text-pink-300
                          [&_pre_code]:bg-transparent [&_pre_code]:p-0
                          [&_pre_code]:text-gray-100
                          [&_table]:w-full [&_table]:border-collapse
                          [&_th]:border [&_th]:border-gray-200
                          [&_th]:bg-gray-50 [&_th]:p-2
                          [&_td]:border [&_td]:border-gray-200 [&_td]:p-2
                          dark:[&_th]:border-gray-700 dark:[&_td]:border-gray-700
                          dark:[&_th]:bg-gray-800
                        "
                                            >
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {item.text}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                    </div>

                                    {item.role === "user" && (
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                            <User size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <Bot size={17} />
                                    </div>

                                    <div className="flex items-center gap-2 pt-2 text-sm text-gray-500 dark:text-gray-400">
                                        <LoaderCircle size={16} className="animate-spin" />
                                        <span>Thinking...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 bg-white px-3 py-3 dark:border-gray-800 dark:bg-gray-950 sm:px-4">
                        <form
                            onSubmit={sendMessage}
                            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-1.5 transition-colors focus-within:border-blue-400 focus-within:bg-white dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-blue-500 dark:focus-within:bg-gray-900"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask anything about our products..."
                                disabled={loading}
                                maxLength={1000}
                                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                            />

                            <button
                                type="submit"
                                disabled={!message.trim() || loading}
                                aria-label="Send message"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
                            >
                                <Send size={17} />
                            </button>
                        </form>

                        <p className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
                            AI responses may occasionally be inaccurate. Please confirm important product details before making a purchase.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
