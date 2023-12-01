import Header from "../components/Header"
// import BottomNav from "../components/BottomNav"
import { Outlet } from "react-router-dom"
export default function Layout() {
  return (
    <div className="bg-white w-screen h-screen relative overflow-y-auto overflow-x-hidden">
      <Header />
      <Outlet />
      {/* <BottomNav /> */}
    </div>
  )
}
