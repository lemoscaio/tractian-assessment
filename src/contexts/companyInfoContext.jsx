import { createContext, useState, useEffect, useMemo } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const companyInfoContext = createContext()

export function CompanyInfoProvider({ children }) {
  const { VITE_APP_API_URL } = import.meta.env
  const navigate = useNavigate()
  const location = useLocation()

  const { user } = useAuth()
  const [userInfo, setUserInfo] = useState({})

  const [isLoadingUnits, setIsLoadingUnits] = useState(false)
  const [failedUnitsLoad, setFailedUnitsLoad] = useState(false)

  const [units, setUnits] = useState([])
  const [selectedUnit, setSelectedUnit] = useState("")
  const [assets, setAssets] = useState([])

  useEffect(() => {
    if (user) {
      fetchUserInfo()
    }
  }, [user])

  function fetchUserInfo() {
    axios
      .get(`${VITE_APP_API_URL}/user`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        if (!response.data.company) return navigate("/company")
        else setUserInfo(response.data)
        fetchUnits()
      })
      .catch((error) => console.log(error))
  }

  function fetchUnits() {
    axios
      .get(`${VITE_APP_API_URL}/units`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setUnits(response.data)
        handleSelectUnit(response.data[0]._id, true)
      })
      .catch((error) => console.log(error))
  }

  function fetchAssets(unitId) {
    axios
      .get(`${VITE_APP_API_URL}/assets/${unitId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setAssets(response.data)
      })
      .catch((error) => console.log(error))
  }

  function handleSelectUnit(unitId, firstTime = false) {
    setSelectedUnit(unitId)
    if (unitId !== selectedUnit && !firstTime) {
      setAssets([])
    }
    fetchAssets(unitId)

    if (location.pathname !== "/") navigate("/units")
  }

  const value = useMemo(() => {
    return {
      userInfo,
      fetchUserInfo,
      units,
      fetchUnits,
      handleSelectUnit,
      selectedUnit,
      setSelectedUnit,
      fetchAssets,
      assets,
    }
  }, [
    userInfo,
    fetchUserInfo,
    units,
    fetchUnits,
    selectedUnit,
    handleSelectUnit,
    setSelectedUnit,
    fetchAssets,
    assets,
  ])

  return (
    <companyInfoContext.Provider value={value}>
      {children}
    </companyInfoContext.Provider>
  )
}
