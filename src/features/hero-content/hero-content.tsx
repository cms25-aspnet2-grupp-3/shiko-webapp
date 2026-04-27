import type { HeroContent } from "./lib/data/hero-content-data";
import { fetchCurrentHeroContent } from "./lib/data/hero-content-data";
import HeroContentCard from "./hero-content-card";

export default async function HeroContent() {
  let content: HeroContent;

  try {
    content = await fetchCurrentHeroContent();
  } catch {
    return <p className="mb-8 text-lg font-semibold">Something went wrong</p>;
  }

  if (!content) {
    return <p className="mb-8 text-lg font-semibold">No active hero</p>;
  }

  return <HeroContentCard content={content} />;
}
