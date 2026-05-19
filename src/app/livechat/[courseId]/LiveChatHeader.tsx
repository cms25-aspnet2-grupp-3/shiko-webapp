type LiveChatHeaderProps = {
    isConnected: boolean;
}

export default function LiveChatHeader({ isConnected }: LiveChatHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Live Chat</h1>
            <p className="mt-1 text-sm text-slate-400">
                {isConnected ? "Connected" : "Disconnected"}
            </p>
        </div>
    )
}