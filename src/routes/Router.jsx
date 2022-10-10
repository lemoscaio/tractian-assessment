import { Navigate, Route, Routes } from "react-router-dom"
import { AuthPage } from "../page/AuthPage"

export function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </>
  )
}
