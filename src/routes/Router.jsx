import { Navigate, Route, Routes } from "react-router-dom"
import { AddAsset } from "../components/AddAsset"
import { AssetDetails } from "../components/AssetDetails"
import { AuthPages } from "../layouts/AuthPages"
import { MainLayout } from "../layouts/MainLayout"
import { ProtectedPages } from "../layouts/ProtectedPages"
import { CompanyPage } from "../pages/CompanyPage"
import { OverviewPage } from "../pages/OverviewPage"
import { SignInPage } from "../pages/SignInPage"
import { SignUpPage } from "../pages/SignUpPage"

export function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthPages />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>
        <Route element={<ProtectedPages />}>
          <Route element={<MainLayout />}>
            <Route path="/units" element={<OverviewPage />} />
            <Route path="/assets/:assetId" element={<AssetDetails />} />
            <Route path="/add/asset" element={<AddAsset />} />
            <Route path="/company" element={<CompanyPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/units" replace />} />
      </Routes>
    </>
  )
}
