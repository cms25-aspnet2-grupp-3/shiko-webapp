import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-[28px] bg-white p-10 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
        <h1 className="text-[20px] font-semibold text-[#232f45]">
          Buttons Style Guide
        </h1>
        <p className="mt-2 text-sm text-[#8b93a7]">
          Reusable button styles inspired by the Shiko dashboard design.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button variant="primary" rightIcon="+">
            Join Community
          </Button>

          <Button variant="secondary">Download App</Button>

          <Button variant="ghost">View Details</Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Button variant="primary" size="sm">
            Small Button
          </Button>

          <Button variant="primary" size="md">
            Medium Button
          </Button>

          <Button variant="primary" size="lg">
            Large Button
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Button variant="secondary" disabled>
            Disabled Button
          </Button>
        </div>

        <div className="mt-10">
          <Button variant="ghost" fullWidth>
            Full Width Button
          </Button>
        </div>
      </div>
    </main>
  );
}