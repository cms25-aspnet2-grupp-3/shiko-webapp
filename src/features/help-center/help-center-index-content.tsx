import Link from "next/link";

import {
  fetchHelpCenterArticles,
  type HelpCenterArticle,
} from "@/features/help-center/lib/data/help-center-data";

export default async function HelpCenterIndexContent() {
  let articles: HelpCenterArticle[];

  try {
    articles = await fetchHelpCenterArticles();
  } catch {
    return <p className="text-lg font-semibold">Something went wrong</p>;
  }

  return (
    <>
      {articles.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">
          No published help pages are available yet.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 content-start">
          {articles.map((article) => (
            <li key={article.id} className="h-full">
              <Link
                href={`/help/${article.slug}`}
                className="flex h-full flex-col gap-4 items-start rounded-xl bg-white p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
              >
                <h3 className="text-lg font-bold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-md text-gray-400">{article.summary}</p>

                <p className="mt-auto text-sm font-bold text-red-400  tracking-widest flex align-middle">
                  <span className="underline">Read more</span>
                  <span aria-hidden="true" className="ml-1 no-underline">
                    →
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
