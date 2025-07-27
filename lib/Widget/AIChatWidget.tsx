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
    avatarSrc?: string;
    primaryColor?: string;
}

export const AIChatWidget = ({
    title = "AI Assistant",
    initialMessage = "Hello! How can I help you today?",
    webhookUrl,
    sessionId,
    csrfToken,
    avatarSrc,
    primaryColor,
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
        <div
            className="chat-widget"
            data-open={isOpen}
            style={
                primaryColor
                    ? ({
                          "--primary-color": primaryColor,
                          "--primary-gradient": `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%), ${primaryColor}`,
                      } as React.CSSProperties)
                    : undefined
            }
        >
            <button className="chat-toggle-button" onClick={toggleChat}>
                <svg className="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
            </button>

            <div className="chat-interface">
                <div className="chat-header">
                    {avatarSrc && (
                        <div className="chat-avatar">
                            <img src={avatarSrc} alt="AI Avatar" />
                        </div>
                    )}
                    <div className="chat-title">
                        <h3>{title}</h3>
                        <div className="status">
                            <div className="ping-dot" />
                            <p>Online</p>
                        </div>
                    </div>
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
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25.05 2.90375C26.32 2.46 27.54 3.68 27.0963 4.95L19.69 26.1125C19.2088 27.485 17.2963 27.5625 16.7063 26.2338L13.1325 18.1938L18.1625 13.1625C18.3281 12.9848 18.4183 12.7497 18.414 12.5068C18.4097 12.264 18.3113 12.0322 18.1395 11.8605C17.9678 11.6887 17.736 11.5903 17.4932 11.586C17.2503 11.5817 17.0152 11.6719 16.8375 11.8375L11.8063 16.8675L3.76625 13.2938C2.4375 12.7025 2.51625 10.7913 3.8875 10.31L25.05 2.90375Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
