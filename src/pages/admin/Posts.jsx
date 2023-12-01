import { useGetAllPostsQuery } from "../../features/admin/posts/postsApiSlice"
import { PostCard } from '../../components/admin/PostCard'
import { useAdminGetCommentsQuery } from "../../features/admin/comments/commentsApiSlice"
import { useState } from "react"
import { HiAnnotation } from "react-icons/hi"
import { Comment } from "../../components/Comment"
import { AiOutlineReload } from "react-icons/ai"


export const Posts = () => {
  const { data: posts, isLoading: loadPosts } = useGetAllPostsQuery(null, {
    pollingInterval: 1000,
    refetchOnMountOrArgChange: true
  })

  const [viewedPost, setViewedPost] = useState(null)

  const { data: comments, isLoading } = useAdminGetCommentsQuery(viewedPost, {
    pollingInterval: 1000,
    refetchOnMountOrArgChange: true,
    skip: viewedPost === null
  })

  return (
    <div className="grid grid-cols-2 overflow-y-scroll overflow-x-hidden col-span-5 min-h-full max-h-screen place-content-start justify-between p-4 pb-40 gap-4 bg-violet-50 divide-x-2">
      <section className="flex flex-col gap-2 items-center">
        {loadPosts ? <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" /> : posts?.map((post) => (<PostCard onClick={() => setViewedPost(post?._id)} key={post._id} id={post._id} authorName={post.author.name} authorPhoto={post.author.photo} title={post.title} viewsTotal={post.views} commentsTotal={post.comments} cover={post.cover} date={post.date} category={post.category} />))}
      </section>

      <section className="flex flex-col space-y-2  p-4 h-full overflow-y-auto">
        <small className="flex items-center"><HiAnnotation className="text-violet-600" /><span>Comments</span></small>
        {
          isLoading ? <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" /> : comments?.message ? <h1 className="m-auto text-base text-slate-500 italic">{comments?.message}</h1> : isLoading ? <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" /> : comments?.map((comment) => (<Comment key={comment._id} id={comment._id} authorName={comment.subscriber.username} comment={comment.comment} authorId={comment.subscriber._id} date={comment.date} />))        
        }
      </section>

    </div>
  )
}
