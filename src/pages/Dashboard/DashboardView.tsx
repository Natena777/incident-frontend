import { Outlet, Link } from 'react-router-dom'
import './Dashboard.css'

interface DashboardViewProps {
  adminOpen: boolean
  setAdminOpen: (value: boolean) => void
  handleLogout: () => void
}

function DashboardView({ adminOpen, setAdminOpen, handleLogout }: DashboardViewProps) {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Incident Management</h2>
        
        <div className="sidebar-section">
          <h3 onClick={() => setAdminOpen(!adminOpen)}>
            Admin Section {adminOpen ? '▼' : '▶'}
          </h3>
          {adminOpen && (
            <ul>
              <li><Link to="/dashboard/users">Users</Link></li>
              <li><Link to="/dashboard/roles">Roles</Link></li>
              <li><Link to="/dashboard/user-roles">User Roles</Link></li>
              <li><Link to="/dashboard/assignee-groups">Assignee Groups</Link></li>
              <li><Link to="/dashboard/assignee-group-users">Assignee Group Users</Link></li>
              <li><Link to="/dashboard/case-status">Case Status</Link></li>
              <li><Link to="/dashboard/group-case-status">Group Case Status</Link></li>
              <li><Link to="/dashboard/sc-departments">SC Departments</Link></li>
              <li><Link to="/dashboard/sc-category">SC Category</Link></li>
              <li><Link to="/dashboard/sc-subcategory">SC SubCategory</Link></li>
              <li><Link to="/dashboard/sc-services">SC Services</Link></li>
              <li><Link to="/dashboard/cases">Cases</Link></li>
            </ul>
          )}
        </div>
      </div>

      <div className="main-content">
        <button className="logout-btn" onClick={handleLogout}>გასვლა</button>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardView
