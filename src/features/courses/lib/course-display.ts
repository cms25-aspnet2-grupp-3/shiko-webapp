import type { Course } from "@/features/courses/lib/data/course-data";

const COURSE_IMAGE_PLACEHOLDER_SRC = "/images/course-placeholder.png";
const COURSE_DESCRIPTION_FALLBACK = "No description available.";

type LessonsLabelCase = "sentence" | "title";

export const formatLessonsLabel = (
  lessonCount: number,
  labelCase: LessonsLabelCase = "title",
): string => {
  const safeLessonCount = Math.max(0, lessonCount || 0);
  const lessonWord = labelCase === "sentence" ? "lesson" : "Lesson";
  return `${safeLessonCount} ${lessonWord}${safeLessonCount === 1 ? "" : "s"}`;
};

export const getCourseImageSrc = (imageUrl?: string | null): string => {
  return imageUrl?.trim() ? imageUrl : COURSE_IMAGE_PLACEHOLDER_SRC;
};

export const getCourseDescription = (course: Course): string => {
  return course.details?.description?.trim() || COURSE_DESCRIPTION_FALLBACK;
};
