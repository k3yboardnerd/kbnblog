/* eslint-disable react/prop-types */
import { HiOutlineTrash } from "react-icons/hi"
import { useDeleteSubscriberMutation } from "../../features/admin/subscribers/subscribersApiSlice"
import { AiOutlineReload } from "react-icons/ai"


export const SubscriberCard = ({ id, username, email, donationTotal }) => {
  const [deleteSubscriber, { isLoading }] = useDeleteSubscriberMutation()
  
  const handleDelete = async () => {
    const approved = confirm(`Are sure you want to delete ${username}?`)
    // if approved them delete this subscriber
    if (approved) {
      try {
        await deleteSubscriber(id).unwrap()
        alert(`You deleted ${username}!`)
      } catch (err) {
        alert(err.data?.message || err.error)
      }
    }
  }
  return (
    <div className="w-[100%] flex items-center justify-between bg-white p-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-sans font-bold">{username}</h1>
        <span className="text-slate-400 text-xs">{email}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="bg-violet-100 text-base py-1 px-4 rounded-lg text-violet-600">$ {Number(donationTotal).toFixed(2)}</span>
        {
          isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1 cursor-pointer" /> : <HiOutlineTrash className="text-red-600 cursor-pointer" onClick={handleDelete} />
        }
      </div>
    </div>
  )
}
