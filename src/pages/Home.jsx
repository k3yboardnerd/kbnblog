/* eslint-disable react/prop-types */
// import CategoryList from "../components/CategoryList"
import PostCard from "../components/PostCard"
import { AiOutlineReload } from "react-icons/ai"
import { useGetPostsQuery } from "../features/posts/postsApiSlice"
import { Footer } from "../components/Footer"
import { useSelector } from "react-redux"
import { SubscribeCard } from "../components/SubscribeCard"
import { Helmet } from "react-helmet"

export default function Home() {
  const {subscriberInfo} = useSelector((state) => state.subscriber) || {}
  const { data: posts, isLoading } = useGetPostsQuery(null,{
    pollingInterval: 1000,
    refetchOnMountOrArgChange: true
  })
  
  return (
    <div className="px-2 pt-6 m-auto flex max-w-screen-2xl h-full flex-col items-center space-y-6 lg:px-16 xl:px-20 2xl:px-24">
      <Helmet>
        <title>kbn | Blog</title>
        <meta name="description" content="I am a dedicated and passionate person, who loves coding and learning, I created this blog to share my knowledge and also give insights in topics that relate to Tech, A.I, Security and Cyber Security." />
        <meta property="og:title" content="kbn. | Blog" />
        <meta property="og:description" content="I am a dedicated and passionate person, who loves coding and learning, I created this blog to share my knowledge and also give insights in topics that relate to Tech, A.I, Security and Cyber Security." />
        <meta property="og:image" content="/assets/kbn1.png" />
      </Helmet>
      {/* <CategoryList /> */}
      {isLoading ? <AiOutlineReload className="animate-spin text-4xl m-1" /> :
        subscriberInfo ? 
        
        <div className="w-full flex flex-col items-center gap-2 space-y-1 sm:justify-items-center sm:items-end sm:grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {posts?.map(post => (<PostCard key={post._id} id={post._id} createdAt={post.createdAt.toString()} authorId={post.author._id} authorName={post.author.name} authorAvatar={post.author.photo} title={post.title} category={post.category} image={post.cover} />))}
        </div>
        
        :
        <div className="flex flex-col items-center pt-20 px-2 space-y-2">
              <h1 className="text-lg font-sans font-black">Please subscribe or login to continue.</h1>
              <SubscribeCard />
            </div>
      }
      <Footer />
    </div>
  )
}
