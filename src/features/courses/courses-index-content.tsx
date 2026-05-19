import CourseCard from "./course-card";
import {
  fetchCourses,
  type Course,
} from "@/features/courses/lib/data/course-data";

export default async function CoursesIndexContent() {
  let courses: Course[];

  try {
    courses = await fetchCourses();
  } catch {
    return <p className="text-lg font-semibold">Something went wrong</p>;
  }

  return (
    <>
      {courses.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">
          No courses are available yet.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2 2xl:grid-cols-3 content-start">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      )}
    </>
  );
}
