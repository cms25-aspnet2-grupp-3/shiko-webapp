import ChatBox from "@/components/ChatBox";

export default function DashboardPage() {
  return (

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
      
      <div className="lg:col-span-2 space-y-8">
        <div className="rounded-2xl p-8 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <p>Här är din översikt.</p>
        </div>
        
      </div>

      <div className="w-full">
        <ChatBox />
      </div>
      
    </div>
  );
}