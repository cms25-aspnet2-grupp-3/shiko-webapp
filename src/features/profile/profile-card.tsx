import Image from "next/image";
import type { Profile } from "./lib/data/profile-data";

type ProfileCardProps = Readonly<{
  profile: Profile;
}>;

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <aside className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative h-28 bg-gray-200">
        {profile.BgImageUrl && (
          <Image
            src={profile.BgImageUrl}
            alt=""
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="relative px-6 pb-6">
        <div className="-mt-10 flex flex-col items-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-100">
            {profile.profileImageUrl && (
              <Image
                src={profile.profileImageUrl}
                alt={profile.firstName}
                fill
                className="object-cover"
              />
            )}
          </div>

          <h2 className="mt-3 text-lg font-semibold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h2>

          <span className="mt-1 rounded-full bg-red-50 px-3 py-1 text-xs text-red-500">
            {profile.role ?? "Student"}
          </span>
        </div>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800">Skills</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800">Achievements</h3>

          <div className="mt-3 flex gap-3">
          {profile.achievements?.map((badgeUrl, index) => (
            <div
              key={badgeUrl}
              className="relative h-9 w-9 overflow-hidden rounded-full"
            >
              <Image
                src={badgeUrl}
                alt={`Achievement badge ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-gray-800">Bio</h3>

          <p className="mt-3 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-500">
            {profile.bio || "No bio has been added yet."}
          </p>
        </section>
      </div>
    </aside>
  );
}