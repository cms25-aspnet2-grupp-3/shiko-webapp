export type HelpCenterArticle = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  displayOrder: number;
  isPublished: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
  pageTitle: string;
  pageContent: string;
};

type HelpCenterApiResponse<T> = {
  succeeded: boolean;
  value: T | null;
  error: string | null;
};

const helpCenterEndpoint =
  "https://cms25-aspnet2-grupp3-help-center-api.azurewebsites.net/api/helpcenter";

export const fetchHelpCenterArticles = async (): Promise<
  HelpCenterArticle[]
> => {
  try {
    const response = await fetch(helpCenterEndpoint, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Request error (${response.status})`);
    }

    const data = (await response.json()) as HelpCenterApiResponse<
      HelpCenterArticle[]
    >;

    if (!data.succeeded || !data.value) {
      throw new Error(data.error ?? "Could not load help center articles");
    }

    return data.value;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Could not load help center articles",
    );
  }
};

export const fetchHelpCenterArticleBySlug = async (
  slug: string,
): Promise<HelpCenterArticle | null> => {
  try {
    const response = await fetch(
      `${helpCenterEndpoint}/slug/${slug}?includePage=true`,
      {
        cache: "no-store",
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Request error (${response.status})`);
    }

    const data =
      (await response.json()) as HelpCenterApiResponse<HelpCenterArticle>;

    if (!data.succeeded) {
      throw new Error(data.error ?? "Could not load help center article");
    }

    return data.value;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Could not load help center article",
    );
  }
};
