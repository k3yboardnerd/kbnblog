import Logo from "../components/Logo"
import { Link } from "react-router-dom"
import { AiOutlineReload } from "react-icons/ai"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { useLoginMutation } from "../features/users/usersApiSlice"
import { setCredentials } from "../features/users/authSlice"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, {isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/kbn/')
    }
  }, [navigate, userInfo])
  
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({email, password}).unwrap()
      dispatch(setCredentials({ ...res}))
      navigate('/kbn/')
    } catch (err) {
      toast.error(err.data.message || err.error)
    }
  }
  return (
    <div className="m-auto space-y-12 py-52 max-w-screen-sm px-4">
      <ToastContainer />
      <Logo className="text-8xl font-sans font-black text-violet-800 m-auto text-center" />
      <h1 className="text-slate-700 text-3xl font-sans font-bold text-center">Welcome Back!</h1>
      <form className="bg-white rounded-lg p-4 shadow-xl flex flex-col w-full space-y-4 max-w-md m-auto" onSubmit={submitHandler} method="post">
        <div className="flex flex-col space-y-4">
          <label className="font-medium font-sans text-slate-600 px-1" htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off" className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="email" name="email" id="email" />
          <label className="font-medium font-sans text-slate-600 px-1" htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="off" className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="password" name="password" id="password" />
        </div>
        <div className="flex justify-between px-1">
          <label className="flex gap-2 items-center" htmlFor="remember"></label>
          <Link className="font-medium text-slate-600 underline text-sm" to="/profile">Forgot Password?</Link>
        </div>
        <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{ isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : "Login" }</button>
        
      </form>
    </div>
  )
}
