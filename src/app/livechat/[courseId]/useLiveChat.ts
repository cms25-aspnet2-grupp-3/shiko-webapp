"use client";

import * as signalR from "@microsoft/signalr";
import { chatMessage } from "./chatMessage";
import { getCurrentUser } from "./getCurrentUser";
import { liveChatHubUrl } from "./liveChatConstants";
import { useEffect, useState, useRef, FormEvent } from "react";

export function useLiveChat(chatId: number) {
    const [isConnected, setIsConnected] = useState(false);
    const [currentUser] = useState(() => getCurrentUser());
    const [messages, setMessages] = useState<chatMessage[]>([]);
    const [message, setMessage] = useState("");

    const connectionRef = useRef<signalR.HubConnection | null>(null);

    console.log(liveChatHubUrl);

    useEffect(() => {
        if (!chatId) return;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(liveChatHubUrl, {
                withCredentials: true,
                skipNegotiation: false, 
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
            })
            .withAutomaticReconnect()
            .build();

        connection.on("LoadMessages", (loaded: chatMessage[]) => {
            setMessages(loaded);
        });

        connection.on("ReceiveMessage", (msg: chatMessage) => {
            setMessages(prev => {
                if (prev.some(m => m.messageId === msg.messageId)) return prev;
                return [...prev, msg];
            });
        });

        connection.on("ChatEnded", () => {
            setMessages([]);
            setIsConnected(false);
        });

        const start = async () => {
            try {
                await connection.start();
                console.log("SignalR Connected!");
                await connection.invoke("JoinChat", chatId);
                setIsConnected(true);
                connectionRef.current = connection;
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
                setTimeout(start, 5000); 
            }
        };

        start();

        return () => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                connection.invoke("LeaveChat", chatId).catch(console.error);
                connection.stop();
            }
        };
    }, [chatId]);

    const handleMessageChange = (value: string) => setMessage(value);

    const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = message.trim();
        if (!trimmed || !connectionRef.current || !isConnected) return;

        try {
            await connectionRef.current.invoke("SendMessage", chatId, currentUser, trimmed, null);
            setMessage("");
        } catch (err) {
            console.error("SendMessage error:", err);
        }
    };

    return { currentUser, isConnected, messages, message, handleMessageChange, sendMessage };
    
}