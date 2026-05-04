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

const HELP_CENTER_ENDPOINT =
  "https://cms25-aspnet2-grupp3-help-center-api.azurewebsites.net/api/helpcenter";
const HELP_CENTER_LIST_ERROR = "Could not load help center articles";
const HELP_CENTER_ITEM_ERROR = "Could not load help center article";

export const fetchHelpCenterArticles = async (): Promise<
  HelpCenterArticle[]
> => {
  try {
    const res = await fetch(HELP_CENTER_ENDPOINT, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Request error (${res.status})`);
    }

    const data = (await res.json()) as HelpCenterApiResponse<
      HelpCenterArticle[]
    >;

    if (!data.succeeded || !data.value) {
      throw new Error(data.error ?? HELP_CENTER_LIST_ERROR);
    }

    return data.value;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : HELP_CENTER_LIST_ERROR,
    );
  }
};

export const fetchHelpCenterArticleBySlug = async (
  slug: string,
): Promise<HelpCenterArticle | null> => {
  try {
    const res = await fetch(
      `${HELP_CENTER_ENDPOINT}/slug/${slug}?includePage=true`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Request error (${res.status})`);
    }

    const data = (await res.json()) as HelpCenterApiResponse<HelpCenterArticle>;

    if (!data.succeeded) {
      throw new Error(data.error ?? HELP_CENTER_ITEM_ERROR);
    }

    return data.value;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : HELP_CENTER_ITEM_ERROR,
    );
  }
};
