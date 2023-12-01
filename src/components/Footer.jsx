import { FaFacebookMessenger, FaLinkedinIn, FaTelegramPlane, FaTwitter } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeSubscriber } from "../features/subscribers/subscriptionSlice"


export const Footer = () => {
  const { subscriberInfo } = useSelector((state) => state.subscriber)
  const dispatch = useDispatch()

  // handle logout, logs out the subscriber by removing their logged in info
  const handleLogout = (e) => {
    e.preventDefault()
    // confirm that the subscriber really wants to logout
    const approved = confirm(`${subscriberInfo.username} are you sure that you want to logout? N.B: You won't be able to see posts!`)
    if (approved) {
      // remove subscriber info
      dispatch(removeSubscriber())
    }
  }
  return (
    <div className="flex flex-col items-center justify-between m-auto py-6">
      {/* <Link to="/promotion" className="underline text-xs text-violet-600">Do you want to advertise or promote?</Link> */}
      <ul className="text-2xl flex gap-6 text-violet-500 py-6 m-auto">
        <li><a href="https://t.me/k3yboardnerd"><FaTelegramPlane /></a></li>
        <li><a href="https://m.me/k3yboardnerd"><FaFacebookMessenger /></a></li>
        <li><a href="https://linkedin.com/in/k3yboardnerd"><FaLinkedinIn /></a></li>
        <li><a href="https://x.com/k3yboardnerd"><FaTwitter /></a></li>
      </ul>

      <div className="flex items-center justify-between m-auto gap-4 text-xs text-slate-600 font-sans">
        <Link className="underline" to='/about'>About</Link>
        <Link className="underline" to='/'>Posts</Link>
        <Link className="underline" to='/donation'>Donate</Link>
        {/* <Link className="underline" to='/promotion'>Ads & Promos</Link> */}
        {subscriberInfo && <Link className="underline" onClick={handleLogout}>Logout</Link>}
      </div>
    </div>
  )
}
