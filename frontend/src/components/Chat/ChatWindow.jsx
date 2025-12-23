import React, { useState, useEffect, useRef } from 'react';
import { chatApi } from '../../api';

const ChatWindow = ({ currentUser, selectedUser, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // Optimistic update or wait for server? 
            // We'll wait for server/socket for simpler consistency first, or parent handles it.
            await onSendMessage(newMessage, 'TEXT');
            setNewMessage('');
        } catch (error) {
            console.error("Failed to send", error);
        }
    };

    if (!selectedUser) {
        return (
            <div className="hidden md:flex flex-1 items-center justify-center flex-col text-gray-700 h-full bg-white">
                <div className="w-24 h-24 border-2 border-gray-700 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium">Your Messages</h3>
                <p className="text-gray-400 mt-2">Send private photos and messages to a friend.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center">
                    <button className="md:hidden mr-3 text-gray-700" onClick={() => window.history.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <img
                        src={selectedUser.otherUserAvatar || `https://ui-avatars.com/api/?name=${selectedUser.otherUsername}`}
                        alt={selectedUser.otherUsername}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <span className="font-semibold text-gray-900 text-lg">{selectedUser.otherUserFullName || selectedUser.otherUsername}</span>
                </div>
                <button className="text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                {messages.map((msg, index) => {
                    const isOwn = msg.senderId === currentUser.userId;
                    return (
                        <div key={msg.id || index} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            {!isOwn && (
                                <img
                                    src={msg.senderAvatar || selectedUser.otherUserAvatar}
                                    className="w-7 h-7 rounded-full mr-2 self-end mb-1"
                                    alt=""
                                />
                            )}
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-2xl break-words text-sm md:text-base ${isOwn
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                    }`}
                            >
                                {msg.type === 'IMAGE' ? (
                                    <img src={msg.attachmentUrl} alt="Attachment" className="rounded-lg max-h-60" />
                                ) : (
                                    <p>{msg.content}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSend} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <button type="button" className="text-gray-600 mr-3 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        placeholder="Message..."
                        className="flex-1 bg-transparent border-none text-gray-900 focus:ring-0 placeholder-gray-500"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    {newMessage.trim() && (
                        <button type="submit" className="text-red-500 font-semibold ml-2">
                            Send
                        </button>
                    )}
                    {!newMessage.trim() && (
                        <button type="button" className="text-gray-600 hover:text-red-500 transition-colors ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
