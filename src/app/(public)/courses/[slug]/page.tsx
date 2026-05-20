import { Suspense } from "react";
import type { Metadata } from "next";

import CourseArticleContent from "@/features/courses/course-article-content";
import CourseDetailSkeleton from "@/features/courses/course-detail-skeleton";
import { fetchCourseById, fetchCourses } from "@/features/courses/lib/data/course-data";

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const courses = await fetchCourses();

  return courses.map((course) => ({
    slug: course.id,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await fetchCourseById(decodeURIComponent(slug));

  if (!course) {
    return {
      title: "Courses | Shiko Portal",
    };
  }

  return {
    title: `${course.title} | Courses`,
    description: course.details?.description || `View ${course.title} course details.`,
  };
}

export default function CourseSlugPage({ params }: CoursePageProps) {
  return (
    <article>
      <Suspense fallback={<CourseDetailSkeleton />}>
        <CourseArticleContent params={params} />
      </Suspense>
    </article>
  );
}
