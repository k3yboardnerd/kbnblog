import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"
import { AiFillCheckCircle } from "react-icons/ai"


export const Promotion = () => {
  return (
    <section className="flex flex-col pt-4">
      <h1 className="text-2xl font-bold font-sans m-auto">Ads & Promos</h1>
      <div className="w-[90%] py-4 px-2 m-auto">
        <p className="font-serif text-base">
          Welcome to <span className="text-violet-800">kbn</span>, your one-stop shop for informative blog posts, exciting promotions, and targeted ads!
          We're passionate about helping our readers learn new things, save money, and find the products and services they need. That's why we publish a variety of high-quality blog posts on a wide range of topics, from personal finance to travel to tech.
          We also offer a variety of promotional and advertising opportunities to help businesses reach their target audience. Our promos can help you generate leads, boost sales, and increase brand awareness. And our ads are laser-targeted to reach the people who are most likely to be interested in your products or services.
          Whether you're a reader looking for great content or a business owner looking to promote your brand, we've got you covered.
          We offer a variety of options to fit your budget and needs, including:
        </p>
        <ul>
          <li className="font-serif"><span className="font-bold">In-post ads:</span> <p>These ads appear at the top or bottom of our blog posts and are seen by all of our readers.</p></li>
          <li className="font-serif"><span className="font-bold">Post list ads:</span> <p>These ads appear in a list of all out blog posts and are a great way to promote older content.</p></li>
          <li className="font-serif"><span className="font-bold">Full-screen ads:</span> <p>These ads take up the entire screen of our reader{"'"}s device and are a great way to grab their attention.</p></li>
        </ul>
      </div>
      <section className="w-[90%] py-6 px-4 grid grid-cols-1 grid-rows-3 place-items-center items-center justify-center content-center sm:grid-cols-3 sm:grid-rows-1 m-auto space-y-4">
        <div className="shadow-lg p-4 rounded-md flex flex-col space-y-6 w-[80%] sm:w-[60%]">
          <h1 className="text-3xl font-bold font-sans text-violet-950 m-auto p-1 rounded-lg">Basic</h1>
          <h1 className="m-auto text-6xl font-medium text-violet-950"><small className="text-2xl">$</small>2<small className="text-3xl text-slate-200">,99</small></h1>
          <ul className="list-disc space-y-2">
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Post list appearance</span><AiFillCheckCircle className="text-green-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">In-post appearance</span><AiFillCheckCircle className="text-red-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Full-screen appearance</span><AiFillCheckCircle className="text-red-600" /></li>
          </ul>
          <Link className="bg-violet-200 ring-4 ring-transparent hover:bg-violet-300 focus:bg-violet-400 active:bg-violet-600 focus:ring-violet-800 active:ring-violet-950 focus:text-violet-100 active:text-violet-100 text-lg flex items-center justify-center py-1 px-1 rounded-lg font-semibold tracking-normal gap-2 text-violet-950 self-center w-[98%]" to="/">CHOOSE</Link>
        </div>
        <div className="shadow-2xl p-4 rounded-md flex flex-col space-y-6 w-[80%] sm:w-[60%] bg-violet-50">
          <h1 className="text-3xl font-bold font-sans text-violet-950 m-auto p-1 rounded-lg">Urgent</h1>
          <h1 className="m-auto text-6xl font-medium text-violet-950"><small className="text-2xl">$</small>5<small className="text-3xl text-slate-200">,99</small></h1>
          <ul className="list-disc space-y-2">
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Post list appearance</span><AiFillCheckCircle className="text-green-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">In-post appearance</span><AiFillCheckCircle className="text-green-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Full-screen appearance</span><AiFillCheckCircle className="text-red-600" /></li>
          </ul>
          <Link className="bg-violet-200 ring-4 ring-transparent hover:bg-violet-300 focus:bg-violet-400 active:bg-violet-600 focus:ring-violet-800 active:ring-violet-950 focus:text-violet-100 active:text-violet-100 text-lg flex items-center justify-center py-1 px-1 rounded-lg font-semibold tracking-normal gap-2 text-violet-950 self-center w-[98%]" to="/">CHOOSE</Link>
        </div>
        <div className="shadow-lg p-4 rounded-md flex flex-col space-y-6 w-[80%] sm:w-[60%]">
          <h1 className="text-3xl font-bold font-sans text-violet-950 m-auto p-1 rounded-lg">Essential</h1>
          <h1 className="m-auto text-6xl font-medium text-violet-950"><small className="text-2xl">$</small>9<small className="text-3xl text-slate-200">,99</small></h1>
          <ul className="list-disc space-y-2">
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Post list appearance</span><AiFillCheckCircle className="text-green-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">In-post appearance</span><AiFillCheckCircle className="text-green-600" /></li>
            <li className="flex items-center gap-2 justify-between"><span className="text-sm font-semibold">Full-screen appearance</span><AiFillCheckCircle className="text-green-600" /></li>
          </ul>
          <Link className="bg-violet-200 ring-4 ring-transparent hover:bg-violet-300 focus:bg-violet-400 active:bg-violet-600 focus:ring-violet-800 active:ring-violet-950 focus:text-violet-100 active:text-violet-100 text-lg flex items-center justify-center py-1 px-1 rounded-lg font-semibold tracking-normal gap-2 text-violet-950 self-center w-[98%]" to="/">CHOOSE</Link>
        </div>
      </section>
      <em className="text-sm text-red-400 m-auto">NB: All plans take 1 month!!!</em>
      <Footer />
    </section>
  )
}
