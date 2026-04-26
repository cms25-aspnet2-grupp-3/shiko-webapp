export type CurrentHeroContentModel = {
  id: number;
  title: string;
  bodyText: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export const fetchCurrentHeroContent =
  async (): Promise<CurrentHeroContentModel> => {
    try {
      const res = await fetch(
        "https://cms25-aspnet2-grupp3-hero-content-api.azurewebsites.net/api/hero/current",
        { cache: "no-store" },
      );

      if (!res.ok) {
        throw new Error(`Request error (${res.status})`);
      }

      const data = (await res.json()) as CurrentHeroContentModel;

      return data;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };
