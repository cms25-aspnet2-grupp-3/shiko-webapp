export default function LiveChatPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Messages</h1>
          <input type="text" placeholder="Search..." className="w-full mt-2 p-2 bg-gray-100 rounded-lg text-sm" />
        </div>
        <div className="flex-1 overflow-y-auto">
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="p-4 bg-white border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <span className="font-bold">User Name</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
        </div>

        <footer className="p-4 bg-white border-t">
          <div className="flex gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200">
            <input 
              className="flex-1 bg-transparent px-4 outline-none" 
              placeholder="Write a message..."
            />
            <button className="bg-[#1D2939] text-white px-4 py-2 rounded-xl">Send</button>
          </div>
          
        </footer>
      </main>

    </div>
  );
}