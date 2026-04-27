export type HeroContent = {
  id: number;
  title: string;
  bodyText: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export const fetchCurrentHeroContent = async (): Promise<HeroContent> => {
  try {
    const res = await fetch(
      "https://cms25-aspnet2-grupp3-hero-content-api.azurewebsites.net/api/hero/current",
      { next: { revalidate: 1800 } },
    );

    if (!res.ok) {
      throw new Error(`Request error (${res.status})`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Something went wrong",
    );
  }
};
