import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi"
import { useSelector } from "react-redux"


export const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  return (
    <div className="bg-white shadow-lg px-4 py-3 sm:px-8 flex text-xl justify-between items-center">
      <form method="post">
        <label className="flex items-center gap-2 bg-violet-100 py-1 px-4 rounded-lg" htmlFor="search">
          <HiOutlineSearch className="text-base text-violet-600" />
          <input className="bg-transparent text-base w-[250px]" type="search" name="search" id="search" placeholder="Search anything..." />
        </label>
      </form>

      <div className="flex items-center justify-between gap-4">
        <HiOutlineBell />
<Link to="/kbn/profile">
        <img className="h-10 w-10 rounded-full object-cover" src={userInfo.photo} alt={userInfo.name} />
        <h1 className="text-xs text-violet-500 font-sans">Hi {userInfo.name}</h1>
</Link>
      </div>
    </div>
  )
}
