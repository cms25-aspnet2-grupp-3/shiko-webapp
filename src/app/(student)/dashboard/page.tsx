import ChatBox from "@/components/ChatBox";

export default function StudentPage() {
  return (
    <div className="grid gap-8">
      <div className="rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
        <p>Här är din översikt.</p>
      </div>

      <div className="w-full max-w-sm">
        <ChatBox />
      </div>
    </div>
  );
}