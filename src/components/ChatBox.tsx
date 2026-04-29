"use client";

import React, { useEffect, useState } from "react";

type Message = {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    sentAt: string;
};

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const chatUsers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
    ];

    useEffect(() => {
        fetch("http://localhost:5147/api/chat/conversation?user1=1&user2=2")
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error("Chat fetch error:", err));
    }, []);

    const sendMessage = async () => {
        await fetch("http://localhost:5147/api/chat/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senderId: 1,
                receiverId: 2,
                content: "Hej från Next.js!"
            })
        });

        // reload messages after send
        const res = await fetch("http://localhost:5147/api/chat/conversation?user1=1&user2=2");
        const data = await res.json();
        setMessages(data);
    };

    return (
        <div className="w-full h-full p-4">

            <h2 className="text-xl font-bold mb-2">Chats</h2>

            {/* USERS */}
            <div className="flex gap-2 mb-4">
                {chatUsers.map(user => (
                    <div key={user.id} className="px-2 py-1 border rounded">
                        {user.name}
                    </div>
                ))}
            </div>

            {/* MESSAGES */}
            <div className="space-y-2 mb-4">
                {messages.map(msg => (
                    <div key={msg.id} className="p-2 border rounded">
                        <b>User {msg.senderId}</b>: {msg.content}
                    </div>
                ))}
            </div>

            {/* SEND BUTTON */}
            <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Send Test Message
            </button>

        </div>
    );
};

export default ChatBox;