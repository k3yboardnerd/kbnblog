/* eslint-disable react/prop-types */
// import defaultPic from "../assets/image/img (3).
import { Link } from "react-router-dom"
import { HiBadgeCheck } from "react-icons/hi"
import { PiDotDuotone } from "react-icons/pi"
import moment from "moment"
import { BiShareAlt } from "react-icons/bi"
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, XIcon, WhatsappIcon, LinkedinIcon} from "react-share"
import { useState } from "react"
// eslint-disable-next-line react/prop-types
export default function PostCard({ title, id, category, image, authorAvatar, authorName, createdAt }) {
  const [isSharing, setIsSharing] = useState(false)
  const handleShare = () => {
    setIsSharing((sharing) => !sharing)
  }
  return (
    <div className="w-[95%] h-[350px] bg-white shadow-md rounded-lg relative">
      <Link to={`/${id}`}>
        <img src={image} alt="" className="w-full h-[60%] object-cover rounded-t-lg" />
      </Link>
      <div className="px-5 py-4 space-y-3">
        <h4 className="text-sm font-medium text-slate-500">{category}</h4>
        <h1 className="truncate font-bold text-xl"><Link to={`/${id}`}>{title}</Link></h1>
        <div className="flex justify-between items-center">
          <Link to="/about" className="flex justify-between gap-2 items-center">
            <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col justify-between items-start">
              <span className=" flex items-center font-semibold text-sm text-slate-950"><span className="truncate">{authorName}</span> <HiBadgeCheck className="text-sm text-violet-950" /> </span>
              <span className="truncate font-normal text-[0.6rem] text-slate-600 flex items-center gap-1"><PiDotDuotone /> <span>{moment(createdAt).fromNow()}</span></span>
            </div>
          </Link>

          <div className="relative">
            <BiShareAlt className="text-slate-900 text-2xl cursor-pointer" onClick={handleShare} />
            <div className={`${isSharing ? 'flex' : 'hidden'} absolute bg-white rounded-lg shadow-2xl py-2 px-4 right-2 top-8 items-center gap-2 z-10`}>
              <FacebookShareButton onClick={handleShare} hashtag={`${category}`}  className="flex flex-col items-center gap-1" url={`${window.location.href}/${id}`}><FacebookIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Facebook</span></FacebookShareButton>
              <TwitterShareButton onClick={handleShare} title={`${title}`} hashtags={[`${category}`]}  className="flex flex-col items-center gap-1" url={`${window.location.href}/${id}`}><XIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">X</span></TwitterShareButton>
              <WhatsappShareButton onClick={handleShare} title={`${title}`} className="flex flex-col items-center gap-1" url={`${window.location.href}/${id}`}><WhatsappIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Whatsapp</span></WhatsappShareButton>
              <LinkedinShareButton onClick={handleShare} title={`${title}`} className="flex flex-col items-center gap-1" url={`${window.location.href}/${id}`}><LinkedinIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">LinkedIn</span></LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
