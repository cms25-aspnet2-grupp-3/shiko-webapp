const IMAGE_BY_SLUG: Record<string, string> = {
  "getting-started": "/images/getting-started.png",
  "account-setup": "/images/admin-settings.png",
  "server-setup": "/images/server-setup.png",
  "login-and-verification": "/images/login-and-verification.png",
  "trust-and-safety": "/images/trust.png",
  "technical-support": "/images/technical-support.png",
};

export const HELP_CENTER_FALLBACK_IMAGE = "/images/fallback.png";

export function getHelpCenterImage(slug: string): string {
  const normalizedSlug = slug.toLowerCase().trim();

  if (IMAGE_BY_SLUG[normalizedSlug]) {
    return IMAGE_BY_SLUG[normalizedSlug];
  }

  const lastSlugPart = normalizedSlug.split("/").pop() ?? normalizedSlug;
  return IMAGE_BY_SLUG[lastSlugPart] ?? HELP_CENTER_FALLBACK_IMAGE;
}
