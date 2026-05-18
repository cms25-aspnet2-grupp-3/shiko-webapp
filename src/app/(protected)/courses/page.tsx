import { Suspense } from "react";
import type { Metadata } from "next";

import CoursesIndexContent from "@/features/courses/courses-index-content";
import CoursesIndexSkeleton from "@/features/courses/courses-index-skeleton";

export const metadata: Metadata = {
  title: "Courses | Shiko Portal",
  description: "Browse all courses.",
};

export default function CoursesPage() {
  return (
    <section>
      <h1 className="text-5xl font-extrabold">Courses</h1>
      <p className="my-4 text-md text-gray-400">
        Browse available courses and open each course for details and lessons.
      </p>
      <Suspense fallback={<CoursesIndexSkeleton />}>
        <CoursesIndexContent />
      </Suspense>
    </section>
  );
}
