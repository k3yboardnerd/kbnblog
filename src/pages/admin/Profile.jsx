import img from "../../assets/image/emptyprofile.png"
import { Link, useNavigate } from "react-router-dom"
import { HiBadgeCheck, HiOutlineBell, HiOutlineBookmark, HiOutlineHeart } from "react-icons/hi"
import { AiOutlineRight, AiOutlineReload, AiFillCheckCircle } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { useUpdateMutation, useUpdatePhotoMutation } from "../../features/users/usersApiSlice"
import { setCredentials } from "../../features/users/authSlice"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { IoChevronBack } from "react-icons/io5"

export default function Profile() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
  const [photo, setPhoto] = useState("")

  const { userInfo } = useSelector((state) => state.auth) // userInfo
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [update, { isLoading }] = useUpdateMutation()
  const [profilePitcture, { isLoading: uploading }] = useUpdatePhotoMutation()

  useEffect(() => {
    setEmail(userInfo.email)
  }, [userInfo.email, userInfo.setEmail])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
    } else {
      try {
        const res = await update({
          _id: userInfo._id,
          name: userInfo.name,
          admin: userInfo.admin,
          photo: userInfo.photo,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated!')
        setPassword('')
        setConfirmPassword('')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const updateProfilePicture = async (e) => {
    e.preventDefault()
    if (photo) {
      try {
        const res = await profilePitcture({ photo }).unwrap()
        // eslint-disable-next-line no-prototype-builtins
        if (res.hasOwnProperty("_id")) {
          toast.success("Photo updated successfully!")
          setIsPhotoUploaded((prev) => !prev)
        } else {
          toast.error("Oops!")
        }
        dispatch(setCredentials({...res}))
        setPhoto("")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const convertToBase64 = (p) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(p)
      fileReader.onload = () => resolve(fileReader.result)
      fileReader.onerror = (error) => reject(error)
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file.size <= 4000000) {
      setIsPhotoUploaded((prev) => !prev)
      const base64 = await convertToBase64(file)
      setPhoto(base64)
    } else {
      setIsPhotoUploaded((prev) => !prev)
      toast.error("Photo size is too big! (4MB)")
    }
    // setIsPhotoUploaded((prev) => !prev)
  }

  const goBack = () => {
    window.history.back()
  }

  if (userInfo) {
    return (
      <div className="flex flex-col items-center justify-between m-auto px-3 py-8 space-y-6 max-w-md">
        <IoChevronBack onClick={goBack} className="text-slate-900 text-3xl self-start cursor-pointer" />
        <ToastContainer />
        <form onSubmit={updateProfilePicture} method="post">
          <label className="relative" htmlFor="photo">
            <img className="w-40 h-40 rounded-full object-cover block ring-4 ring-violet-800 cursor-pointer" src={userInfo.photo ? userInfo.photo : img} alt="Profile Picture" />
            <input onChange={(e) => handleFileUpload(e)} type="file" name="photo" id="photo" accept=".jpg, .png, .jpeg" className="hidden" />
            <button type="submit" className="absolute -right-5 left-auto top-0">{uploading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : isPhotoUploaded && <AiFillCheckCircle className="text-3xl text-violet-600 ring-4 rounded-full ring-transparent hover:text-violet-800 focus:active:text-violet-950 active:ring-violet-600" />}</button>
          </label>
        </form>
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center"><span>{userInfo.name}</span> {userInfo.admin && <HiBadgeCheck className="text-2xl text-violet-950" />}</h1>
          <h4 className="text-xs font-semibold text-slate-500">{userInfo.email}</h4>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 w-full space-y-2">
          <Link className="flex group items-center justify-between gap-2 bg-violet-200 px-4 py-2 rounded-lg font-medium ring-2 ring-transparent hover:bg-violet-300 focus:bg-violet-400 focus:ring-violet-950 active:bg-violet-800" to="/bookmarks">
            <div className="flex items-center justify-between gap-2">
              <HiOutlineBookmark className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
              <span className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100">Bookmarks</span>
            </div>
            <AiOutlineRight className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
          </Link>

          <Link className="flex group items-center justify-between gap-2 bg-violet-200 px-4 py-2 rounded-lg font-medium ring-2 ring-transparent hover:bg-violet-300 focus:bg-violet-400 focus:ring-violet-950 active:bg-violet-800" to="/notifications">
            <div className="flex items-center justify-between gap-2">
              <HiOutlineBell className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
              <span className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100">Notifications</span>
            </div>
            <AiOutlineRight className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
          </Link>

          <Link className="flex group items-center justify-between gap-2 bg-violet-200 px-4 py-2 rounded-lg font-medium ring-2 ring-transparent hover:bg-violet-300 focus:bg-violet-400 focus:ring-violet-950 active:bg-violet-800" to="/donate">
            <div className="flex items-center justify-between gap-2">
              <HiOutlineHeart className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
              <span className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100">Donate</span>
            </div>
            <AiOutlineRight className="text-violet-950 group-focus:text-violet-100 group-active:text-violet-100" />
          </Link>
        </div>

        <form className="bg-white rounded-lg p-4 shadow-xl flex flex-col w-full space-y-4 max-w-md m-auto" onSubmit={handleSubmit} method="post">
          <div className="flex flex-col space-y-4">
            <label className="font-medium font-sans text-slate-600 px-1" htmlFor="email">New Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="email" name="email" id="email" />
            <label className="font-medium font-sans text-slate-600 px-1" htmlFor="password">New Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="password" name="password" id="password" />
            <label className="font-medium font-sans text-slate-600 px-1" htmlFor="cpassword">Confirm New Password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="password" name="cpassword" id="cpassword" />
          </div>
          <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : "Save"}</button>
          {/* <Link className="bg-red-200 ring-4 ring-transparent hover:bg-red-300 focus:bg-red-400 active:bg-red-600 focus:ring-red-800 active:ring-red-950 focus:text-red-100 active:text-violet-100 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold tracking-normal gap-2 text-red-950 self-center w-[98%]" to="/signup">Delete Account</Link> */}
        </form>

      </div>
    )
  } else {
    navigate('/login')
  }
}
