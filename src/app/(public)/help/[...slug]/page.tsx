import { Suspense } from "react";
import type { Metadata } from "next";

import HelpCenterArticleContent from "@/features/help-center/help-center-article-content";
import HelpCenterSkeleton from "@/features/help-center/help-center-skeleton";
import {
  fetchHelpCenterArticleBySlug,
  fetchHelpCenterArticles,
} from "@/features/help-center/lib/data/help-center-data";

type HelpCenterPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateStaticParams() {
  const articles = await fetchHelpCenterArticles();

  return articles.map((article) => ({
    slug: article.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: HelpCenterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.join("/");
  const decodedSlug = decodeURIComponent(normalizedSlug);
  const article = await fetchHelpCenterArticleBySlug(decodedSlug);

  if (!article) {
    return {
      title: "Help Center | Shiko Portal",
    };
  }

  return {
    title: `${article.title} | Help Center`,
    description: article.summary,
  };
}

export default function HelpCenterSlugPage({ params }: HelpCenterPageProps) {
  return (
    <article className="rounded-2xl bg-white px-8 py-6">
      <Suspense fallback={<HelpCenterSkeleton />}>
        <HelpCenterArticleContent params={params} />
      </Suspense>
    </article>
  );
}
