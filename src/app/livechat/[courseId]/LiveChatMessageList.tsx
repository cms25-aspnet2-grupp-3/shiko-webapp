"use client";

import { chatMessage } from "./chatMessage";
import LiveChatMessageItem from "./LiveChatMessageItem";

type LiveChatMessageListProps = {
    messages: chatMessage[];
    currentUser: string;
}

export default function LiveChatMessageList({ messages, currentUser }: LiveChatMessageListProps) {
    return (
        <div>
            {messages.map(message => (
                <LiveChatMessageItem key={message.messageId} message={message} currentUser={currentUser} />
            ))}
        </div>
    )
}