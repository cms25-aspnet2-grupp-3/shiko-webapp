export type HeaderUser = {
    fullName: string;
    email: string;
    profileImageUrl: string;
};

export type HeaderMessage = {
    id: string;
    senderName: string;
    senderImageUrl: string;
    previewText: string;
    isRead: boolean;
    url: string;
};

export type HeaderNotification = {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    url: string;
};

const API_URL = process.env.NEXT_PUBLIC_HEADER_API_URL;

function getApiUrl() {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_HEADER_API_URL is not defined");
    }

    return API_URL;
}

export async function getHeaderUser(): Promise<HeaderUser> {
    const response = await fetch(`${getApiUrl()}/api/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Could not fetch header user. Status: ${response.status}`);
    }

    return response.json();
}

export async function getHeaderMessages(): Promise<HeaderMessage[]> {
    const response = await fetch(`${getApiUrl()}/api/messages/latest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Could not fetch header messages. Status: ${response.status}`);
    }

    return response.json();
}

export async function getHeaderNotifications(): Promise<HeaderNotification[]> {
    const response = await fetch(`${getApiUrl()}/api/notifications/latest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Could not fetch header notifications. Status: ${response.status}`);
    }

    return response.json();
}