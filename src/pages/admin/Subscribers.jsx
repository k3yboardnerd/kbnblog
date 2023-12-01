
import { AiOutlineReload } from "react-icons/ai"
import { SubscriberCard } from "../../components/admin/SubscriberCard"
import { useGetSubscribersQuery } from "../../features/admin/subscribers/subscribersApiSlice"

export const Subscribers = () => {
  const { data: subscribers, isLoading } = useGetSubscribersQuery(null, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true
  })

  return (
    <div className="p-4 pb-40 w-full min-h-full max-h-screen overflow-y-scroll flex flex-col divide-y items-center">
      {isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : subscribers?.map((subscriber) => (<SubscriberCard key={subscriber?._id} id={subscriber?._id} username={subscriber?.username} email={subscriber?.email} donationTotal={subscriber?.donationTotal} />))}
    </div>
  )
}
