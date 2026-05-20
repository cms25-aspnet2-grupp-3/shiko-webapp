export default function CoursesIndexSkeleton() {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2 2xl:grid-cols-3 content-start">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index} className="animate-pulse rounded-2xl bg-white p-8">
          <div className="h-44 w-full rounded-2xl bg-gray-200" />
          <div className="mt-4 h-7 w-3/4 rounded bg-gray-200" />
          <div className="mt-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-10 rounded bg-gray-200" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
            <div className="ml-auto h-10 w-28 rounded-md bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
}
