"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Message = {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    sentAt: string;
};

type User = {
    id: number;
    name: string;
    avatar: string;
    hasUnread: boolean;
};

const API_CHAT = "https://shikochatbox.azurewebsites.net";

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<number>(2);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const res = await fetch(
                    `${API_CHAT}/api/chat/conversation?user1=1&user2=${selectedUser}`,
                    {
                        headers: { "x-api-key": "min-super-secret-key" }
                    }
                );

                const data = await res.json();
                setMessages(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchConversation();
    }, [selectedUser]);

    const chatUsers: User[] = [
        { id: 1, name: "User 1", avatar: "https://i.pravatar.cc/150?u=11", hasUnread: true },
        { id: 2, name: "User 2", avatar: "https://i.pravatar.cc/150?u=12", hasUnread: true },
        { id: 3, name: "User 3", avatar: "https://i.pravatar.cc/150?u=13", hasUnread: false },
        { id: 4, name: "User 4", avatar: "https://i.pravatar.cc/150?u=14", hasUnread: false },
    ];

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            await fetch(`${API_CHAT}/api/chat/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "min-super-secret-key"
                },
                body: JSON.stringify({
                    senderId: 1,
                    receiverId: selectedUser,
                    content: inputValue
                })
            });

            setInputValue("");

            const res = await fetch(
                `${API_CHAT}/api/chat/conversation?user1=1&user2=${selectedUser}`,
                {
                    headers: { "x-api-key": "min-super-secret-key" }
                }
            );

            const data = await res.json();
            setMessages(data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-[320px] bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-sans border border-gray-100">

            <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1D2939]">Chats</h2>
                <p className="text-gray-400 text-sm">2 unread messages</p>
            </div>

            <div className="flex flex-col items-center mb-6">
                <div className="flex gap-3 mb-3 overflow-hidden">
                    {chatUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user.id)}
                            className="relative cursor-pointer"
                        >
                            <div
                                className={`w-10 h-10 rounded-full overflow-hidden border-2 ${
                                    selectedUser === user.id
                                        ? "border-[#F04438]"
                                        : "border-transparent"
                                }`}
                            >
                                <Image
                                    src={user.avatar}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                />
                            </div>

                            {user.hasUnread && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#F04438] border-2 border-white rounded-full"></span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-50 mb-2">
                <span className="text-sm font-bold text-[#1D2939]">All Messages</span>
                <span className="text-gray-400">→</span>
            </div>

            <div className="space-y-3 mb-4 pr-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`text-[11px] p-2 rounded-xl max-w-[80%] ${
                            msg.senderId === 1
                                ? "bg-[#1D2939] text-white ml-auto"
                                : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>

            <div className="relative flex items-center gap-2 mt-auto">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="w-full bg-[#F9FAFB] rounded-full px-4 py-2 text-xs text-gray-500 focus:outline-none border border-transparent focus:border-gray-200"
                />

                <button
                    onClick={sendMessage}
                    className="bg-[#1D2939] text-white text-[10px] font-bold px-3 py-2 rounded-lg transition-colors hover:bg-black"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;