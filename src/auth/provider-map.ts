import type { Provider } from "next-auth/providers";

export function createProviderMap(providers: Provider[]) {
  return providers
    .map((provider) => {
      if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
      }
      return { id: provider.id, name: provider.name };
    })
    .filter((provider) => provider.id !== "credentials");
}
