/* eslint-disable react/prop-types */
import { HiBadgeCheck, HiOutlineChat, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import moment from 'moment'
import { PiDotDuotone } from "react-icons/pi"
import { Link } from "react-router-dom"
import {  useAdminDeletePostMutation } from "../../features/admin/posts/postsApiSlice"
import { AiOutlineReload } from "react-icons/ai"

export const PostCard = ({ id, title, cover, authorName, authorPhoto, onClick, date, category, commentsTotal, viewsTotal }) => {
  const [deletePost, { isLoading }] = useAdminDeletePostMutation()
  const handleDelete = async (e) => {
    e.preventDefault()
    const approve = confirm("Are you sure that you want to delete this post? NB: You can edit the post if you mispelled or have error in it.")
    if (approve) {
      try {
        const res = await deletePost(id)
        alert(res.data.message)
      } catch (err) {
        alert(err.data?.message || err.error)
      }
    } else {
      alert('Please edit those errors!')
    }

  }
  return (
    <div onClick={onClick} className="h-[120px] w-[500px] flex bg-white shadow-md rounded-lg hover:bg-slate-50">
      <div className="h-full w-[200px]">
        <img className="h-full w-full object-cover rounded-tl-lg rounded-bl-lg" src={cover} alt={title} />
      </div>

      <div className="flex flex-col justify-between p-2 w-[400px]">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base"><Link to={`/${id}`}>{title}</Link></h1>

          <div className="flex items-center justify-between gap-2">
            <Link to={`/kbn/posts/${id}`}><HiOutlinePencil /></Link>
            <Link onClick={handleDelete}><HiOutlineTrash /></Link>
          </div>
        </div>
        <h4 className="text-sm font-medium text-violet-500"><span className="bg-violet-100 px-2 rounded-md">{category}</span></h4>
        {/* auhtor */}
        {isLoading ? <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" /> :
          <div className="flex justify-between gap-2 items-center">
            <div className="flex justify-between gap-2 items-center">
              <img src={authorPhoto} alt={authorName} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex flex-col justify-between items-start">
                <span className=" flex items-center font-semibold text-sm text-slate-950"><span className="truncate">{authorName}</span> <HiBadgeCheck className="text-sm text-violet-950" /> </span>
                <span className="truncate font-normal text-[0.6rem] text-slate-600 flex items-center gap-1"><PiDotDuotone /> <span>{moment(date).fromNow()}</span></span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs"><HiOutlineEye className="text-xl" />{viewsTotal}</span>
              <span className="flex items-center gap-2 text-xs"><HiOutlineChat className="text-xl" />{commentsTotal}</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
