import Link from "next/link";

import type { HelpCenterArticle } from "./lib/data/help-center-data";
import { getHelpCenterImage } from "./lib/help-center-images";

type HelpCenterCardProps = Readonly<{
  article: HelpCenterArticle;
}>;

export default function HelpCenterCard({ article }: HelpCenterCardProps) {
  return (
    <li className="h-full">
      <Link
        href={`/help/${article.slug}`}
        className="flex h-full flex-col items-start gap-4 rounded-xl bg-white p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
      >
        <img src={getHelpCenterImage(article.slug)} alt="" className="h-14 w-14" />
        <h3 className="text-lg font-bold text-gray-900">{article.title}</h3>
        <p className="text-md text-gray-400">{article.summary}</p>
        <p className="mt-auto flex align-middle text-sm font-bold tracking-widest text-red-400">
          <span className="underline">Read more</span>
          <span aria-hidden="true" className="ml-1 no-underline">
            →
          </span>
        </p>
      </Link>
    </li>
  );
}
