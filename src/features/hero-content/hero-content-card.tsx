import Image from "next/image";
import Link from "next/link";

import type { HeroContent } from "./lib/data/hero-content-data";
import HeroContentCtaIcon from "./hero-content-cta-icon";

const layoutClassName =
  "grid h-full grid-cols-1 gap-6 overflow-hidden md:grid-cols-[minmax(0,1fr)_244px] md:grid-rows-[1fr_auto] md:items-stretch md:gap-x-6 md:gap-y-0 relative";

const contentColumnClassName = "min-w-0 md:col-start-1 md:row-start-1";

const bodyTextClassName = "mt-10 opacity-45";

const ctaButtonClassName =
  "mt-8 mb-8 inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-md font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2";

const studentImageWrapperClassName =
  "w-full max-w-[244px] justify-self-center self-end md:col-start-2 md:row-start-1 md:justify-self-end";

const graphWrapperClassName =
  "mb-8 w-full justify-self-center self-end md:col-span-2 md:row-start-2 3xl:absolute";

type HeroContentCardProps = Readonly<{
  content: HeroContent;
}>;

export default function HeroContentCard({ content }: HeroContentCardProps) {
  return (
    <div className={layoutClassName}>
      <div className={contentColumnClassName}>
        <h2 className="text-5xl font-bold">{content.title}</h2>
        <p className={bodyTextClassName}>{content.bodyText}</p>
        <Link href={content.ctaLink} className={ctaButtonClassName}>
          <span>{content.ctaText}</span>
          <HeroContentCtaIcon />
        </Link>
      </div>
      <div className={studentImageWrapperClassName}>
        <Image
          className="h-auto w-full"
          src="/images/img-student.png"
          width={244}
          height={384}
          alt="Picture of the author"
        />
      </div>
      <div className={graphWrapperClassName}>
        <Image
          className="mx-auto h-auto w-[192px]"
          src="/images/graph.png"
          width={192}
          height={100}
          alt="Graph illustration"
        />
      </div>
    </div>
  );
}
