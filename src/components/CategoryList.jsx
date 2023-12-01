

export default function CategoryList() {
  return (
    <div className="w-[95%]">
      <ul className="w-full flex gap-4 justify-center">
        <li><a className="bg-white shadow-md rounded-2xl px-4 py-1 font-medium ring-transparent hover:bg-violet-800 hover:text-white hover:ring-transparent active:ring-4 active:ring-indigo-950 active:bg-violet-900 active:text-white cursor-pointer focus:bg-violet-900 focus:ring-violet-950 focus:ring-4 focus:text-white" href="#">All</a></li>
        <li><a className="bg-white shadow-md rounded-2xl px-4 py-1 font-medium ring-transparent hover:bg-violet-800 hover:text-white hover:ring-transparent active:ring-4 active:ring-indigo-950 active:bg-violet-900 active:text-white cursor-pointer focus:bg-violet-900 focus:ring-violet-950 focus:ring-4 focus:text-white" href="#">A.I</a></li>
        <li><a className="bg-white shadow-md rounded-2xl px-4 py-1 font-medium ring-transparent hover:bg-violet-800 hover:text-white hover:ring-transparent active:ring-4 active:ring-indigo-950 active:bg-violet-900 active:text-white cursor-pointer focus:bg-violet-900 focus:ring-violet-950 focus:ring-4 focus:text-white" href="#">Tech</a></li>
        <li><a className="bg-white shadow-md rounded-2xl px-4 py-1 font-medium ring-transparent hover:bg-violet-800 hover:text-white hover:ring-transparent active:ring-4 active:ring-indigo-950 active:bg-violet-900 active:text-white cursor-pointer focus:bg-violet-900 focus:ring-violet-950 focus:ring-4 focus:text-white" href="#">Music</a></li>
      </ul>
    </div>
  )
}
