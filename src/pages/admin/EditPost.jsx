/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPost } from "../../features/posts/postsSlice"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { AiFillCheckCircle, AiOutlineReload } from "react-icons/ai"
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useAdminGetPostByIdQuery, useUpdatePostMutation } from "../../features/admin/posts/postsApiSlice"


export default function Edit() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("A.I")
  const [body, setBody] = useState("")
  const [cover, setCover] = useState("")
  const [isCoverUploaded, setIsCoverUploaded] = useState(false)
  const options = ["A.I", "Tech", "Security", "Cyber Security"]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const { postId } = useParams()

  const postData = {
    title,
    category,
    body,
    cover
  }

  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const { data: post } = useAdminGetPostByIdQuery(postId)

  useEffect(() => {
    if (post) {
      setTitle(post?.title)
      setCategory(post?.category)
      setBody(post?.body)
      setCover(post?.cover)
    }
  }, [post])


  const handleSubmit = async (e) => {
    e.preventDefault()
    //  window.location.pathname = `${postId}/edit`
    if (!(title || category || body || cover)) {
      toast.error("Please fill all fields!")
    } else {
      try {
        const res = await updatePost({ id: postId, data: postData }).unwrap()
        toast.success("Post updated!")
        setTitle('')
        setCategory('')
        setBody('')
        setCover('')
        setIsCoverUploaded((prev) => !prev)
        navigate('/kbn/posts')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const handleOptions = (e) => {
    setCategory(options[e.target.options.selectedIndex])
  }

  const convertToBase64 = (p) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(p)
      fileReader.onload = () => resolve(fileReader.result)
      fileReader.onerror = (error) => reject(error)
    })
  }

  const handleFileUplaod = async (e) => {
    const file = e.target.files[0]
    if (file.size <= 10000000) {
      setIsCoverUploaded((prev) => !prev)
      const base64 = await convertToBase64(file)
      setCover(base64)
    } else {
      toast.error("File too big! (10MB)")
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
    ]
  }

  if (userInfo) {
    if (userInfo.admin === true) {
      return (
        <div className="grid grid-cols-2 overflow-y-scroll scroll-m-0 overflow-x-hidden col-span-5 h-screen place-content-start justify-between p-4 pb-40 gap-4">
          <article className="flex flex-col article box-content h-full p-4 border-2 shadow-2xl rounded-lg overflow-y-scroll" dangerouslySetInnerHTML={{ __html: body ? body : "<h1 class='preview-title'>Post preview</h1>" }} />
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-h-full p-4" action="#" method="post">
            <div className="flex p-2 items-center gap-4 justify-between">
              <h1 className="font-bold font-sans text-xl text-slate-400">Edit Post</h1>
              <button className="px-4 py-2 bg-violet-600 ring-4 ring-transparent hover:bg-violet-800 focus:bg-violet-950 active:bg-violet-950 focus:ring-violet-600 text-lg flex items-center justify-center rounded-lg font-semibold tracking-wide gap-2 text-violet-100 self-center" type="submit">{isLoading ? <AiOutlineReload className="animate-spin text-2xl m-1" /> : "Publish"}</button>
            </div>
            <div className="flex flex-col space-y-4">
              <label className="font-medium font-sans text-slate-600 px-1" htmlFor="title">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " type="text" name="title" id="title" />
              <label className="font-medium font-sans text-slate-600 px-1" htmlFor="category">Category</label>
              <select onChange={(e) => handleOptions(e)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[97.9%] self-center my-2 hover:ring-violet-600 focus:ring-violet-800 " name="category" id="category">
                <option value="ai">A.I</option>
                <option value="tech">Tech</option>
                <option value="security">Security</option>
                <option value="cyber security">Cyber Security</option>
              </select>
              <label className="flex gap-2 items-center justify-between w-[98%] group bg-violet-200 hover:bg-violet-300 focus:bg-violet-600 active:bg-violet-800 p-4 rounded-lg self-center cursor-pointer" htmlFor="cover">
                <input onChange={(e) => handleFileUplaod(e)} required type="file" name="cover" id="cover" className="hidden" accept=".jpg, .jpeg, .png, .gif" />
                <h1 className="uppercase text-sm font-medium text-violet-950 group-focus:text-violet-100 group-active:text-violet-100">Cover (Image/Video)</h1>
                {isCoverUploaded && <AiFillCheckCircle className="text-violet-600" />}
              </label>
              <label className="font-medium font-sans text-slate-600 px-1" htmlFor="message">Description</label>
              <section className="flex h-[450px] max-h-full w-full self-center my-2 hover:ring-violet-600 focus:ring-violet-800">
                <ReactQuill id="message" className="w-full h-full border-none rounded-lg p-2" modules={modules} value={body} onChange={setBody} />
              </section>
              {/* <textarea value={body} onChange={(e) => setDescription(e.target.value)} required className="ring-2 ring-violet-400 rounded-md p-2 w-[98%] self-center my-2 resize-y hover:ring-violet-600 focus:ring-violet-800" name="message" id="message" cols="30" rows="4"></textarea> */}
            </div>
          </form>
        </div>
      )
    }
  } else {
    return <Navigate to='/' replace />
  }
}
