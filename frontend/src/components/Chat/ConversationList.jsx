import React from 'react';

const ConversationList = ({ conversations, selectedUser, onSelectUser, currentUser }) => {
    return (
        <div className="w-full md:w-1/3 border-r border-gray-200 h-full flex flex-col bg-white">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                <div className="text-sm font-semibold text-gray-700">{currentUser?.username}</div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No eligible users to chat with. <br /> Follow someone or answer a request!
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <div
                            key={conv.otherUserId}
                            onClick={() => onSelectUser(conv)}
                            className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?.otherUserId === conv.otherUserId ? 'bg-gray-100' : ''
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={conv.otherUserAvatar || `https://ui-avatars.com/api/?name=${conv.otherUsername}&background=random`}
                                    alt={conv.otherUsername}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                {/* Online status indicator could go here */}
                            </div>

                            <div className="ml-3 flex-1 overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-semibold text-gray-900 truncate">{conv.otherUserFullName || conv.otherUsername}</span>
                                    {conv.lastMessageTime && (
                                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                            {new Date(conv.lastMessageTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <p className={`text-sm truncate pr-2 ${conv.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                        {conv.lastMessagePreview || "Start chatting..."}
                                    </p>
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConversationList;
