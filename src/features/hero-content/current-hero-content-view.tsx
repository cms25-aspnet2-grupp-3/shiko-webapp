import { fetchCurrentHeroContent } from "./lib/data/current-hero-content";
import Link from "next/link";

export default async function CurrentHeroContentView() {
  const content = await fetchCurrentHeroContent();

  return (
    <>
      <h2 className="text-5xl font-bold">{content.title}</h2>
      <p className="opacity-45 mt-10">{content.bodyText}</p>
      <Link
        href={content.ctaLink}
        type="button"
        className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-md font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 mt-8"
      >
        <span>{content.ctaText}</span>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-8"
        >
          <rect width="40" height="40" rx="20" className="fill-white" />
          <path
            d="M20 15V25M25 20H15"
            className="stroke-foreground"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </>
  );
}
