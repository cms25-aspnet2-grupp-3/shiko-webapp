export type Profile = {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl?: string;
  profileUrl: string;
};

const API_URL = process.env.NEXT_PUBLIC_PROFILE_API_URL;

export async function fetchProfile(): Promise<Profile> {
  const response = await fetch(`${API_URL}/api/profile`);

  if (!response.ok) {
    throw new Error("Could not fetch profile.");
  }

  return response.json();
}