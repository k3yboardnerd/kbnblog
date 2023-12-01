/* eslint-disable react/prop-types */
import { useState } from 'react'
import { AiOutlineReload } from 'react-icons/ai'
// import { FaDonate } from 'react-icons/fa'
import { useSubscribeMutation } from '../features/subscribers/subscriptionApiSlice'
import { useDispatch } from 'react-redux'
import { setSubscriberInfo } from '../features/subscribers/subscriptionSlice'
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'


export const SubscribeCard = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const [subscribe, {isLoading}] = useSubscribeMutation()


  const submitHandler = async (e) => {
    e.preventDefault()
    if (!(username || email)) {
      toast.error("Please fill all fields!")
    } else {
      try {
        const res = await subscribe({ username, email }).unwrap()
        dispatch(setSubscriberInfo({...res}))
        setUserName()
        setEmail()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
 
  return (
    <section className='w-full'>
    <ToastContainer />
    <form className="bg-white rounded-lg p-4 shadow-xl flex flex-col w-full space-y-4 max-w-md m-auto" onSubmit={submitHandler} method="post">
      <div className="flex flex-col space-y-4">
        <label className="font-medium font-sans text-slate-600 px-1" htmlFor="username">Username</label>
        <input onChange={(e) => setUserName(e.target.value)} value={username} className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="text" name="username" required id="username" />
        <label className="font-medium font-sans text-slate-600 px-1" htmlFor="email">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="email" name="email" required id="email" />
      </div>
        <button className="bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center py-2 px-1 rounded-lg font-semibold tracking-wide gap-2 text-violet-100 self-center w-[98%]" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : <>Subscribe/Login</>}</button>
        {/* <Link to='/' className='m-auto text-xs text-violet-800 underline'>I forgot my username</Link> */}
    </form>
    </section>
  )
}
