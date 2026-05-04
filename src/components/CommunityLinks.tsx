"use client"

import { useEffect, useState } from "react"

type CommunityLink = {
  id: number;
  name: string;
  icon: string;
  link: string;
};

type CommunityLinkDto = {
  id: number;
  communityName: string;
  iconUrl: string;
  url: string;
};

export default function CommunityLinks() {
  const [links, setLinks] = useState<CommunityLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityLinks = async () => {
      try {
        const response = await fetch("https://shiko-grupp3-alex-community-api.azurewebsites.net/api/communities");
        if (!response.ok) {
          throw new Error("Failed to fetch community links");
        }
        const data = (await response.json()) as CommunityLinkDto[];
        setLinks(
          data.map((item) => ({
            id: item.id,
            name: item.communityName,
            icon: item.iconUrl,
            link: item.url,
          }))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityLinks();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 font-archivo">Community</h2>
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.link.startsWith('http') ? link.link : `https://${link.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <img
              src={link.icon}
              alt={link.name}
              className="w-8 h-8 object-cover rounded"
            />
            <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-orange-600 font-archivo">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
