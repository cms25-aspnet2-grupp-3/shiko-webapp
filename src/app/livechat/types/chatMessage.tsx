export type ChatMessage = {
    messageId: string;
    chatId: string;
    user: string;
    text: string;
    imgUrl?: string | null
}