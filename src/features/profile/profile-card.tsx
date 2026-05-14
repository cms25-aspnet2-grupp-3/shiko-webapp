import type { Profile } from "./lib/data/profile-data";

type ProfileCardProps = Readonly<{
  profile: Profile;
}>;

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <section>
      <h1>{profile.fullName}</h1>
      <p>{profile.email}</p>
    </section>
  );
}