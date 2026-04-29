import { Suspense } from "react";

import ChatBox from "@/components/ChatBox";
import CourseInformationBox from "@/components/CourseInformationBox";

import HeroContent from "@/features/hero-content/hero-content";
import HeroContentSkeleton from "@/features/hero-content/hero-content-skeleton";

type HomeProps = Readonly<{
  gapClassName?: string;
  roundedClassName?: string;
  cardRoundedClassName?: string;
  cardPaddingClassName?: string;
  cardBackgroundClassName?: string;
}>;

export default function Home({
  gapClassName = "gap-8",
  roundedClassName = "rounded",
  cardRoundedClassName = "rounded-2xl",
  cardPaddingClassName = "p-8",
  cardBackgroundClassName = "bg-white",
}: HomeProps) {
  const cardBaseClassName = `${cardRoundedClassName} ${cardPaddingClassName} ${cardBackgroundClassName}`;

  return (
    <div className={`grid ${gapClassName} ${roundedClassName}`}>
      <div className={`grid grid-cols-2 ${gapClassName}`}>
        <CourseInformationBox />
        <section
          className={`${cardRoundedClassName} ${cardBackgroundClassName} p-8 pb-0 sm:col-span-2 3xl:col-span-2 3xl:row-span-2 3xl:h-full overflow-hidden`}
        >
          <Suspense fallback={<HeroContentSkeleton />}>
            <HeroContent />
          </Suspense>
        </section>
      </div>

      <div
        className={`grid grid-cols-1 ${gapClassName} sm:grid-cols-2 lg:grid-cols-4`}
      >
        <section
          className={`${cardBaseClassName} sm:col-span-2 lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-2 lg:h-full`}
        >
          Your assignments
        </section>

        <div
          className={`${cardBaseClassName} lg:col-start-4 lg:col-span-1 lg:row-start-1`}
        >
          <ChatBox />
        </div>

        <section
          className={`${cardBaseClassName} lg:col-start-4 lg:col-span-1 lg:row-start-2 3xl:col-start-4`}
        >
          Community
        </section>
      </div>
    </div>
  );
}
