
import LiveChat from "./LiveChat";

type LiveChatPageProps = {
    params: Promise<{ courseId: string }>;
};

export default async function LiveChatPage({ params }: LiveChatPageProps) {
    const { courseId } = await params;

    const parsedCourseId = Number(courseId);

    if (!Number.isFinite(parsedCourseId)) {
        return <div>Invalid course id</div>;
    }

    return (
        <div className="flex justify-between gap-2">

            <section className="live-stream"></section>

            <section className="live-chat">
                <LiveChat chatId={parsedCourseId} />
            </section>

        </div>
    );
}