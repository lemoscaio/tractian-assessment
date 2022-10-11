import "antd/dist/antd.css"
import { BrowserRouter } from "react-router-dom"
import { CompanyInfoProvider } from "./contexts/companyInfoContext"
import { AuthProvider } from "./hooks/useAuth"
import { Router } from "./routes/Router"

export function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CompanyInfoProvider>
            <Router />
          </CompanyInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
