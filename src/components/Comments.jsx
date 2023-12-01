/* eslint-disable react/prop-types */
import { AiOutlineReload } from "react-icons/ai"
import { useGetCommentsQuery } from "../features/comments/commentsApiSlice"
import { Comment, CommentForm } from "./Comment"
import { HiAnnotation } from "react-icons/hi"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

export const Comments = ({ postId }) => {
  const { data: comments, isLoading } = useGetCommentsQuery(postId, {
    pollingInterval: 1000,
    refetchOnMountOrArgChange: true
  })
  const { subscriberInfo } = useSelector((state) => (state.subscriber))
  if (isLoading) {
    return <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" />;
  }

  if (comments) {
    return (
      <section className="flex flex-col space-y-2 bg-slate-100 p-4 min-h-full max-h-full sm:min-h-[400px] sm:max-h-screen overflow-y-auto col-span-2 sm:mt-[5.6rem]">
        <small className="flex items-center"><HiAnnotation className="text-violet-600" /><span>Comments</span></small>
        {subscriberInfo && <CommentForm postId={postId} />}
        {comments.message ? <h1 className="m-auto text-base text-slate-500 italic">{comments.message}</h1> : comments.map((comment) => (<Comment key={comment?._id} id={comment?._id} authorName={comment?.subscriber.username} comment={comment?.comment} authorId={comment?.subscriber._id} date={comment?.date} />))}
      </section>
    )
  } else if (!comments) {
    return (
      <section className="flex flex-col space-y-2 bg-slate-100 shadow-xl p-4 rounded-lg overflow-y-scroll max-h-[400px] sm:max-h-[400px] col-span-1 sm:mt-[5.6rem]">
        <small className="flex items-center"><HiAnnotation className="text-violet-600" /><span>Comments</span></small>
        {subscriberInfo && <CommentForm postId={postId}/>}
      </section>
    )
  }
}
