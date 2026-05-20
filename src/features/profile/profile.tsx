import { fetchProfile } from "./lib/data/profile-data";
import ProfileCard from "./profile-card";
import ProfileForm from "./profile-form";
import Link from "next/link";


export default async function Profile() {
  const profile = await fetchProfile();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>

        <nav className="mt-5 flex gap-4 text-sm font-medium">
          <Link href="/profile/general" className="rounded-md bg-gray-700 px-5 py-3 text-white hover:bg-gray-600">
            General
          </Link>
          <Link href="/profile/team" className="text-gray-400 px-5 py-3 hover:text-gray-600 hover:bg-gray-700 hover:text-white rounded-md">
            Team
          </Link>
          <Link href="/profile/password" className="text-gray-400 px-5 py-3 hover:text-gray-600 hover:bg-gray-700 hover:text-white rounded-md">
            Password
          </Link>
          <Link href="/profile/notifications" className="text-gray-400 px-5 py-3 hover:text-gray-600 hover:bg-gray-700 hover:text-white rounded-md">
            Notification
          </Link>
        </nav>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileCard profile={profile} />
        <ProfileForm profile={profile} />
      </div>
    </section>
  );
}