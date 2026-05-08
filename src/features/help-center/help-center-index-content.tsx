import {
  fetchHelpCenterArticles,
  type HelpCenterArticle,
} from "@/features/help-center/lib/data/help-center-data";
import HelpCenterCard from "./help-center-card";

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
            <HelpCenterCard key={article.id} article={article} />
          ))}
        </ul>
      )}
    </>
  );
}
