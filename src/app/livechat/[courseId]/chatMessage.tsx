export type chatMessage = {
    messageId: string;
    chatId: string;
    user: string;
    text: string;
    createdAtUTc: string;
    imageUrl?: string | null;
}