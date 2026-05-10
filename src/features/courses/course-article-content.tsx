import { notFound } from "next/navigation";
import {
  fetchCourseById,
  type Course,
} from "@/features/courses/lib/data/course-data";
import {
  formatLessonsLabel,
  getCourseDescription,
} from "@/features/courses/lib/course-display";
import { formatTotalDuration } from "@/features/courses/lib/format-duration";
import Image from "next/image";
import CourseTabs from "@/features/courses/course-tabs";

type CourseArticleContentProps = {
  params: Promise<{
    slug: string;
  }>;
};

function toSlug(slug: string) {
  return decodeURIComponent(slug);
}

export default async function CourseArticleContent({
  params,
}: Readonly<CourseArticleContentProps>) {
  const { slug } = await params;
  const decodedSlug = toSlug(slug);
  let course: Course | null;

  try {
    course = await fetchCourseById(decodedSlug);
  } catch {
    return <p className="text-lg font-semibold">Something went wrong</p>;
  }

  if (!course) {
    notFound();
  }

  const lessonsSummaryLabel = formatLessonsLabel(
    course.numberOfLessons,
    "sentence",
  );
  // TODO: Add real review/rating logic in the review story.
  const instructorRatingPlaceholder = "4.8";
  const tabItems = [
    {
      tabLabel: "Overview",
      heading: "About",
      body:
        course.details?.description ??
        "This is placeholder overview content. Course summary and key outcomes will be shown here.",
    },
    {
      tabLabel: "FAQs",
      heading: "Frequently Asked Questions",
      body: "This is placeholder FAQ content. Common questions and answers will be added here.",
    },
    {
      tabLabel: "Reviews",
      heading: "Student Reviews",
      body: "This is placeholder reviews content. Student ratings and feedback will be shown here.",
    },
    {
      tabLabel: "Instructor",
      heading: "Meet Your Instructor",
      body: "This is placeholder instructor content. Instructor bio and experience will be shown here.",
    },
  ] as const;
  const fallbackKeyPoints = [] as const;
  const keyPoints =
    course.details?.keyPoints?.filter((point) => point.trim().length > 0) ??
    fallbackKeyPoints;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="rounded-2xl bg-white px-8 py-6 lg:col-span-2 grid gap-4">
        <div className="h-96 w-full overflow-hidden rounded-2xl">
          <Image
            src="/images/course-details-hero-placeholder.png"
            alt=""
            width={640}
            height={176}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">{course.title}</h1>
        <p className="text-md leading-8 tracking-wide text-gray-400">
          {getCourseDescription(course)}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <p>{lessonsSummaryLabel}</p>
          <p>{formatTotalDuration(course.totalDurationMinutes)}</p>
          <p>{instructorRatingPlaceholder}</p>
        </div>
        <CourseTabs items={tabItems} />
        <section className="grid gap-4 pt-2 justify-start">
          <h3 className="text-xl font-semibold text-gray-900">Key points</h3>
          <ul className="grid grid-cols-1 gap-2 text-sm text-gray-400 md:grid-cols-2">
            {keyPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Image src="/icons/check.svg" alt="" width={16} height={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <section className="rounded-2xl bg-white px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-900">Lessons</h2>
        {course.details?.lessons?.length ? (
          <ul className="mt-4 space-y-3">
            {course.details.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="rounded-lg border border-gray-200 px-4 py-3"
              >
                <p className="font-medium text-gray-900">{lesson.title}</p>
                <p className="text-sm text-gray-400">
                  {lesson.durationMinutes} minutes
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-gray-500">No lessons available.</p>
        )}
      </section>
    </div>
  );
}
