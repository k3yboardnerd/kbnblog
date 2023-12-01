import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth)
  
  return userInfo ? <Outlet /> : <Navigate to="/kbn/auth" replace />
}

export default PrivateRoute