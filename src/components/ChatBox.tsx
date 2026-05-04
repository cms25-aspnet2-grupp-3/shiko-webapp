"use client";

import React, { useEffect, useState } from "react";

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
};

const API_CHAT = "https://localhost:5276";

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<number>(2);

    const chatUsers: User[] = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
    ];

    // HÄMTA MESSAGES
    useEffect(() => {
        fetch(`${API_CHAT}/api/chat/conversation?user1=1&user2=${selectedUser}`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error(err));
    }, [selectedUser]);

    // SKICKA MESSAGE
    const sendMessage = async () => {
        await fetch(`${API_CHAT}/api/chat/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senderId: 1,
                receiverId: selectedUser,
                content: "Hej från Next.js!"
            })
        });

        // reload messages
        const res = await fetch(
            `${API_CHAT}/api/chat/conversation?user1=1&user2=${selectedUser}`
        );

        const data = await res.json();
        setMessages(data);
    };

    return (
        <div className="p-4">

            {/* USERS */}
            <div className="flex gap-2 mb-4">
                {chatUsers.map(user => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`px-3 py-1 border rounded cursor-pointer ${
                            selectedUser === user.id ? "bg-blue-300" : ""
                        }`}
                    >
                        {user.name}
                    </div>
                ))}
            </div>

            {/* MESSAGES */}
            <div className="space-y-2 mb-4">
                {messages.map(msg => (
                    <div key={msg.id} className="border p-2 rounded">
                        <b>{msg.senderId}</b>: {msg.content}
                    </div>
                ))}
            </div>

            {/* BUTTON */}
            <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Send message
            </button>

        </div>
    );

    <div></div>
};

export default ChatBox;