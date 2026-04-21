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
      <div
        className={`grid grid-cols-1 ${gapClassName} sm:grid-cols-2 3xl:grid-cols-4 3xl:grid-rows-2`}
      >
        <section
          className={`${cardBaseClassName} 3xl:col-span-1 3xl:row-start-1`}
        >
          Total Course
        </section>
        <section
          className={`${cardBaseClassName} 3xl:col-span-1 3xl:row-start-1`}
        >
          Course Complete
        </section>
        <section
          className={`${cardBaseClassName} 3xl:col-span-1 3xl:row-start-2`}
        >
          Course In Progess
        </section>
        <section
          className={`${cardBaseClassName} 3xl:col-span-1 3xl:row-start-2`}
        >
          Upcoming Live Courses
        </section>
        <section
          className={`${cardBaseClassName} sm:col-span-2 3xl:col-span-2 3xl:row-span-2 3xl:h-full`}
        >
          Course
        </section>
      </div>
      <div
        className={`grid grid-cols-1 ${gapClassName} sm:grid-cols-2 3xl:grid-cols-4`}
      >
        <section
          className={`${cardBaseClassName} sm:col-span-2 3xl:col-start-1 3xl:col-span-3 3xl:row-start-1 3xl:row-span-2 3xl:h-full`}
        >
          Your assignments
        </section>
        <section
          className={`${cardBaseClassName} 3xl:col-start-4 3xl:col-span-1 3xl:row-start-1`}
        >
          Chats
        </section>
        <section
          className={`${cardBaseClassName} 3xl:col-start-4 3xl:col-span-1 3xl:row-start-2`}
        >
          Community
        </section>
      </div>
    </div>
  );
}
