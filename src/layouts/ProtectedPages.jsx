import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function ProtectedPages() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={"/sign-in"} />
  }

  return <Outlet />
}
