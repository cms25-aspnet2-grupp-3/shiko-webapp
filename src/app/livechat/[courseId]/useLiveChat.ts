"use client";

import * as signalR from "@microsoft/signalr";
import { chatMessage } from "./chatMessage";
import { getCurrentUser } from "./getCurrentUser";
import { liveChatHubUrl } from "./liveChatConstants";
import { useEffect, useState, useRef, FormEvent } from "react";

export function useLiveChat(chatId: string) {
    const [isConnected, setIsConnected] = useState(false);
    
    
    const [currentUser] = useState(() => getCurrentUser());
    
    const [messages, setMessages] = useState<chatMessage[]>([]);
    const [message, setMessage] = useState("");

    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(liveChatHubUrl)
            .withAutomaticReconnect()
            .build();

        connection.on("LoadMessages", (loadedMessages: chatMessage[]) => {
            setMessages(loadedMessages);
        });

        connection.on("ReceiveMessage", (receivedMessage: chatMessage) => {
            setMessages(currentMessages => {
                const exists = currentMessages.some(
                    existingMessage => existingMessage.messageId === receivedMessage.messageId
                );
                if (exists) return currentMessages;
                return [...currentMessages, receivedMessage];
            });
        });

        connection.on("ChatEnded", () => {
            setMessages([]);
            setIsConnected(false);
        });

        connection.onclose(() => setIsConnected(false));
        connection.onreconnecting(() => setIsConnected(false));

        async function startConnection() {
            try {
                await connection.start();
                connectionRef.current = connection;
                await connection.invoke("JoinChat", chatId);
                setIsConnected(true);
            } catch (error) {
                console.error("Failed to connect to live chat:", error);
                setIsConnected(false);
            }
        }

        startConnection();

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [chatId]); 

    function handleMessageChange(value: string) {
        setMessage(value);
    }

    async function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        if (!connectionRef.current || !isConnected) {
            setMessages(current => [
                ...current,
                {
                    messageId: crypto.randomUUID(),
                    chatId,
                    user: "system",
                    text: "Not connected to live chat server",
                    createdAtUTc: new Date().toISOString()
                }
            ]);
            return;
        }

        try {
            await connectionRef.current.invoke("SendMessage", chatId, currentUser, trimmedMessage, null);
            setMessage("");
        } catch (err) {
            console.error("Error sending message:", err);
        }
    }

    return {
        currentUser,
        isConnected,
        messages,
        message,
        handleMessageChange,
        sendMessage
    };
}