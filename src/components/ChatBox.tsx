"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const API_CHAT = process.env.NEXT_PUBLIC_CHAT_API ?? "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";

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
                        headers: {
                            "x-api-key": API_KEY
                        }
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
        { id: 5, name: "User 5", avatar: "https://i.pravatar.cc/150?u=15", hasUnread: false },
        { id: 6, name: "User 6", avatar: "https://i.pravatar.cc/150?u=16", hasUnread: false },
    ];

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        try {
            await fetch(`${API_CHAT}/api/chat/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
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
                    headers: {
                        "x-api-key": API_KEY
                    }
                }
            );

            const data = await res.json();
            setMessages(data);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="">

            <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1D2939]">Chats</h2>
                <p className="text-gray-400 text-sm">2 unread messages</p>
            </div>

            <div className="flex flex-col items-center mb-2">
                <div className="flex gap-2 mb-2 overflow-hidden">
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
                                <span className="absolute top-0 right-0 w-2 h-2 bg-[#F04438] border-2 border-white rounded-full"></span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Link
                href="/livechat/1"
                className="flex items-center justify-between py-3 border-t border-gray-50 mb-2 cursor-pointer"
            >
                <span className="text-sm font-bold text-[#1D2939]">
                    All Messages
                </span>
                <span className="text-gray-400">→</span>
            </Link>

        </div>
    );
};

export default ChatBox;