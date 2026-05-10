export default function CourseSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="animate-pulse rounded-2xl bg-white px-8 py-6 lg:col-span-2">
        <div className="h-8 w-2/3 rounded bg-gray-200" />
        <div className="mt-4 h-5 w-full rounded bg-gray-200" />
        <div className="mt-3 h-5 w-5/6 rounded bg-gray-200" />
        <div className="mt-3 h-5 w-4/6 rounded bg-gray-200" />
        <div className="mt-6 h-4 w-1/3 rounded bg-gray-200" />
      </section>

      <section className="animate-pulse rounded-2xl bg-white px-6 py-6">
        <div className="h-7 w-1/2 rounded bg-gray-200" />
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-gray-200 px-4 py-3">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
          </div>
          <div className="rounded-lg border border-gray-200 px-4 py-3">
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/4 rounded bg-gray-200" />
          </div>
          <div className="rounded-lg border border-gray-200 px-4 py-3">
            <div className="h-5 w-4/5 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
          </div>
        </div>
      </section>
    </div>
  );
}
