// import img from "../assets/image/img (5).jpg"
import { useAboutQuery } from "../features/users/usersApiSlice"
import { IoChevronBack } from "react-icons/io5"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"
import { SubscribeCard } from "../components/SubscribeCard"
import { Footer } from "../components/Footer"
import { useSendMessageMutation } from "../features/messages/messageApiSlice"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AiOutlineReload } from "react-icons/ai"
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from "react-share"
import { BiShareAlt } from "react-icons/bi"

export default function About() {
  const { data } = useAboutQuery()
  const { subscriberInfo } = useSelector((state) => state.subscriber) || {}
  const [sendMessage, { isLoading }] = useSendMessageMutation()
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = () => {
    setIsSharing((sharing) => !sharing)
  }

  const goBack = () => {
    window.history.back()
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    // try to send the message
    try {
      const res = await sendMessage({ subscriber: subscriberInfo._id, text: message, subject })
      if (res) {
        setSubject("")
        setMessage("")
        toast.success(res.data?.message)
      }
    } catch (err) {
      toast.error(err.data.message || err.error)

    }
  }

  return (
    <div className="flex flex-col justify-between m-auto px-2 py-8 space-y-6 overflow-y-auto overflow-x-hidden max-w-2xl">
      <div className="flex items-center justify-between">
        <IoChevronBack onClick={goBack} className="text-slate-900 text-3xl self-start cursor-pointer" />
        <div>
          <BiShareAlt className="text-slate-900 text-2xl cursor-pointer" onClick={handleShare} />
          <div className={`${isSharing ? 'flex' : 'hidden'} absolute bg-white rounded-lg shadow-2xl py-2 px-4 right-2 top-32 items-center gap-4`}>
            <FacebookShareButton onClick={handleShare} hashtag="About" className="flex flex-col items-center gap-1" url={`${window.location.href}`}><FacebookIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Facebook</span></FacebookShareButton>
            <TwitterShareButton onClick={handleShare} title="About" className="flex flex-col items-center gap-1" url={`${window.location.href}`}><XIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">X</span></TwitterShareButton>
            <WhatsappShareButton onClick={handleShare} title="About" className="flex flex-col items-center gap-1" url={`${window.location.href}`}><WhatsappIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">Whatsapp</span></WhatsappShareButton>
            <LinkedinShareButton onClick={handleShare} title="About" className="flex flex-col items-center gap-1" url={`${window.location.href}`}><LinkedinIcon className="h-10 w-10 rounded-full" /><span className="text-xs font-semibold text-zinc-400 font-sans">LinkedIn</span></LinkedinShareButton>
          </div>
        </div>
      </div>
      <ToastContainer />
      {
        subscriberInfo ?
          <>
            <img className="w-40 h-40 rounded-full object-cover block ring-4 ring-violet-800 m-auto" src={data?.photo} alt="Profile Picture" />
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-xl font-bold text-slate-800">Loyiso <span className="text-violet-800">k3yboardnerd</span> Dlamini</h1>
              <h4 className="text-xs text-slate-500 font-medium">Software Engineer, Founder, Director & CEO</h4>
            </div>
            <p className="text-slate-800 fit text-base font-medium bg-slate-100 p-4 rounded-lg shadow-md">I am a dedicated and passionate person, who loves coding and learning, I created this blog to share my knowledge and also give insights in topics that relate to <span className="text-violet-600">Tech</span>, <span className="text-violet-600">A.I</span>, <span className="text-violet-600">Security</span> and <span className="text-violet-600">Cyber Security.</span></p>
            <form className="bg-slate-100 rounded-lg p-4 shadow-lg flex flex-col w-full space-y-4" onSubmit={handleSendMessage} method="post">
              <div className="flex flex-col space-y-4">
                <label className="font-medium font-sans text-slate-600 px-1" htmlFor="subject">Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 resize-y hover:ring-violet-600 focus:ring-violet-800 " name="subject" id="subject" type="text" required />
                <label className="font-medium font-sans text-slate-600 px-1" htmlFor="message">Your Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 resize-y hover:ring-violet-600 focus:ring-violet-800 " name="message" id="message" cols="30" rows="4" required ></textarea>
              </div>
              {
                subscriberInfo.donationTotal >= 2 ?
                  (message.length && subject.length) >= 2 && <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold uppercase tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : "Send"}</button>
                  : (message.length && subject.length) >= 2 &&
                  <Link to="/donation" className="text-xs m-auto underline text-violet-600">A minimum of $2.00 donation is required to send this message.</Link>
              }
            </form>
          </>
          :
          <div className="flex flex-col items-center pt-20 px-2 space-y-2">
            <h1 className="text-md font-sans font-black">Please subscribe or login to view this author.</h1>
            <SubscribeCard />
          </div>
      }
      <Footer />
    </div>
  )
}
