export type HeaderUser = {
    fullName: string;
    email: string;
    profileImageUrl: string;
};

const API_URL = process.env.NEXT_PUBLIC_HEADER_API_URL;

export async function getHeaderUser(): Promise<HeaderUser> {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_HEADER_API_URL is not defined");
    }

    const response = await fetch(`${API_URL}/api/profile`, {
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