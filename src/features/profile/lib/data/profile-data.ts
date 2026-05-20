export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  profileImageUrl?: string;
  profileUrl: string;
  role?: string;
  skills?: string[];
  achievements?: string[];
  BgImageUrl?: string;
  profileIcon?: string;
};

const AchievementBadges: Record<string, string> = {
  badge1: "https://shikoimagestoragegrp3.blob.core.windows.net/images/badge_1-7aeedd69-e8c8-4ad1-b633-5d1ab3c0049c.png",
  badge2: "https://shikoimagestoragegrp3.blob.core.windows.net/images/badge_2-c2541d48-fd3a-4726-b4c2-45802afe5e06.png",
  badge3: "https://shikoimagestoragegrp3.blob.core.windows.net/images/badge_3-4ade56fd-c811-4924-b03f-0a116d8ae2db.png",
  badge4: "https://shikoimagestoragegrp3.blob.core.windows.net/images/badge_4-f660168c-0722-454d-be7f-58cb8bb9f6b8.png",
  badge5: "https://shikoimagestoragegrp3.blob.core.windows.net/images/badge_5-361aaa32-ae51-45bf-9eda-5d079876dae6.png",
};

const ProfileIcon: Record<string, string> = {
  profileIcon: "https://shikoimagestoragegrp3.blob.core.windows.net/images/Upload-Profile-Icon.png-525167a1-3bb6-4b2d-b21c-0acc6cc41f5a"
};

const API_URL = process.env.NEXT_PUBLIC_PROFILE_API_URL;



export async function fetchProfile(): Promise<Profile> {
  const response = await fetch(`${API_URL}/api/profile`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not fetch profile.");
  }

  const profile = await response.json();

  return {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email ?? "Test@example.com",
    phoneNumber: profile.phoneNumber ?? "+1 (555) 123-4567",
    bio: profile.bio ?? "No bio available.",
    profileImageUrl: profile.profileImageUrl ?? "https://shikoimagestoragegrp3.blob.core.windows.net/images/0e7c8b1c-9a5d-4f1b-9c8e-2a3b5d6f7e8a-profile.png",
    profileUrl: profile.profileUrl,
    role: profile.role ?? "Student",
    skills: profile.skills ?? ["JavaScript", "React", "Node.js"],
    achievements: profile.achievements ?? [AchievementBadges.badge1, AchievementBadges.badge2, AchievementBadges.badge3, AchievementBadges.badge4, AchievementBadges.badge5],
    BgImageUrl: profile.BgImageUrl ??
      "https://shikoimagestoragegrp3.blob.core.windows.net/images/c4f12d58-5e60-4770-928b-79d54b0903d8-Rectangle-profile.png",
    profileIcon: profile.profileIcon ?? ProfileIcon.profileIcon,
  }
}