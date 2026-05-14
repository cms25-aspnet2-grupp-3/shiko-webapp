import { fetchProfile } from "./lib/data/profile-data";
import ProfileCard from "./profile-card";

export default async function Profile() {
   const profile = await fetchProfile();

   return <ProfileCard profile={profile} />;
}