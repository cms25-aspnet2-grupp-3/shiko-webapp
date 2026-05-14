import { fetchProfile } from "./lib/data/profile-data";
import ProfileCard from "./profile-card";

export default async function Profile() {
  const profile = await fetchProfile();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>

        <nav className="mt-5 flex gap-8 text-sm">
          <button className="rounded-md bg-gray-900 px-5 py-3 text-white">
            General
          </button>
          <button className="text-gray-400">Team</button>
          <button className="text-gray-400">Password</button>
          <button className="text-gray-400">Notification</button>
        </nav>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ProfileCard profile={profile} />
      </div>
    </section>
  );
}