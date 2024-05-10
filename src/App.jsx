/* eslint-disable no-undef */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import Edit from "./pages/admin/Edit"
import EditPost from "./pages/admin/EditPost"
import Post from "./pages/Post"
import Donation from "./pages/Donation"
import PrivateRoute from "./components/admin/PrivateRoute"
import { Promotion } from "./pages/Promotion"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { AdminLayout } from "./pages/admin/AdminLayout"
import { Dashboard } from "./pages/admin/Dashboard"
import { Messages } from "./pages/admin/Messages"
import { Posts } from "./pages/admin/Posts"
import { Subscribers } from "./pages/admin/Subscribers"
import Profile from "./pages/admin/Profile"
// import denv from 'dotenv'
// denv.config()

export default function App() {
  return (
    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID
    }}>
      <BrowserRouter>
        <Routes>
          {/* kbn app */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/:postId/:subId" element={<Post />} />
            <Route path="/promotion" element={<Promotion />} />
          </Route>

          {/* kbn system */}
          <Route path="/kbn" element={<AdminLayout />}>
            <Route path="" element={<PrivateRoute />}>
              <Route path="/kbn/" element={<Dashboard />} />
              <Route path="/kbn/profile" element={<Profile />} />
              <Route path="/kbn/messages" element={<Messages />} />
              <Route path="/kbn/posts" element={<Posts />} />
              <Route path="/kbn/posts/:postId"  element={<EditPost />} />
              <Route path="/kbn/subscribers" element={<Subscribers />} />
              <Route path="/kbn/edit" element={<Edit />} />
            </Route>
          </Route>
          <Route path="/kbn/auth" element={<Login />} />

          {/* kbn donation form */}
          <Route path="/donation" element={<Donation />} />
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  )
}
