import Image from "next/image";

const CourseInformationBox = () => {
  const cardClassName =
    "flex min-h-56 flex-col rounded-[30px] bg-white p-6 sm:p-8";
  const iconClassName =
    "flex h-12 w-12 items-center justify-center rounded-full bg-background";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <section className={cardClassName}>
        <div className="flex flex-row items-center gap-2">
          <div className={iconClassName}>
            <Image
              src="/icons/Open Book.svg"
              alt="Open Book icon"
              width={20}
              height={20}
            />
          </div>
          <div className="text-5xl font-bold">100</div>
        </div>
        <p className="pt-2 text-xl font-semibold">Total Course</p>
        <button className="flex flex-row items-center gap-2 pt-1">
          <a className="text-base font-medium underline" href="">
            View Details
          </a>
          <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
        </button>
      </section>

      <section className={cardClassName}>
        <div className="flex flex-row items-center gap-2">
          <div className={iconClassName}>
            <Image src="/icons/Paper.svg" alt="Paper icon" width={20} height={20} />
          </div>
          <div className="text-5xl font-bold">21</div>
        </div>
        <p className="pt-2 text-xl font-semibold">Course Complete</p>
        <button className="flex flex-row items-center gap-2 pt-1">
          <a className="text-base font-medium underline" href="">
            View Details
          </a>
          <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
        </button>
      </section>

      <section className={cardClassName}>
        <div className="flex flex-row items-center gap-2">
          <div className={iconClassName}>
            <Image
              src="/icons/icon-courseinprogress.svg"
              alt="In Progress icon"
              width={20}
              height={20}
            />
          </div>
          <div className="text-5xl font-bold">??</div>
        </div>
        <p className="pt-2 text-xl font-semibold">Course In Progress</p>
        <button className="flex flex-row items-center gap-2 pt-1">
          <a className="text-base font-medium underline" href="">
            View Details
          </a>
          <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
        </button>
      </section>

      <section className={cardClassName}>
        <div className="flex flex-row items-center gap-2">
          <div className={iconClassName}>
            <Image
              src="/icons/Group 1.svg"
              alt="Play Button icon"
              width={20}
              height={20}
            />
          </div>
          <div className="text-5xl font-bold">0</div>
        </div>
        <p className="pt-2 text-xl font-semibold">Upcoming Live Courses</p>
        <button className="flex flex-row items-center gap-2 pt-1">
          <a className="text-base font-medium underline" href="">
            View Details
          </a>
          <Image src="/icons/ArrowRight.svg" alt="Arrow" width={11} height={11} />
        </button>
      </section>
    </div>
  );
};

export default CourseInformationBox;
