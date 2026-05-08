import LiveChat from "./LiveChat";

type LiveChatPageProps = {
    params: Promise<{courseId:string}>;
}

export default async function LiveChatPage({params}:LiveChatPageProps){
    const {courseId} = await params;

    return(
        <div className="flex justify-between gap-2">

            <section className="live-stream"></section>

            <section className="live-chat">
                <LiveChat chatId={courseId} />
            </section>

        </div>
    )
}