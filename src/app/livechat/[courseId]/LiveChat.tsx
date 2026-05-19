"use client";

import LiveChatHeader from "./LiveChatHeader";
import LiveChatInput from "./LiveChatInput";
import LiveChatMessageList from "./LiveChatMessageList";
import { useLiveChat } from "./useLiveChat";

type LiveChatProps = {
    chatId: string | number;
};

export default function LiveChat({ chatId }: LiveChatProps) {
    const {
        currentUser,
        isConnected,
        messages,
        message,
        handleMessageChange,
        sendMessage,
    } = useLiveChat(Number(chatId));

    return (
        <section>
            <LiveChatHeader isConnected={isConnected} />
            <LiveChatMessageList messages={messages} currentUser={currentUser} />
            <LiveChatInput 
                message={message} 
                isConnected={isConnected} 
                onMessageChange={handleMessageChange} 
                onSendMessage={sendMessage} 
            />
        </section>
    );
}