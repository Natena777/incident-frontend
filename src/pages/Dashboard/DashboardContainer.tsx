import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardView from './DashboardView'

function DashboardContainer() {
  const [adminOpen, setAdminOpen] = useState(true)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <DashboardView
      adminOpen={adminOpen}
      setAdminOpen={setAdminOpen}
      handleLogout={handleLogout}
    />
  )
}

export default DashboardContainer
