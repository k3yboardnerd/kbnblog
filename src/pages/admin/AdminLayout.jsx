import { Outlet } from "react-router-dom"
import { Header } from "../../components/admin/Header"
import { Navigator } from "../../components/admin/Navigator"

export const AdminLayout = () => {
  return (
    <section className="w-screen h-screen overflow-y-hidden">
      <main className="hidden fixed sm:grid sm:grid-cols-6 overflow-y-hidden overflow-x-hidden w-full h-full divide-x">
        <Navigator />
        <section className="col-span-5 h-full">
          <Header />
          <Outlet />
        </section>
      </main>
    </section>
  )
}
