import Logo from "./Logo"
import { Link } from "react-router-dom"
import { HiOutlineHeart } from "react-icons/hi"

export default function Header() {

  return (
    <div className="bg-white px-4 py-3 sm:px-8 flex text-xl justify-between items-center">
      <Link to="/"><Logo className="text-md font-black text-violet-800 font-sans" /></Link>
      <Link className="flex items-center gap-2 bg-violet-300 text-violet-950 px-4 py-1 rounded-lg font-semibold text-base ring-4 ring-transparent hover:bg-violet-400 focus:bg-violet-600 active:bg-violet-800 focus:active:text-violet-100 focus:ring-violet-800 active:ring-violet-950" to="/donation">Donate <HiOutlineHeart /></Link>
    </div>
  )
}
