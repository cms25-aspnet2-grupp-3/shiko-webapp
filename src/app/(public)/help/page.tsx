import { Suspense } from "react";
import type { Metadata } from "next";

import HelpCenterIndexContent from "@/features/help-center/help-center-index-content";
import HelpCenterSkeleton from "@/features/help-center/help-center-skeleton";

export const metadata: Metadata = {
  title: "Help Center | Shiko Portal",
  description: "Browse all help center pages.",
};

export default function HelpCenterIndexPage() {
  return (
    <section>
      <div className="bg-white px-8 py-6 rounded-xl">
        <h1 className="mt-3 text-3xl font-semibold text-gray-900">
          Need some help?
        </h1>
        <p className="mt-4 text-md text-gray-400">
          Need some help? Want answer right away? Select your reference below
          for our answers.
        </p>
      </div>
      <Suspense fallback={<HelpCenterSkeleton />}>
        <HelpCenterIndexContent />
      </Suspense>
    </section>
  );
}
