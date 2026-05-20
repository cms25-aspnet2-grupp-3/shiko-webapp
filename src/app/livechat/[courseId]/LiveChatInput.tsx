"use client";

import { FormEvent } from "react";

type LiveChatInputProps = {
    message: string;
    isConnected: boolean;
    onMessageChange: (value: string) => void;
    onSendMessage: (event: FormEvent<HTMLFormElement>) => void;
}

export default function LiveChatInput({ message, isConnected, onMessageChange, onSendMessage }: LiveChatInputProps) {
    return (
        <form onSubmit={onSendMessage} className="mt-6 flex gap-3">
            <input value={message} onChange={(event) => onMessageChange(event.target.value)} placeholder="Type message..."/>
            <button type="submit" disabled={!message.trim() || !isConnected}>Send</button>
        </form>
    )
}