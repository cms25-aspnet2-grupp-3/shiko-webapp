"use client";

export type chatMessage = {
    messageId: string;
    courseId: number;
    user: string;
    text: string;
    createdAtUtc: string; 
    imageUrl?: string | null;
};

export function getCurrentUser() {
    if (typeof window === "undefined") {
        return "You"; 
    }
    return new URLSearchParams(window.location.search).get("user") ?? "User_" + Math.floor(Math.random() * 1000);
}