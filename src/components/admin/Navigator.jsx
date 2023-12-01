import { Link, useLocation } from "react-router-dom"
import Logo from "../Logo"
import { HiOutlineAnnotation, HiOutlineChat, HiOutlineDocumentAdd, HiOutlineUserGroup, HiOutlineViewGrid } from "react-icons/hi"


export const Navigator = () => {
  const location = useLocation()
  
  return (
    <div className='bg-white shadow-lg flex flex-col h-full p-4 col-span-1 gap-20 justify-between'>
      <Link to="/" className="self-center"><Logo className="text-5xl font-black text-violet-800 font-sans" /></Link>
      <div className="h-full flex flex-col gap-10 justify-between">
        <div className="flex flex-col items-start gap-10 p-4 justify-between">
          <Link className={`flex items-center gap-3 ${location.pathname === '/kbn/' ? 'bg-violet-800 text-white' : 'bg-transparent text-black'} text-md font-semibold font-sans hover:bg-violet-100 hover:text-violet-800 focus:bg-violet-600 focus:text-violet-100 active:bg-violet-800 active:text-white px-6 py-2 rounded-lg w-full`} to='/kbn/'><HiOutlineViewGrid /> <span>Home</span></Link>
          <Link className={`flex items-center gap-3 ${location.pathname === '/kbn/messages' ? 'bg-violet-800 text-white' : 'bg-transparent text-black'} text-md font-semibold font-sans hover:bg-violet-100 hover:text-violet-800 focus:bg-violet-600 focus:text-violet-100 active:bg-violet-800 active:text-white px-6 py-2 rounded-lg w-full`} to='/kbn/messages'><HiOutlineChat /> <span>Messages</span></Link>
          <Link className={`flex items-center gap-3 ${location.pathname === '/kbn/posts' ? 'bg-violet-800 text-white' : 'bg-transparent text-black'} text-md font-semibold font-sans hover:bg-violet-100 hover:text-violet-800 focus:bg-violet-600 focus:text-violet-100 active:bg-violet-800 active:text-white px-6 py-2 rounded-lg w-full`} to='/kbn/posts'><HiOutlineAnnotation /> <span>Posts</span></Link>
          <Link className={`flex items-center gap-3 ${location.pathname === '/kbn/subscribers' ? 'bg-violet-800 text-white' : 'bg-transparent text-black'} text-md font-semibold font-sans hover:bg-violet-100 hover:text-violet-800 focus:bg-violet-600 focus:text-violet-100 active:bg-violet-800 active:text-white px-6 py-2 rounded-lg w-full`} to='/kbn/subscribers'><HiOutlineUserGroup /> <span>Suscribers</span></Link>
        </div>

        <Link to='/kbn/edit' className={`${location.pathname === '/kbn/edit' ? 'bg-violet-800 text-white' : 'bg-violet-100 text-violet-400'} hover:bg-violet-400 focus:bg-violet-600 active:bg-violet-800 hover:text-violet-600 focus:text-violet-100 active:text-white p-8 flex flex-col items-center justify-center rounded-lg w-[90%] h-[40%]`}>
          <HiOutlineDocumentAdd className="text-9xl" />
          <h1 className="text-xs">Draft New Article</h1>
        </Link>
      </div>
    </div>
  )
}
