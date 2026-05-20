"use client";

import { chatMessage } from "./chatMessage";

type LiveChatMessageItemProps = {
    message: chatMessage;
    currentUser: string;
}

export default function LiveChatMessageItem({ message, currentUser }: LiveChatMessageItemProps) {
    const isOwnMessage = message.user === currentUser;

    return (
        <div className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}>
            <div className={`mb-2 flex items-center gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                <div>
                <div>
                    {message.user}
                </div>
                <div>
                    {message.text}
                </div>
                </div>
            </div>
        </div>
    )
}