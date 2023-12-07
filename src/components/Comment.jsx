/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import { HiPencil } from "react-icons/hi"
import { AiFillDelete } from "react-icons/ai"
import { HiBadgeCheck, HiClock } from "react-icons/hi"
import { SlOptions } from "react-icons/sl"
import { AiOutlineReload } from "react-icons/ai"
import moment from "moment"
import { useCreateCommentMutation, useDeleteCommentMutation } from "../features/comments/commentsApiSlice"
import { useState } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


export const Comment = ({ id, authorId, authorName, auhtorAdmin, comment, date }) => {
  const [optionsActive, setOptionsActive] = useState(false)
  const { subscriberInfo } = useSelector((state) => state.subscriber)
  const [deleteComment, {isLoading, isSuccess}] = useDeleteCommentMutation()
  
  const handleOptions = () => {
    if (optionsActive) {
      setOptionsActive((prev) => !prev)
    } else {
      setOptionsActive((prev) => !prev)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteComment(id).unwrap()
      if (isSuccess) {
        toast.success("Comment Deleted")
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
    setOptionsActive((prev) => !prev)
  }

  if (subscriberInfo) {
    return (
      <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg p-4 ">
        <div className="flex justify-between items-center relative">
          <div className="flex justify-between items-center gap-4">
            <div>
              <span className=" flex items-center font-bold text-md text-slate-700"><span className="truncate">{authorName}</span> {auhtorAdmin && <HiBadgeCheck className="text-sm text-violet-950" />} </span>
              <h1 className="flex items-center font-normal text-xs text-slate-500"><HiClock className="text-slate-400" /><span className="truncate">{moment(date.toString()).fromNow()}</span></h1>
            </div>
          </div>
          {subscriberInfo._id === authorId ?
            <>
              <SlOptions onClick={handleOptions} className="text-slate-600 justify-self-end text-md cursor-pointer" />
              <div className={optionsActive ? "absolute z-10 flex flex-col bg-slate-100 shadow-2xl rounded-lg transition-all p-2 space-y-1 left-auto right-0 top-8 bottom-auto sm:flex" : "hidden"}>
                {/* <Link className="text-sm font-medium transition-all ring-2 ring-transparent hover:bg-violet-300 focus:bg-violet-600 focus:text-white focus:ring-violet-800 rounded-lg px-4 py-1" onClick={handleEdit}>Edit</Link> */}
                <Link className="flex justify-between items-center gap-2 text-sm font-medium transition-all ring-2 ring-transparent hover:bg-violet-300 focus:bg-violet-600 focus:text-white focus:ring-violet-800 rounded-lg px-4 py-1" onClick={handleDelete}><AiFillDelete /><span>Delete</span></Link>
              </div>
            </>
            :
            null
          }
        </div>
        <p className="text-sm font-medium text-slate-700">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : comment }</p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-between bg-white shadow-lg rounded-lg space-y-1">
        <div className="flex justify-between items-center bg-violet-500 p-2 rounded-t-lg">
          <div className="flex justify-between items-center gap-4">
            <div>
              <span className=" flex items-center font-bold text-md text-white"><span className="truncate">{authorName}</span> {auhtorAdmin && <HiBadgeCheck className="text-sm text-violet-950" />} </span>
              <h1 className="flex items-center font-medium text-xs text-violet-950"><HiClock className="text-violet-800" /><span className="truncate">{moment(date.toString()).fromNow()}</span></h1>
            </div>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700 p-2">{comment}</p>
      </div>
    )
  }
}

export const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('')
  const [createComment, { isLoading }] = useCreateCommentMutation()
  const {subscriberInfo} = useSelector((state) => state.subscriber)
  // const [updateComment] = useUpdateCommentMutation()
  // const { editComment } = useSelector((state) => state.comment)
  
  // useEffect(() => {
  //   if (editComment != null) {
  //     setComment(editComment.comment)
  //   }
  // }, [editComment])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(comment && postId)) {
      toast.error("Unauthorized!")
    } else {
      try {
        const res = await createComment({ comment, postId, subscriber: subscriberInfo._id }).unwrap()
        toast.success(res.data)
        setComment('')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <form className="bg-slate-100 rounded-lg p-4 shadow-lg flex flex-col w-full space-y-4" onSubmit={handleSubmit} method="post">
      <div className="flex flex-col space-y-4">
        <label className="font-medium font-sans text-slate-600 px-1" htmlFor="comment">Write Comment</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 resize-y hover:ring-violet-600 focus:ring-violet-800 " name="comment" id="comment" cols="30" rows="2"></textarea>
      </div>
      {
        // subscriberInfo.donationTotal >= 1 ?
          comment.length >= 2 && <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold uppercase tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : "Send"}</button>
        // : comment.length >= 2 && <Link to="/donation" className="m-auto underline text-violet-600 text-xs">A minimum of $1.00 donation is required to comment.</Link>
      }
    </form>
  )
}
