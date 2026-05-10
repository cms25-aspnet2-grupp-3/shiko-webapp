import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/features/courses/lib/data/course-data";
import {
  formatLessonsLabel,
  getCourseImageSrc,
} from "@/features/courses/lib/course-display";
import { formatTotalDuration } from "@/features/courses/lib/format-duration";

type CourseCardProps = Readonly<{
  course: Course;
}>;

const CARD_CLASS_NAME = "rounded-2xl bg-white p-8 flex flex-col";
const INSTRUCTOR_AVATAR_PLACEHOLDER_SRC = "/images/avatar-placeholder.png";
// TODO: Add real review/rating logic in the review story.
const INSTRUCTOR_RATING_PLACEHOLDER = "4.8";

export default function CourseCard({ course }: CourseCardProps) {
  const courseImageSrc = getCourseImageSrc(course.imageUrl);
  const lessonsLabel = formatLessonsLabel(course.numberOfLessons);
  // TODO: Update avatar source when the instructor service is deployed.
  const instructorAvatarSrc = INSTRUCTOR_AVATAR_PLACEHOLDER_SRC;

  return (
    <li className={CARD_CLASS_NAME}>
      <article className="flex flex-col items-start justify-between gap-4">
        <div className="h-44 w-full overflow-hidden rounded-2xl">
          <Image
            src={courseImageSrc}
            alt=""
            width={640}
            height={176}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>

        <div className="flex items-center justify-start gap-2 text-sm text-gray-600">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={instructorAvatarSrc}
              alt=""
              width={32}
              height={32}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <span>Instructor</span>
          <span>{INSTRUCTOR_RATING_PLACEHOLDER}</span>
        </div>

        <div className="flex w-full items-center gap-2 text-sm text-gray-700">
          <span>{lessonsLabel}</span>
          <span>{formatTotalDuration(course.totalDurationMinutes)}</span>
          <Link
            href={`/courses/${course.id}`}
            className="ml-auto rounded-md bg-orange-500 p-3 font-medium text-white"
          >
            View Details
          </Link>
        </div>
      </article>
    </li>
  );
}
