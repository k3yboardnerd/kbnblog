import { useParams } from "react-router-dom"
import { AiOutlineReload } from "react-icons/ai"
import { useGetPostByIdQuery } from "../features/posts/postsApiSlice"
import { HiAnnotation, HiBadgeCheck, HiClock, HiOutlineHeart, HiOutlineX } from "react-icons/hi"
import { IoChevronBack } from "react-icons/io5"
import { BiShareAlt } from "react-icons/bi"
import moment from "moment"
import { Link } from "react-router-dom"
import { Comments } from "../components/Comments"
import { SubscribeCard } from "../components/SubscribeCard"
import { useSelector } from "react-redux"
import { Footer } from "../components/Footer"
import { useState } from "react"
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share"

export default function Post() {
  const { postId } = useParams()
  const { subscriberInfo } = useSelector((state) => state.subscriber) || {}
  const { data: post, isLoading } = useGetPostByIdQuery({id: postId, data: subscriberInfo})

  const [isSharing, setIsSharing] = useState(false)

  const handleShare = () => {
    setIsSharing((sharing) => !sharing)
  }

  const goBack = () => {
    window.history.back()
  }

  if (isLoading && !post) {
    return <AiOutlineReload className="animate-spin text-4xl mx-auto mt-4" />;
  }

  if (post) {
    return (
      <div className="flex flex-col justify-between pt-4 m-auto space-y-6 sm:max-w-7xl">
        <div className="flex items-center justify-between px-2">
          <IoChevronBack onClick={goBack} className="text-slate-900 text-2xl cursor-pointer" />
          <div className="relative">
            <BiShareAlt className="text-slate-900 text-2xl cursor-pointer" onClick={handleShare} />
            <div className={`${isSharing ? 'flex' : 'hidden'} absolute bg-white rounded-lg shadow-2xl py-2 px-4 right-2 top-8 items-center gap-4`}>
              <FacebookShareButton onClick={handleShare} hashtag={`${post?.category}`} className="flex flex-col items-center gap-1" url={`${window.location.href}`}><FacebookIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Facebook</span></FacebookShareButton>
              <TwitterShareButton onClick={handleShare} title={`${post?.title}`} hashtags={[`${post?.category}`]} className="flex flex-col items-center gap-1" url={`${window.location.href}`}><XIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">X</span></TwitterShareButton>
              <WhatsappShareButton onClick={handleShare} title={`${post?.title}`} className="flex flex-col items-center gap-1" url={`${window.location.href}`}><WhatsappIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Whatsapp</span></WhatsappShareButton>
              <LinkedinShareButton onClick={handleShare} title={`${post?.title}`} className="flex flex-col items-center gap-1" url={`${window.location.href}`}><LinkedinIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">LinkedIn</span></LinkedinShareButton>
            </div>
          </div>
        </div>
        {
          subscriberInfo ?

            <main className="sm:grid sm:grid-cols-5 space-y-2">
              <section className="space-y-2 px-4 sm:col-span-3">
                <div className="flex justify-between items-center">
                  <Link className="flex justify-between items-center gap-4" to="/about">
                    <img src={post?.author.photo} alt={post?.author.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <span className=" flex items-center font-bold text-md text-slate-700"><span className="truncate">{post?.author.name}</span> <HiBadgeCheck className="text-sm text-violet-950" /> </span>
                      <h1 className="flex items-center font-normal text-xs text-slate-500"><HiClock className="text-slate-400" /><span className="truncate">{moment(post?.createdAt.toString()).fromNow()}</span></h1>
                    </div>
                  </Link>
                  <h1 className="flex items-center font-bold text-xs text-slate-600 mr-2"><HiAnnotation className="text-violet-600" /><span className="truncate">{post?.category}</span></h1>
                </div>
                <article className="flex flex-col box-content article gap-1" dangerouslySetInnerHTML={{ __html: post?.body }} />
              </section >
              <Comments postId={postId} />
            </main>
            :
            <div className="flex flex-col items-center pt-20 px-2 space-y-2">
              <h1 className="text-lg font-sans font-black">Please subscribe or login to view this post.</h1>
              <SubscribeCard />
            </div>
        }
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="m-auto flex flex-col max-w-[400px] self-center bg-white my-52 px-10 py-4 rounded-xl shadow-2xl space-y-8">
        <h1 className="text-base font-semibold font-sans text-zinc-700">Sorry, but this post/page does not exist or it was deleted or shown to people who donated a minimum of $5.00.</h1>
        <div className="flex items-center justify-end gap-4">
        <Link className=" flex items-center gap-2 bg-violet-300 text-violet-950 px-4 py-1 rounded-lg font-semibold text-base ring-4 ring-transparent hover:bg-violet-400 focus:bg-violet-600 active:bg-violet-800 focus:active:text-violet-100 focus:ring-violet-800 active:ring-violet-950" to="/donation">Donate <HiOutlineHeart /></Link>
        <Link className=" flex items-center gap-2 bg-violet-100 text-violet-950 px-4 py-1 rounded-lg font-semibold text-base ring-4 ring-transparent hover:bg-violet-200 focus:bg-violet-400 active:bg-violet-600 focus:active:text-violet-800 focus:ring-violet-400 active:ring-violet-600" to="/">Cancel <HiOutlineX /></Link>
        </div>
      </div>
    )
  }
}
