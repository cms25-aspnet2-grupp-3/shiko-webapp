import { notFound } from "next/navigation";

import {
  fetchHelpCenterArticleBySlug,
  type HelpCenterArticle,
} from "@/features/help-center/lib/data/help-center-data";

type HelpCenterArticleContentProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function toSlug(parts: string[]) {
  return decodeURIComponent(parts.join("/"));
}

export default async function HelpCenterArticleContent({
  params,
}: HelpCenterArticleContentProps) {
  const { slug } = await params;
  const decodedSlug = toSlug(slug);
  let article: HelpCenterArticle | null;

  try {
    article = await fetchHelpCenterArticleBySlug(decodedSlug);
  } catch {
    return <p className="text-lg font-semibold">Something went wrong</p>;
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <h1 className="mt-3 text-3xl font-semibold text-gray-900">
        {article.pageTitle}
      </h1>
      <p className="mt-4 text-md text-gray-600 tracking-wide leading-8">
        {article.pageContent}
      </p>
    </>
  );
}
