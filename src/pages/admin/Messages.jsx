import { useGetMessagesQuery } from "../../features/admin/messages/messagesApiSlice"
import { MessageCard } from "../../components/admin/MessageCard"
import { AiOutlineReload } from "react-icons/ai"
import moment from "moment"

export const Messages = () => {
  const { data: messages, isLoading } = useGetMessagesQuery(null, {
    pollingInterval: 1000,
    refetchOnMountOrArgChange: true
  })
  return (
    <div className="space-y-4 p-4 pb-40 bg-violet-50 min-h-full max-h-screen overflow-y-scroll flex flex-col items-center">
      {
        isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : messages && messages?.map((message) => (<MessageCard key={message.id} id={message.id} email={message.subscriber.email} username={message.subscriber.username} date={moment(message.date.toString()).fromNow()} message={message.text} subject={message.subject} />))
      }
    </div>
  )
}
