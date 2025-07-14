import React, { useEffect, useRef, useState } from "react";
import "./style.css";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

interface ChatWidgetProps {
    title?: string;
    initialMessage?: string;
    sessionId?: string;
    csrfToken?: string;
    webhookUrl: string;
}

export const AIChatWidget = ({
    title = "AI Assistant",
    initialMessage = "Hello! How can I help you today?",
    webhookUrl,
    sessionId,
    csrfToken,
}: ChatWidgetProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (inputText.trim()) {
            const userMessage: Message = {
                id: Date.now().toString(),
                text: inputText,
                isUser: true,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInputText("");

            // Show typing indicator
            setIsTyping(true);

            try {
                const response = await fetch(webhookUrl, {
                    method: "POST",
                    body: JSON.stringify({ prompt: inputText, session_id: sessionId || "sample_session" }),
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken || "",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to send message");
                }

                const data = await response.json();
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.output,
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiResponse]);
            } catch (error) {
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Sorry, I'm having trouble processing your message. Please try again later.",
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, aiResponse]);
                console.error("Error sending message:", error);
            } finally {
                // Hide typing indicator
                setIsTyping(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chat-widget" data-open={isOpen}>
            <button className="chat-toggle-button" onClick={toggleChat}>
                <svg className="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
            </button>

            <div className="chat-interface">
                <div className="chat-header">
                    <h3>{title}</h3>
                    <button
                        className="close-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="welcome-message">
                            <p>{initialMessage}</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <div key={message.id} className={`message ${message.isUser ? "user-message" : "ai-message"}`}>
                                    <div className="message-bubble">{message.text}</div>
                                    <div className="message-time">
                                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="message ai-message">
                                    <div className="message-bubble">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef}></div>
                        </>
                    )}
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={sendMessage} disabled={!inputText.trim()}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
